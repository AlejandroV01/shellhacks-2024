import { Line, LineChart, ResponsiveContainer, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { type ChartConfig } from "@/components/ui/chart";
import { INote } from "@/store/useGlobalStore";
import { getQuizScore } from "@/lib/getQuizScore";

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

function formatDate(date: Date) {
  const dateFormatted = new Date(date);

  const month = String(dateFormatted.getMonth() + 1).padStart(2, "0"); // Add 1 because getMonth() returns 0-11
  const day = String(dateFormatted.getDate()).padStart(2, "0");
  const year = String(dateFormatted.getFullYear()).slice(-2); // Get last two digits of the year

  return `${month}/${day}/${year}`;
}

export const ProgressGraph = ({ note }: { note: INote }) => {
  const noteQuizData = note.quizzes
    .map((quiz) => {
      const isQuizCompleted =
        quiz.currentQuestionIndex + 1 === quiz.questions.length;

      if (!isQuizCompleted) return null;

      const quizResults = getQuizScore({ quiz });

      return {
        date: formatDate(quiz.createdAt),
        score: quizResults.percent,
      };
    })
    .filter(Boolean);

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={noteQuizData}>
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
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
