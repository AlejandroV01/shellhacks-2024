/* eslint-disable @next/next/no-img-element */
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generateRandomId } from "@/lib/generateRandomId";
import { ApiGetTitleType } from "@/pages/api/get-title";
import useGlobalStore, { INote } from "@/store/useGlobalStore";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  LoaderCircle,
  PencilLine,
  Terminal,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatedDivOnTrueValue } from "../Animated/AnimatedDivOnTrueValue";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Textarea } from "../ui/textarea";
import BackgroundAnimation from "./BackgroundAnimated";
import { HowItWorksDialog } from "./HowItWorksDialog";

type InputFields = {
  notes: string;
};

export const LandingPage = () => {
  const { addNote, notes } = useGlobalStore();
  const router = useRouter();

  const [selectedTempNoteId, setSelectedTempNoteId] = useState<string | null>(
    null
  );
  const [isGetTitleLoading, setIsGetTitleLoading] = useState(false);
  const [getTitleError, setGetTitleError] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputFields>();

  const handleEnterNote = (noteId: string) => {
    router.push(`/${noteId}`);
  };

  const onSubmit = async (data: InputFields) => {
    setIsGetTitleLoading(true);
    setGetTitleError(false);

    try {
      const response = await fetch("/api/get-title", {
        method: "POST",
        body: JSON.stringify({ userInput: data.notes }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = (await response.json()) as ApiGetTitleType;

      if (!resData.data) {
        setGetTitleError(true);
        setIsGetTitleLoading(false);
        return;
      }

      const newNote: INote = {
        title: resData.data.data.title,
        description: resData.data.data.description,
        id: generateRandomId(),
        content: data.notes,
        quizzes: [],
      };

      addNote({
        note: newNote,
      });
      setIsGetTitleLoading(false);

      router.push(`/${newNote.id}/choose-study-mode`);
    } catch (error) {
      setIsGetTitleLoading(false);
      setGetTitleError(true);
      console.error(error);
    }
  };

  return (
    <main className="p-10 flex flex-col items-center w-full bg-transparent mb-[200px]">
      <Link
        className="flex items-center gap-1 absolute top-4 left-4"
        href={"/"}
      >
        <img src="/images/Logo.png" alt="" className="w-[50px]" />
        <span>Quiz Sensei</span>
      </Link>
      <div className="fixed top-0 left-0 flex items-center justify-center w-full mt-20">
        <BackgroundAnimation />
      </div>
      <section className="flex flex-col items-center w-full mt-14 gap-5 max-w-[1000px]">
        <span>Quiz Sensei | The best teacher ever!</span>
        <h2 className="text-5xl">
          <span className="font-bold">Quiz</span> at the speed of light!
        </h2>
        <span className="text-foreground/50">
          One button away from creating a quiz based on your notes.
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full backdrop-blur-lg bg-background/40"
        >
          <Card className="w-full pt-6 backdrop-blur-lg bg-background/20 transition-all">
            <CardContent>
              <Textarea
                {...register("notes", {
                  required: "This field is required",
                })}
                placeholder="Type a topic, or paste your notes here..."
                rows={8}
              />

              {errors.notes && (
                <span className="text-red-500">{errors.notes.message}</span>
              )}
            </CardContent>

            <CardFooter className="flex flex-col items-end transition-all">
              <div className="flex justify-between w-full">
                <HowItWorksDialog />

                <Button className="space-x-2 flex" disabled={isGetTitleLoading}>
                  <p>Start Quiz</p>
                  {isGetTitleLoading ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <PencilLine className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <AnimatePresence>
                {getTitleError && (
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.4, type: "spring" }}
                  >
                    <Alert className="mt-5 bg-red-500 w-full">
                      <X className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        Something went wrong, please try again later, or contact
                        the developers using the{" "}
                        <Link className="underline" href="/contact">
                          contact page
                        </Link>
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardFooter>
          </Card>
        </form>
        <h3 className="text-xl font-bold text-foreground/80 mr-auto mt-5">
          Previous Notes
        </h3>
        {notes.length === 0 && (
          <Alert className="backdrop-blur-2xl bg-background/70">
            <Terminal className="h-4 w-4" />
            <AlertTitle className="font-semibold text-lg">Heads up!</AlertTitle>
            <AlertDescription>
              Add your first note using the box above!
            </AlertDescription>
          </Alert>
        )}
        {notes.length > 0 &&
          notes.map((note) => {
            return (
              <div className="w-full rounded-lg" key={note.id}>
                <motion.div
                  key={note.id}
                  onClick={() => {
                    setSelectedTempNoteId(note.id);
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  animate={{
                    scale: selectedTempNoteId === note.id ? 1.05 : 1,
                  }}
                  className="w-full backdrop-blur-lg z-10 bg-background/20 rounded-lg"
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <Card className="w-full pt-6 backdrop-blur-2xl bg-background/40 cursor-pointer ">
                    <CardContent>
                      <h3 className="text-xl font-bold">{note.title}</h3>
                      <p className="truncate">{note.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
                <AnimatedDivOnTrueValue
                  condition={note.id === selectedTempNoteId}
                >
                  <div className="flex justify-end my-5">
                    <Button
                      className="flex space-x-2"
                      onClick={() => handleEnterNote(note.id)}
                    >
                      <p>Open Note</p>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </AnimatedDivOnTrueValue>
              </div>
            );
          })}
      </section>
    </main>
  );
};
