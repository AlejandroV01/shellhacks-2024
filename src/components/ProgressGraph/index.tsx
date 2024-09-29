import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis } from "recharts";

import { type ChartConfig } from "@/components/ui/chart";
import { getQuizScore } from "@/lib/getQuizScore";
import { INote } from "@/store/useGlobalStore";
import { getDaysAgoQuiz } from "@/lib/getDaysAgoQuiz";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export const ProgressGraph = ({ note }: { note: INote }) => {
  const noteQuizData = note.quizzes
    .map((quiz) => {
      const isQuizCompleted =
        quiz.currentQuestionIndex + 1 === quiz.questions.length;

      if (!isQuizCompleted) return null;

      const quizResults = getQuizScore({ quiz });

      return {
        date: getDaysAgoQuiz(new Date(quiz.createdAt)),
        score: quizResults.percent,
      };
    })
    .filter(Boolean);

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={noteQuizData}>
          <ChartTooltip content={<ChartTooltipContent />} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
