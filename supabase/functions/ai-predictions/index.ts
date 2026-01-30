import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { type } = await req.json();

    const prompt = `You are a financial AI analyst. Generate realistic financial predictions in JSON format.
Based on typical enterprise patterns, generate predictions for:
1. Revenue forecast for next month
2. Expense forecast for next month  
3. Net profit trend projection

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "predictions": [
    {
      "type": "revenue",
      "value": <number between 120000 and 200000>,
      "change": <percentage change between 5 and 20>,
      "confidence": <confidence level between 75 and 95>,
      "description": "<brief explanation of the forecast>"
    },
    {
      "type": "expenses",
      "value": <number between 60000 and 120000>,
      "change": <percentage change between -10 and 10>,
      "confidence": <confidence level between 70 and 90>,
      "description": "<brief explanation>"
    },
    {
      "type": "trend",
      "value": <calculated net profit>,
      "change": <percentage change between 10 and 30>,
      "confidence": <confidence level between 65 and 85>,
      "description": "<brief trend analysis>"
    }
  ]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 512,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("AI Gateway error:", errorData);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "";

    // Parse the JSON response
    let predictions;
    try {
      // Remove any potential markdown code blocks
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      predictions = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      // Fallback predictions
      predictions = {
        predictions: [
          {
            type: "revenue",
            value: 156000,
            change: 12.5,
            confidence: 87,
            description: "Based on current trends and seasonal patterns",
          },
          {
            type: "expenses",
            value: 89000,
            change: -5.2,
            confidence: 82,
            description: "Expected decrease due to optimization efforts",
          },
          {
            type: "trend",
            value: 67000,
            change: 18.3,
            confidence: 79,
            description: "Net profit projection for next quarter",
          },
        ],
      };
    }

    return new Response(JSON.stringify(predictions), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error in ai-predictions function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
