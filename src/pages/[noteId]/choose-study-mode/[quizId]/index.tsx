import { AnswerSelector } from "@/components/AnswerSelector";
import { MainLayout } from "@/components/Layouts/MainLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
          <p>Loading...</p>
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
      <div className="px-10">
        <AnswerSelector quiz={localStorageUpdatedQuiz} />
      </div>
    );
  };

  return <MainLayout>{renderQuestions()}</MainLayout>;
};

export default TestPage;
