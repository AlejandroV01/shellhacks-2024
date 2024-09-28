import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { getQuizScore } from "@/lib/getQuizScore";
import { cn } from "@/lib/utils";
import { IQuiz } from "@/store/useGlobalStore";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/router";

type Props = {
  quiz: IQuiz;
};

export const QuizResults = ({ quiz }: Props) => {
  const router = useRouter();

  const returnToNoteButton = () => {
    return (
      <Button
        variant="outline"
        className="flex items-center space-x-2"
        onClick={() => {
          router.push(`/${quiz.noteId}`);
        }}
      >
        <Undo2 className="h-4 w-4" />
        <p>Return To Note</p>
      </Button>
    );
  };

  const renderQuizResults = () => {
    return quiz.questions.map((question) => {
      const correctAnswer = question.answers.find(
        (answer) => answer.isCorrect
      )?.text;

      return (
        <Alert className="my-5" key={question.question}>
          <AlertTitle className="text-xl">{question.question}</AlertTitle>
          <div>
            <p>Correct Answer: {correctAnswer}</p>
            <Alert
              className={cn(
                "mt-3",
                question.userSelection === correctAnswer
                  ? "border-green-500 bg-green-100 dark:bg-green-800/50"
                  : "border-red-500 bg-red-100 dark:bg-red-800/50",
                "text-foreground"
              )}
            >
              <AlertTitle>You answered</AlertTitle>
              <AlertDescription className="font-bold">
                {question.userSelection}
              </AlertDescription>
            </Alert>
          </div>
        </Alert>
      );
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Result: {getQuizScore({ quiz }).percent}%
          </h1>
          <div>
            <p>
              You got {getQuizScore({ quiz }).correctAnswers.length} out of{" "}
              {quiz.questions.length} questions correct
            </p>
          </div>
        </div>
        {returnToNoteButton()}
      </div>

      <div>{renderQuizResults()}</div>
      <div className="flex justify-end items-center">
        {returnToNoteButton()}
      </div>
    </div>
  );
};
