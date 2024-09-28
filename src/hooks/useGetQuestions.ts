import {
  ApiTrueOrFalseGetQuestionsResponseType,
  QuestionType,
} from "@/pages/api/get-questions";
import useGlobalStore from "@/store/useGlobalStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useGetQuestions = () => {
  const { notes, updateNote, updateQuiz } = useGlobalStore();
  const router = useRouter();

  const noteId = router.query.noteId as string;
  const quizId = router.query.quizId as string;

  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [error, setError] = useState(false);

  const handleGetQuestions = async () => {
    console.log("noteId", noteId);

    const currentNote = notes.find((note) => note.id === noteId);
    const currentQuiz = currentNote?.quizzes.find((quiz) => quiz.id === quizId);

    if (currentQuiz?.questions && currentQuiz.questions.length > 0) {
      setIsLoading(false);
      return currentQuiz.questions;
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

      const data =
        (await response.json()) as ApiTrueOrFalseGetQuestionsResponseType;

      if (!data || !data.data) {
        setError(true);
        return null;
      }

      const questions = data.data.questions;

      updateNote(noteId, {
        title: data.data.title,
      });

      updateQuiz(noteId, quizId, {
        questions,
      });

      setIsLoading(false);
      return questions;
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
      setQuestions(questionsResponse);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, quizId]);

  return { isLoading, questions, handleGetQuestions, error };
};