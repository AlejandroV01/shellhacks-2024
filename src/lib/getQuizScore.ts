import { IQuiz } from "@/store/useGlobalStore";

export const getQuizScore = ({ quiz }: { quiz: IQuiz }) => {
  const correctAnswers = quiz.questions.filter((question) => {
    const correctAnswer = question.answers.find(
      (answer) => answer.isCorrect
    )?.text;

    return question.userSelection === correctAnswer;
  });

  const score = correctAnswers.length / quiz.questions.length;
  const percent = Math.round(score * 100);

  return {
    correctAnswers,
    score,
    percent,
  };
};
