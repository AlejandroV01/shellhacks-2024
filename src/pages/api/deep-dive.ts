import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export const maxDuration = 20;
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const RequestBodySchema = z.object({
  question: z.string().min(1, { message: "User input is required." }),
});

export const DeepDiveFormat = z.object({
  markdown: z.string(),
});

export type DeepDiveType = z.infer<typeof DeepDiveFormat>;

export type ApiDeepDiveResponse = {
  message: string;
  data: DeepDiveType | null;
  errors?: z.ZodFormattedError<
    {
      userInput: string;
    },
    string
  >;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiDeepDiveResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed", data: null });
  }

  const parseResult = RequestBodySchema.safeParse(req.body);

  if (!parseResult.success) {
    const errors = parseResult.error.format();

    return res.status(400).json({
      message: "Invalid request body.",
      data: null,
      errors,
    });
  }

  const { question } = parseResult.data;

  const prompt = `You are a teacher and you must create a deep dive explanation for your student on a topic. You must return the output in markdown format. You should use blocks of code, diagrams (using mermaid.js syntax, do NOT use overly complex diagrams that could contain wrong syntax). You must go straight to the point, do NOT use filler text or unnecessary information.`;

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini-2024-07-18",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: `The context is: "${question}".`,
      },
    ],
    response_format: zodResponseFormat(DeepDiveFormat, "event"),
  });

  const event = completion.choices[0].message.parsed;

  res.status(200).json({ message: "All good", data: event });
}
