import { AnswerSelector } from "@/components/AnswerSelector";
import { MainLayout } from "@/components/Layouts/MainLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetQuestions } from "@/hooks/useGetQuestions";
import useGlobalStore from "@/store/useGlobalStore";
import { CircleX } from "lucide-react";

const TestPage = () => {
  const { notes } = useGlobalStore();
  const { isLoading, quiz, error } = useGetQuestions();

  const localStorageUpdatedQuiz = notes.find
    ? notes
        .find((note) => note.id === quiz?.noteId)
        ?.quizzes.find((q) => q.id === quiz?.id)
    : null;

  const renderQuestions = () => {
    if (isLoading) {
      return (
        <div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-[20%] h-10" />
          </div>

          <div className="flex flex-col space-y-5 mt-5 p-5">
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <Alert className="border-red-500 text-red-500">
          <CircleX className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            An error occurred while fetching the questions, try again later.
          </AlertDescription>
        </Alert>
      );
    }

    if (!quiz || !quiz.questions) {
      return (
        <div>
          <p>There was an error fetching the questions</p>
        </div>
      );
    }

    if (!localStorageUpdatedQuiz) {
      return <div>Localstorage issue</div>;
    }

    return (
      <div className="px-5 sm:px-10">
        <AnswerSelector quiz={localStorageUpdatedQuiz} />
      </div>
    );
  };

  return <MainLayout>{renderQuestions()}</MainLayout>;
};

export default TestPage;
