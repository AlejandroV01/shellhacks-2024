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
  userInput: z.string().min(1, { message: "User input is required." }),
  type: z.literal("true-or-false").or(z.literal("multiple-choice")),
  difficulty: z.literal("easy").or(z.literal("medium")).or(z.literal("hard")),
  questionAmount: z.number().int().min(1).max(20),
});

export const QuestionAndAnswerFormat = z.object({
  title: z.string(),
  questions: z.array(
    z.object({
      question: z.string(),
      explanation: z.string(),
      answers: z.array(
        z.object({
          text: z.string(),
          isCorrect: z.boolean(),
          counterArgument: z.string(),
        })
      ),
    })
  ),
});

export type QuestionType = z.infer<
  typeof QuestionAndAnswerFormat
>["questions"][number];

export type ApiGetQuestionsType = {
  message: string;
  data: { questions: QuestionType[]; title: string } | null;
  errors?: z.ZodFormattedError<
    {
      userInput: string;
    },
    string
  >;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiGetQuestionsType>
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

  const { userInput, type, questionAmount, difficulty } = parseResult.data;

  const prompt = `You are a teacher generating ${
    type === "multiple-choice"
      ? "multiple choice (ensure only one of the provided answers is correct)"
      : "true or false"
  } questions. You must generate an array of questions based on the statement or data provided by the user. This questions should have a ${difficulty} difficulty, the harder the question the longer it should be. Each question must have an explanation and an array of answers. Each answer must have a text, being the answer, a boolean indicating if it is correct or not, and a counter argument if the answer is not correct explaining why it is incorrect. Always return ${questionAmount} questions.`;

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini-2024-07-18",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: `You must create the questions using this context: "${userInput}".`,
      },
    ],
    response_format: zodResponseFormat(QuestionAndAnswerFormat, "event"),
  });

  const event = completion.choices[0].message.parsed;

  res.status(200).json({ message: "All good", data: event });
}
