import { QuestionType } from "@/pages/api/get-questions";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { AnswerButton } from "./_helpers/AnswerButton";
import { AnimatedDivOnTrueValue } from "../Animated/AnimatedDivOnTrueValue";
import { useGetQuestionDeepDive } from "@/hooks/useGetQuestionDeepDive";
import MarkdownRenderer from "../MarkdownRenderer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {
  questions: QuestionType[];
  handleGetQuestions: () => Promise<QuestionType[] | null>;
};

export const AnswerSelector = ({ questions, handleGetQuestions }: Props) => {
  const {
    isLoading,
    handleGetQuestionDeepDive,
    markdown,
    handleClearDeepDive,
  } = useGetQuestionDeepDive();

  const scrollToDeepDiveRef = useRef<HTMLDivElement | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [wasAnswerSelected, setWasAnswerSelected] = useState<string | null>(
    null
  );

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      toast("no more questions");
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setWasAnswerSelected(null);
    handleClearDeepDive();
  };

  const handleStartOver = ({ reset }: { reset: boolean }) => {
    setCurrentQuestionIndex(0);
    setWasAnswerSelected(null);
    handleClearDeepDive();

    if (reset) {
      (async () => {
        await handleGetQuestions();
      })();
    }
  };

  const executeScroll = () => {
    if (scrollToDeepDiveRef.current) {
      scrollToDeepDiveRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleSelectQuestion = (question: QuestionType["answers"][number]) => {
    if (wasAnswerSelected) return;

    setWasAnswerSelected(question.text);
  };

  const renderSelectedQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (currentQuestion) {
      return (
        <div>
          <div className=" my-10 mx-auto flex justify-center">
            <h1 className="text-3xl">{currentQuestion.question}</h1>
          </div>
          {currentQuestion.answers.map((answer, index) => {
            const isSelected = wasAnswerSelected === answer.text;

            return (
              <AnswerButton
                handleGetQuestionDeepDive={handleGetQuestionDeepDive}
                key={`${answer.text}-${index}`}
                answer={answer}
                currentQuestion={currentQuestion}
                onClickCallback={() => handleSelectQuestion(answer)}
                wasAnswerSelected={isSelected}
              />
            );
          })}
          <AnimatedDivOnTrueValue
            condition={wasAnswerSelected !== null}
            delay={0.5}
            className="flex py-3 justify-between"
          >
            <div>
              {isLastQuestion && (
                <Popover>
                  <PopoverTrigger>
                    <Button variant="outline">Start over</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col space-y-3">
                      <Button
                        onClick={() => handleStartOver({ reset: false })}
                        variant="ghost"
                        className="w-full"
                      >
                        Retry same questions
                      </Button>
                      <Button
                        onClick={() => handleStartOver({ reset: true })}
                        className="w-full"
                      >
                        Regenerate Questions
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            <div className="flex align-middle space-x-3">
              {!markdown && !isLoading && (
                <motion.div
                  className="flex justify-end"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant="outline"
                          onClick={() => {
                            handleGetQuestionDeepDive({
                              question: currentQuestion.question,
                            });

                            setTimeout(() => {
                              executeScroll();
                            }, 200);
                          }}
                        >
                          <div className="flex justify-center items-center space-x-1 pl-1 pr-3">
                            <Lightbulb className="h-4" /> <span>Deep Dive</span>
                          </div>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Use AI to explore and gain deeper insights into this
                          topic.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              )}
              <Button disabled={isLastQuestion} onClick={handleNextQuestion}>
                <div className="flex align-middle justify-center items-center">
                  <p>
                    Next Question{" "}
                    {`${currentQuestionIndex + 1}/${questions.length}`}
                  </p>
                  <ArrowRight className="h-4" />
                </div>
              </Button>
            </div>
          </AnimatedDivOnTrueValue>
        </div>
      );
    }
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {renderSelectedQuestion()}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={markdown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div ref={scrollToDeepDiveRef} className="mt-10">
            {isLoading && (
              <div className="space-y-5">
                <Skeleton className="h-12 w-[40%]" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
            )}
            {markdown && (
              <MarkdownRenderer markdown={markdown.replace(/\\n/g, "\n")} />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
