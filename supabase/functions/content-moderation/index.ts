import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ModerationRequest {
  content: string;
  contentType: "topic" | "reply" | "message" | "profile";
  contentId?: string;
  userId?: string;
}

interface ModerationResult {
  isSafe: boolean;
  riskLevel: "low" | "medium" | "high";
  categories: string[];
  reason?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.error("[content-moderation] Missing or invalid authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: authError } = await supabaseAuth.auth.getClaims(token);
    
    if (authError || !claimsData?.claims) {
      console.error("[content-moderation] Authentication failed:", authError?.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const authenticatedUserId = claimsData.claims.sub;
    console.log(`[content-moderation] Authenticated user: ${authenticatedUserId}`);

    const { content, contentType, contentId, userId }: ModerationRequest = await req.json();

    // Validate input
    if (!content || typeof content !== "string") {
      console.error("[content-moderation] Invalid content");
      return new Response(
        JSON.stringify({ error: "Content is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (content.length > 50000) {
      console.error("[content-moderation] Content too long:", content.length);
      return new Response(
        JSON.stringify({ error: "Content exceeds maximum length" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("[content-moderation] LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Moderation service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[content-moderation] Analyzing ${contentType} content (${content.length} chars)`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: `Je bent een content moderatie systeem voor een mindfulness community platform.
Analyseer de gegeven tekst en bepaal of deze veilig is voor publicatie.

Let op:
- Haatdragende of discriminerende taal
- Zelfbeschadiging of suïcidale inhoud (hoge prioriteit)
- Spam of commerciële promotie
- Persoonlijke aanvallen of pesten
- Ongepaste of expliciete inhoud
- Misleidende informatie over gezondheid

Dit is een ondersteunende community, dus wees niet te streng bij normale expressie van emoties of persoonlijke worstelingen.`
          },
          {
            role: "user",
            content: `Analyseer deze ${contentType} tekst:\n\n${content}`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "moderate_content",
              description: "Geef het moderatieresultaat voor de geanalyseerde content",
              parameters: {
                type: "object",
                properties: {
                  isSafe: {
                    type: "boolean",
                    description: "Of de content veilig is voor publicatie"
                  },
                  riskLevel: {
                    type: "string",
                    enum: ["low", "medium", "high"],
                    description: "Het risiconiveau van de content"
                  },
                  categories: {
                    type: "array",
                    items: { type: "string" },
                    description: "Gedetecteerde problematische categorieën (leeg als veilig)"
                  },
                  reason: {
                    type: "string",
                    description: "Korte uitleg waarom content mogelijk onveilig is"
                  }
                },
                required: ["isSafe", "riskLevel", "categories"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "moderate_content" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[content-moderation] Gateway error: ${response.status} - ${errorText}`);
      
      // Fail open - allow content if moderation fails (log for manual review)
      console.warn("[content-moderation] Failing open due to gateway error");
      return new Response(
        JSON.stringify({ 
          isSafe: true, 
          riskLevel: "low", 
          categories: [],
          warning: "Moderation service temporarily unavailable"
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    
    let result: ModerationResult;
    
    try {
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      if (toolCall?.function?.arguments) {
        result = JSON.parse(toolCall.function.arguments);
      } else {
        // Fallback: assume safe if no tool call
        console.warn("[content-moderation] No tool call in response, assuming safe");
        result = { isSafe: true, riskLevel: "low", categories: [] };
      }
    } catch (parseError) {
      console.error("[content-moderation] Failed to parse response:", parseError);
      result = { isSafe: true, riskLevel: "low", categories: [] };
    }

    console.log(`[content-moderation] Result: safe=${result.isSafe}, risk=${result.riskLevel}`);

    // If high risk, create safety alert in database
    if (result.riskLevel === "high" && contentId) {
      try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        await supabase.from("safety_alerts").insert({
          type: contentType,
          ref_id: contentId,
          risk_level: result.riskLevel,
          reason: result.reason || result.categories.join(", "),
        });

        console.log(`[content-moderation] Safety alert created for ${contentType}:${contentId}`);
      } catch (dbError) {
        console.error("[content-moderation] Failed to create safety alert:", dbError);
      }
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("[content-moderation] Unexpected error:", error);
    // Fail open
    return new Response(
      JSON.stringify({ isSafe: true, riskLevel: "low", categories: [] }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
