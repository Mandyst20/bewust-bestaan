import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface AnalysisRequest {
  text: string;
  type: "summarize" | "sentiment" | "keywords" | "translate";
  targetLanguage?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.error("[text-analysis] Missing or invalid authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: authError } = await supabaseClient.auth.getClaims(token);
    
    if (authError || !claimsData?.claims) {
      console.error("[text-analysis] Authentication failed:", authError?.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log(`[text-analysis] Authenticated user: ${userId}`);

    const { text, type, targetLanguage = "en" }: AnalysisRequest = await req.json();

    if (!text || typeof text !== "string") {
      console.error("[text-analysis] Invalid text input");
      return new Response(
        JSON.stringify({ error: "Text is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (text.length > 50000) {
      console.error("[text-analysis] Text too long:", text.length);
      return new Response(
        JSON.stringify({ error: "Text exceeds maximum length of 50000 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validTypes = ["summarize", "sentiment", "keywords", "translate"];
    if (!validTypes.includes(type)) {
      console.error("[text-analysis] Invalid analysis type:", type);
      return new Response(
        JSON.stringify({ error: `Invalid type. Must be one of: ${validTypes.join(", ")}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("[text-analysis] LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Analysis service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[text-analysis] Processing ${type} request (${text.length} chars)`);

    const prompts: Record<string, string> = {
      summarize: `Maak een beknopte samenvatting van de volgende tekst in maximaal 3 zinnen. Behoud de belangrijkste punten.`,
      sentiment: `Analyseer het sentiment van de volgende tekst. Geef aan of het positief, negatief of neutraal is, met een score van -1 tot 1 en een korte uitleg.`,
      keywords: `Extraheer de 5 belangrijkste keywords/thema's uit de volgende tekst. Geef ze als lijst.`,
      translate: `Vertaal de volgende tekst naar ${targetLanguage}. Behoud de toon en stijl.`
    };

    const tools: Record<string, object> = {
      summarize: {
        type: "function",
        function: {
          name: "provide_summary",
          description: "Geef de samenvatting van de tekst",
          parameters: {
            type: "object",
            properties: {
              summary: { type: "string", description: "De samenvatting" },
              wordCount: { type: "number", description: "Aantal woorden in origineel" }
            },
            required: ["summary", "wordCount"],
            additionalProperties: false
          }
        }
      },
      sentiment: {
        type: "function",
        function: {
          name: "analyze_sentiment",
          description: "Geef het sentiment analyse resultaat",
          parameters: {
            type: "object",
            properties: {
              sentiment: { type: "string", enum: ["positive", "negative", "neutral", "mixed"] },
              score: { type: "number", description: "Score van -1 (negatief) tot 1 (positief)" },
              explanation: { type: "string", description: "Korte uitleg" },
              emotions: { 
                type: "array", 
                items: { type: "string" },
                description: "Gedetecteerde emoties" 
              }
            },
            required: ["sentiment", "score", "explanation"],
            additionalProperties: false
          }
        }
      },
      keywords: {
        type: "function",
        function: {
          name: "extract_keywords",
          description: "Geef de geëxtraheerde keywords",
          parameters: {
            type: "object",
            properties: {
              keywords: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    keyword: { type: "string" },
                    relevance: { type: "string", enum: ["high", "medium", "low"] }
                  },
                  required: ["keyword", "relevance"],
                  additionalProperties: false
                }
              },
              mainTopic: { type: "string", description: "Het hoofdonderwerp" }
            },
            required: ["keywords", "mainTopic"],
            additionalProperties: false
          }
        }
      },
      translate: {
        type: "function",
        function: {
          name: "provide_translation",
          description: "Geef de vertaling",
          parameters: {
            type: "object",
            properties: {
              translation: { type: "string" },
              sourceLanguage: { type: "string", description: "Gedetecteerde brontaal" },
              targetLanguage: { type: "string" }
            },
            required: ["translation", "sourceLanguage", "targetLanguage"],
            additionalProperties: false
          }
        }
      }
    };

    const toolNames: Record<string, string> = {
      summarize: "provide_summary",
      sentiment: "analyze_sentiment",
      keywords: "extract_keywords",
      translate: "provide_translation"
    };

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: prompts[type] },
          { role: "user", content: text }
        ],
        tools: [tools[type]],
        tool_choice: { type: "function", function: { name: toolNames[type] } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[text-analysis] Gateway error: ${response.status} - ${errorText}`);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Te veel verzoeken. Probeer het later opnieuw." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Analysis service temporarily unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    
    let result: unknown;
    try {
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      if (toolCall?.function?.arguments) {
        result = JSON.parse(toolCall.function.arguments);
      } else {
        throw new Error("No tool call in response");
      }
    } catch (parseError) {
      console.error("[text-analysis] Failed to parse response:", parseError);
      return new Response(
        JSON.stringify({ error: "Failed to parse analysis result" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[text-analysis] ${type} analysis completed successfully`);

    return new Response(
      JSON.stringify({ type, result }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("[text-analysis] Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
