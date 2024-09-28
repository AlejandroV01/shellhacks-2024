import { AnimatedDivOnTrueValue } from "@/components/Animated/AnimatedDivOnTrueValue";
import { MainLayout } from "@/components/Layouts/MainLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import useGlobalStore from "@/store/useGlobalStore";
import { Separator } from "@radix-ui/react-select";
import { AnimatePresence, motion } from "framer-motion";
import { Map } from "lucide-react";
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
      router.push(`/${noteId}/choose-study-mode`);
      return;
    }

    router.push(`/${noteId}/choose-study-mode/${quizId}`);
  };

  const continueToQuizButton = ({ quizId }: { quizId: string }) => {
    return (
      <AnimatedDivOnTrueValue condition={true}>
        <Separator className="my-5" />
        <div className="flex justify-between ">
          <Link href="/enter-user-data">
            <Button variant="outline">Back</Button>
          </Link>
          <div className="flex space-x-3">
            <Button onClick={() => handleCreateNewQuiz({ quizId })}>
              Continue
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
            <h2 className="text-2xl font-bold">New quiz</h2>
            <p className="text-gray-400">Start a new quiz</p>
          </motion.div>
          <div className="mb-10">
            {selectedQuizId === "new" &&
              continueToQuizButton({ quizId: "new" })}
          </div>
        </div>

        <Separator />
        <AnimatePresence mode="wait">
          <h1 className="mt-5 text-xl font-bold">Previous completed quizzes</h1>
          <div>
            {note.quizzes.map((quiz, index) => (
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
                  <h2 className="text-2xl font-bold">Quiz {index + 1}</h2>
                  <p className="text-gray-400">HARDCODED - 2 hours ago</p>
                  <Progress
                    value={
                      ((quiz.currentQuestionIndex + 1) /
                        quiz.questions.length) *
                      100
                    }
                    className="mt-3"
                  />
                </motion.div>
                {selectedQuizId === quiz.id &&
                  continueToQuizButton({ quizId: quiz.id })}
              </div>
            ))}
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
