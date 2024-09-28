import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { QuestionType } from "@/pages/api/get-questions";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";

type Props = {
  onClickCallback: () => void;
  wasAnswerSelected: boolean;
  answer: QuestionType["answers"][number];
  currentQuestion: QuestionType;
  handleGetQuestionDeepDive: ({
    question,
  }: {
    question: string;
  }) => Promise<string | null>;
};

export const AnswerButton = ({
  onClickCallback,
  wasAnswerSelected,
  answer,
  currentQuestion,
}: Props) => {
  return (
    <motion.div
      onClick={onClickCallback}
      className={cn(
        "w-full border border-gray-500 p-5 rounded-lg my-5 cursor-pointer",
        wasAnswerSelected && answer.isCorrect && "bg-green-500 text-white",
        wasAnswerSelected && !answer.isCorrect && "bg-red-500 text-white my-8"
      )}
      initial={{ scale: 1 }}
      animate={{ scale: wasAnswerSelected ? 1.1 : 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={wasAnswerSelected ? "selected" : "not-selected"}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex space-x-2"
        >
          {wasAnswerSelected && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
            >
              {answer.isCorrect ? <Check /> : <X />}
            </motion.span>
          )}

          <h3>{answer.text}</h3>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {wasAnswerSelected && !answer.isCorrect && (
          <motion.div
            className="mt-5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p> {currentQuestion.explanation}</p>
            <Alert className="bg-background text-foreground mt-5">
              <AlertTitle>Counter argument</AlertTitle>
              <AlertDescription>{answer.counterArgument}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
