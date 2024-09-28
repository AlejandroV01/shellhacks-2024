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
  data: { questions: QuestionType[] } | null;
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

  const prompts = [
    `You are a teacher generating ${
      type === "multiple-choice"
        ? "multiple-choice questions with only one correct answer."
        : "true/false questions."
    }`,
    "You need to create an array of questions based on the user's provided input.",
    `Difficulty of the questions should be '${difficulty}', with the complexity of harder questions reflected in length and reasoning.`,
    `Each question must include a detailed explanation and an array of answers, each answer containing:`,
    `1. The answer text.`,
    `2. A boolean indicating if the answer is correct.`,
    `3. If incorrect, provide a counter-argument explaining why it is incorrect.`,
    `Generate ${questionAmount} questions, ensuring answers are contextually valid.`,
  ];

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini-2024-07-18",
    messages: [
      {
        role: "system",
        content: prompts.join(" "),
      },
      {
        role: "user",
        content: `Please create questions using the following context: "${userInput}".`,
      },
    ],
    response_format: zodResponseFormat(QuestionAndAnswerFormat, "event"),
  });

  const event = completion.choices[0].message.parsed;

  res.status(200).json({ message: "All good", data: event });
}
