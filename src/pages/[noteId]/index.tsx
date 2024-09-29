import { AnimatedDivOnTrueValue } from "@/components/Animated/AnimatedDivOnTrueValue";
import { MainLayout } from "@/components/Layouts/MainLayout";
import { ProgressGraph } from "@/components/ProgressGraph";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getDaysAgoQuiz } from "@/lib/getDaysAgoQuiz";
import { getQuizScore } from "@/lib/getQuizScore";
import { cn } from "@/lib/utils";
import useGlobalStore from "@/store/useGlobalStore";
import { sendGAEvent } from "@next/third-parties/google";
import { Separator } from "@radix-ui/react-select";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpenCheck, ChartArea, Map } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
const NotePage = () => {
  const router = useRouter();
  const { notes } = useGlobalStore();

  const noteId = router.query.noteId as string;
  const note = notes.find((note) => note.id === noteId);

  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  const handleCreateNewQuiz = ({ quizId }: { quizId: string }) => {
    if (quizId === "new") {
      sendGAEvent("event", "create_new_quiz_note_page");

      router.push(`/${noteId}/choose-study-mode`);
      return;
    }

    sendGAEvent("event", "review_quiz");
    router.push(`/${noteId}/choose-study-mode/${quizId}`);
  };

  const continueToQuizButton = ({
    quizId,
    currentQuestionIndex,
    questionsLength,
  }: {
    quizId: string;
    currentQuestionIndex: number;
    questionsLength: number;
  }) => {
    const getButtonTitle = () => {
      if (quizId === "new") return "Start Quiz";
      if (questionsLength > 1 && currentQuestionIndex === questionsLength - 1)
        return "Review Quiz";

      return "Continue Quiz";
    };

    return (
      <AnimatedDivOnTrueValue condition={true}>
        <Separator className="my-5" />
        <div className="flex justify-end">
          <div className="flex space-x-3">
            <Button
              className="flex space-x-2"
              onClick={() => handleCreateNewQuiz({ quizId })}
            >
              <span>{getButtonTitle()}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </AnimatedDivOnTrueValue>
    );
  };

  const handleRenderCorrectComponent = () => {
    if (!note) return null;

    if (!notes || notes.find((note) => note.id === noteId) === undefined) {
      return (
        <Alert className="bg-black mt-5">
          <Map className="h-4 w-4" />
          <AlertTitle>Note not found </AlertTitle>
          <AlertDescription>
            You do not have the note you are looking for
          </AlertDescription>
          <div className="mt-3">
            <Link href="/">
              <Button variant="outline">Go Back</Button>
            </Link>
          </div>
        </Alert>
      );
    }

    return (
      <>
        <div>
          <motion.div
            onClick={() => {
              setSelectedQuizId("new");
            }}
            whileHover={{
              y: -5,
            }}
            animate={{
              scale: selectedQuizId === "new" ? 1.05 : 1,
            }}
            transition={{ duration: 0.5, type: "spring" }}
            className={cn(
              "my-5 border p-5 rounded-xl border-gray-500 hover:-translate-y-1 cursor-pointer",
              selectedQuizId === "new" &&
                "border-blue-500 hover:border-blue-500"
            )}
          >
            <div className="flex items-center space-x-5">
              <BookOpenCheck />
              <div>
                <h2 className="text-2xl font-bold">New quiz</h2>
                <p className="text-gray-400">Start a new quiz</p>
              </div>
            </div>
          </motion.div>
          <div className="mb-10">
            {selectedQuizId === "new" &&
              continueToQuizButton({
                quizId: "new",
                currentQuestionIndex: 0,
                questionsLength: 0,
              })}
          </div>
        </div>

        <Separator />
        <AnimatePresence mode="wait">
          <h1 className="mt-5 text-xl font-bold">Previous completed quizzes</h1>
          {note.quizzes.length <= 2 ? (
            <Alert className="mt-3 mb-10">
              <ChartArea className="h-4 w-4" />
              <AlertTitle>Your progress graph</AlertTitle>
              <AlertDescription>
                Complete at least 3 quizzes to see a graph of your progress over
                time.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="w-full h-[150px] my-10">
              <ProgressGraph note={note} />
            </div>
          )}

          <div>
            {note.quizzes.toReversed().map((quiz, index) => {
              const questionsPercentageOfCompletion = Math.round(
                ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100
              );

              const isQuizCompleted =
                quiz.currentQuestionIndex + 1 === quiz.questions.length;

              const quizResults = getQuizScore({ quiz });

              return (
                <div key={quiz.id}>
                  <motion.div
                    onClick={() => {
                      setSelectedQuizId(quiz.id);
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    animate={{
                      scale: selectedQuizId === quiz.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className={cn(
                      "my-5 border p-5 rounded-xl border-gray-500 hover:-translate-y-1 cursor-pointer",
                      selectedQuizId === quiz.id &&
                        "border-blue-500 hover:border-blue-500"
                    )}
                  >
                    <div className="flex items-baseline space-x-3 ">
                      <h2 className="text-2xl font-bold">
                        Quiz {note.quizzes.length - index}
                      </h2>
                      <p>{isQuizCompleted ? "Completed" : "In Progress"}</p>
                    </div>
                    {isQuizCompleted && (
                      <div className="my-3">
                        <p>Score: {quizResults.percent}%</p>
                        <p>
                          You got {quizResults.correctAnswers.length} out of{" "}
                          {quiz.questions.length} questions correct
                        </p>
                      </div>
                    )}

                    {!isQuizCompleted && (
                      <Progress
                        color={
                          questionsPercentageOfCompletion < 100
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }
                        value={questionsPercentageOfCompletion}
                        className="my-3 text-red-500  "
                      />
                    )}

                    <p className="text-gray-400">
                      Created - {getDaysAgoQuiz(new Date(quiz.createdAt))}
                    </p>
                  </motion.div>
                  {selectedQuizId === quiz.id &&
                    continueToQuizButton({
                      quizId: quiz.id,
                      currentQuestionIndex: quiz.currentQuestionIndex,
                      questionsLength: quiz.questions.length,
                    })}
                </div>
              );
            })}
          </div>
        </AnimatePresence>
      </>
    );
  };

  return (
    <MainLayout>
      <h1 className="text-3xl">{note?.title}</h1>

      {handleRenderCorrectComponent()}
    </MainLayout>
  );
};

export default NotePage;
