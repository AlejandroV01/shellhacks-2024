import { AnimatedDivOnTrueValue } from "@/components/Animated/AnimatedDivOnTrueValue";
import { MainLayout } from "@/components/Layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { generateRandomId } from "@/lib/generateRandomId";
import { cn } from "@/lib/utils";
import { StoreAppType } from "@/store/types/AppType";
import useGlobalStore, { IQuiz } from "@/store/useGlobalStore";
import { sendGAEvent } from "@next/third-parties/google";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

type StudyModeType = {
  type: IQuiz["quizType"];
  title: string;
  description: string;
};

const studyModes: StudyModeType[] = [
  {
    type: "multiple-choice",
    title: "Multiple choice",
    description:
      "Answer multiple-choice questions. If you choose incorrectly, we'll explain why and adjust the following questions to help you improve.",
  },
  {
    type: "true-or-false",
    title: "True or false",
    description:
      "Answer true/false questions. If you choose incorrectly, we'll explain why and adapt future questions to focus on areas needing improvement.",
  },
];

const ChooseStudyMode = () => {
  const router = useRouter();
  const { addQuiz } = useGlobalStore();

  const noteId = router.query.noteId as string;

  const [tempSelection, setTempSelection] = useState<
    (typeof studyModes)[number]["type"] | null
  >(null);

  const [tempDifficulty, setTempDifficulty] =
    useState<StoreAppType["difficulty"]>("easy");
  const [tempQuestionAmount, setTempQuestionAmount] =
    useState<StoreAppType["questionAmount"]>(10);
  const [error, setError] = useState(false);

  const handleContinue = () => {
    if (!tempSelection) {
      setError(true);
      return;
    }

    const quiz: IQuiz = {
      currentQuestionIndex: 0,
      id: generateRandomId(),
      noteId,
      quizType: tempSelection,
      questions: [],
      score: 0,
      difficulty: tempDifficulty,
      questionAmount: tempQuestionAmount,
      createdAt: new Date(),
    };

    addQuiz({ quiz });

    sendGAEvent("event", `choose_study_mode_(${tempSelection})`);

    setTimeout(() => {
      router.push(`/${noteId}/choose-study-mode/${quiz.id}`);
    }, 100);
  };

  return (
    <MainLayout>
      <h1>Choose study mode</h1>
      <div>
        {studyModes.map((mode) => {
          const isSelected = tempSelection === mode.type;

          return (
            <AnimatePresence key={mode.type} mode="wait">
              <motion.div
                key={mode.type}
                onClick={() => {
                  setError(false);
                  setTempSelection(mode.type);
                }}
                animate={{
                  scale: isSelected ? 1.05 : 1,
                  opacity: tempSelection !== null && !isSelected ? 0.5 : 1,
                }}
                transition={{ duration: 0.5, type: "spring" }}
                className={cn(
                  "my-5 border p-5 rounded-xl border-gray-500 hover:-translate-y-1 cursor-pointer hover:border-gray-300",
                  isSelected && "border-blue-500 hover:border-blue-500"
                )}
              >
                <h2 className="text-2xl font-bold">{mode.title}</h2>
                <p className="text-gray-400">{mode.description}</p>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="grid grid-cols-2 space-x-3 mt-5 w-[400px] max-w-fit"
                  >
                    <div>
                      <Label>Difficulty</Label>
                      <Select
                        onValueChange={(value: StoreAppType["difficulty"]) => {
                          setTempDifficulty(value);
                        }}
                        defaultValue={tempDifficulty}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>No of Questions</Label>
                      <Select
                        onValueChange={(value: string) => {
                          setTempQuestionAmount(parseInt(value));
                        }}
                        defaultValue={tempQuestionAmount.toString()}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Questions" />
                        </SelectTrigger>
                        <SelectContent>
                          {[5, 10, 15, 20].map((amount) => (
                            <SelectItem key={amount} value={amount.toString()}>
                              {amount}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          );
        })}
      </div>
      {error && (
        <div>
          <p className="text-red-500 text-sm mt-2">
            Please select a study mode
          </p>
        </div>
      )}
      <AnimatedDivOnTrueValue condition={tempSelection !== null}>
        <Separator className="my-5 mt-10" />
        <div className="flex justify-between ">
          <Link href={`/${noteId}`}>
            <Button variant="outline">Back</Button>
          </Link>
          <div className="flex space-x-3">
            <Button onClick={() => handleContinue()}>Continue</Button>
          </div>
        </div>
      </AnimatedDivOnTrueValue>
    </MainLayout>
  );
};

export default ChooseStudyMode;
