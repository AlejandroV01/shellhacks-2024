import { ApiGetQuestionsType } from "@/pages/api/get-questions";
import useGlobalStore, { IQuiz } from "@/store/useGlobalStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useGetQuestions = () => {
  const { notes, updateQuiz } = useGlobalStore();
  const router = useRouter();

  const noteId = router.query.noteId as string;
  const quizId = router.query.quizId as string;

  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [error, setError] = useState(false);

  const handleGetQuestions = async (): Promise<IQuiz | null> => {
    console.log("noteId", noteId);

    const currentNote = notes.find((note) => note.id === noteId);
    const currentQuiz = currentNote?.quizzes.find((quiz) => quiz.id === quizId);

    if (currentQuiz?.questions && currentQuiz.questions.length > 0) {
      setIsLoading(false);
      return currentQuiz;
    }

    try {
      setIsLoading(true);

      if (!currentNote || !currentQuiz) {
        alert("Note not found");
        return null;
      }

      const response = await fetch("/api/get-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: currentNote.content,
          difficulty: currentQuiz.difficulty,
          questionAmount: currentQuiz.questionAmount,
          type: currentQuiz?.quizType,
        }),
      });

      const data = (await response.json()) as ApiGetQuestionsType;

      if (!data || !data.data) {
        setError(true);
        return null;
      }

      const questions = data.data.questions;

      updateQuiz(noteId, quizId, {
        questions,
      });

      setIsLoading(false);
      return { ...currentQuiz, questions };
    } catch {
      setError(true);
      setIsLoading(false);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      if (!noteId || !quizId) return;

      const questionsResponse = await handleGetQuestions();

      setIsLoading(false);
      setQuiz(questionsResponse);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, quizId]);

  return { isLoading, quiz, handleGetQuestions, error };
};
