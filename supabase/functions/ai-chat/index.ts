import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  context?: "mindfulness" | "community" | "general";
}

const SYSTEM_PROMPTS = {
  mindfulness: `Je bent een vriendelijke en empathische AI-assistent gespecialiseerd in mindfulness, meditatie en persoonlijke groei.
Je helpt gebruikers met:
- Vragen over meditatie en mindfulness technieken
- Begeleiding bij emotionele uitdagingen
- Tips voor stressvermindering en innerlijke rust
- Uitleg over oefeningen en content op het platform

Houd je antwoorden warm, ondersteunend en praktisch. Spreek Nederlands tenzij anders gevraagd.
Bij ernstige mentale gezondheidsproblemen, verwijs door naar professionele hulp.`,
  
  community: `Je bent een behulpzame community-assistent voor een mindfulness platform.
Je helpt gebruikers met:
- Navigeren door de community
- Vragen over het platform
- Richtlijnen voor respectvolle communicatie
- Algemene ondersteuning

Wees vriendelijk en behulpzaam. Spreek Nederlands.`,
  
  general: `Je bent een behulpzame AI-assistent. Geef duidelijke, beknopte antwoorden in het Nederlands.`
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context = "mindfulness" }: ChatRequest = await req.json();

    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error("[ai-chat] Invalid request: messages array required");
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate message format
    for (const msg of messages) {
      if (!msg.role || !msg.content || typeof msg.content !== "string") {
        console.error("[ai-chat] Invalid message format:", msg);
        return new Response(
          JSON.stringify({ error: "Invalid message format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      // Limit message length to prevent abuse
      if (msg.content.length > 10000) {
        console.error("[ai-chat] Message too long:", msg.content.length);
        return new Response(
          JSON.stringify({ error: "Message exceeds maximum length of 10000 characters" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("[ai-chat] LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = SYSTEM_PROMPTS[context] || SYSTEM_PROMPTS.general;

    console.log(`[ai-chat] Processing request with context: ${context}, messages: ${messages.length}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ai-chat] Gateway error: ${response.status} - ${errorText}`);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Te veel verzoeken. Probeer het later opnieuw." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI-service tijdelijk niet beschikbaar." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("[ai-chat] Streaming response started");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("[ai-chat] Unexpected error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Internal server error" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
