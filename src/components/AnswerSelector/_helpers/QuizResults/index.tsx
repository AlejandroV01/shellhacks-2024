import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getQuizScore } from "@/lib/getQuizScore";
import { cn } from "@/lib/utils";
import { IQuiz } from "@/store/useGlobalStore";

type Props = {
  quiz: IQuiz;
};

export const QuizResults = ({ quiz }: Props) => {
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
                  ? "border-green-500 bg-green-100"
                  : "border-red-500 bg-red-100"
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
      <h1 className="text-3xl font-bold">
        Result: {getQuizScore({ quiz }).percent}%
      </h1>
      <div>
        <p>
          You got {getQuizScore({ quiz }).correctAnswers.length} out of{" "}
          {quiz.questions.length} questions correct
        </p>
      </div>

      <div>{renderQuizResults()}</div>
    </div>
  );
};
