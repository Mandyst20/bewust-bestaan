import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ModerationResult {
  isSafe: boolean;
  riskLevel: "low" | "medium" | "high";
  categories: string[];
  reason?: string;
  warning?: string;
}

interface TextAnalysisResult {
  type: string;
  result: unknown;
}

/**
 * Moderate content before publishing
 */
export async function moderateContent(
  content: string,
  contentType: "topic" | "reply" | "message" | "profile",
  contentId?: string
): Promise<ModerationResult> {
  try {
    const { data, error } = await supabase.functions.invoke<ModerationResult>(
      "content-moderation",
      {
        body: { content, contentType, contentId },
      }
    );

    if (error) {
      console.error("[moderateContent] Error:", error);
      // Fail open - allow content if moderation fails
      return { isSafe: true, riskLevel: "low", categories: [] };
    }

    return data || { isSafe: true, riskLevel: "low", categories: [] };
  } catch (error) {
    console.error("[moderateContent] Unexpected error:", error);
    return { isSafe: true, riskLevel: "low", categories: [] };
  }
}

/**
 * Check content before submission and show warning if needed
 */
export async function checkContentSafety(
  content: string,
  contentType: "topic" | "reply" | "message" | "profile"
): Promise<boolean> {
  const result = await moderateContent(content, contentType);

  if (!result.isSafe) {
    if (result.riskLevel === "high") {
      toast.error("Deze inhoud kan niet worden geplaatst.", {
        description: result.reason || "De inhoud voldoet niet aan onze richtlijnen.",
      });
      return false;
    }

    if (result.riskLevel === "medium") {
      toast.warning("Let op: controleer je bericht", {
        description: result.reason || "Sommige inhoud kan problematisch zijn.",
      });
      // Still allow medium risk with warning
      return true;
    }
  }

  return true;
}

/**
 * Summarize text content
 */
export async function summarizeText(text: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.functions.invoke<TextAnalysisResult>(
      "text-analysis",
      {
        body: { text, type: "summarize" },
      }
    );

    if (error) throw error;

    const result = data?.result as { summary: string } | undefined;
    return result?.summary || null;
  } catch (error) {
    console.error("[summarizeText] Error:", error);
    toast.error("Samenvatting kon niet worden gemaakt");
    return null;
  }
}

/**
 * Analyze sentiment of text
 */
export async function analyzeSentiment(text: string): Promise<{
  sentiment: "positive" | "negative" | "neutral" | "mixed";
  score: number;
  explanation: string;
} | null> {
  try {
    const { data, error } = await supabase.functions.invoke<TextAnalysisResult>(
      "text-analysis",
      {
        body: { text, type: "sentiment" },
      }
    );

    if (error) throw error;

    return data?.result as {
      sentiment: "positive" | "negative" | "neutral" | "mixed";
      score: number;
      explanation: string;
    } | null;
  } catch (error) {
    console.error("[analyzeSentiment] Error:", error);
    return null;
  }
}

/**
 * Extract keywords from text
 */
export async function extractKeywords(text: string): Promise<{
  keywords: Array<{ keyword: string; relevance: string }>;
  mainTopic: string;
} | null> {
  try {
    const { data, error } = await supabase.functions.invoke<TextAnalysisResult>(
      "text-analysis",
      {
        body: { text, type: "keywords" },
      }
    );

    if (error) throw error;

    return data?.result as {
      keywords: Array<{ keyword: string; relevance: string }>;
      mainTopic: string;
    } | null;
  } catch (error) {
    console.error("[extractKeywords] Error:", error);
    return null;
  }
}

/**
 * Translate text to another language
 */
export async function translateText(
  text: string,
  targetLanguage: string
): Promise<string | null> {
  try {
    const { data, error } = await supabase.functions.invoke<TextAnalysisResult>(
      "text-analysis",
      {
        body: { text, type: "translate", targetLanguage },
      }
    );

    if (error) throw error;

    const result = data?.result as { translation: string } | undefined;
    return result?.translation || null;
  } catch (error) {
    console.error("[translateText] Error:", error);
    toast.error("Vertaling kon niet worden gemaakt");
    return null;
  }
}
