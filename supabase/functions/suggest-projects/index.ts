import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { skillLevel, interest, department, projectType, timeCommitment } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert project idea generator for students and developers. Generate creative, practical, and industry-relevant project ideas that align with real-world applications. Focus on projects that can make an impact in the specified industry/department.`;

    const userPrompt = `Generate 5 project ideas with the following requirements:

**User Profile:**
- Skill Level: ${skillLevel}
- Technical Interest: ${interest}
- Target Industry/Department: ${department}
${projectType && projectType !== "Any" ? `- Preferred Project Type: ${projectType}` : ""}
${timeCommitment && timeCommitment !== "Flexible" ? `- Time Commitment: ${timeCommitment}` : ""}

**Requirements:**
1. Projects should be relevant to the ${department} industry/sector
2. Match the ${skillLevel} skill level appropriately
3. Focus on ${interest} technologies and concepts
4. Include real-world applications and impact
5. Be innovative and address current industry challenges

For each project, provide:
- A compelling project title that reflects its purpose
- A detailed description (2-3 sentences) explaining the project, its goals, and real-world impact
- Difficulty rating (Easy, Medium, Hard) appropriate for ${skillLevel} level
- Key technologies/frameworks/tools needed
- Realistic estimated time to complete

Make the projects practical, achievable, and valuable for portfolio building.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "suggest_projects",
              description: "Return 5 actionable project suggestions.",
              parameters: {
                type: "object",
                properties: {
                  projects: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                        difficulty: { type: "string", enum: ["Easy", "Medium", "Hard"] },
                        technologies: { 
                          type: "array",
                          items: { type: "string" }
                        },
                        estimatedTime: { type: "string" }
                      },
                      required: ["title", "description", "difficulty", "technologies", "estimatedTime"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["projects"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "suggest_projects" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No tool call in response");
    }

    const projects = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(projects), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error in suggest-projects:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
