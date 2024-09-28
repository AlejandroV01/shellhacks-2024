/* eslint-disable @next/next/no-img-element */
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generateRandomId } from "@/lib/generateRandomId";
import { ApiGetTitleType } from "@/pages/api/get-title";
import useGlobalStore, { INote } from "@/store/useGlobalStore";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatedDivOnTrueValue } from "../Animated/AnimatedDivOnTrueValue";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Textarea } from "../ui/textarea";
import BackgroundAnimation from "./BackgroundAnimated";

type InputFields = {
  notes: string;
};

export const LandingPage = () => {
  const { addNote, notes } = useGlobalStore();
  const router = useRouter();

  const [selectedTempNoteId, setSelectedTempNoteId] = useState<string | null>(
    null
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputFields>();

  const handleEnterNote = (noteId: string) => {
    router.push(`/${noteId}`);
  };

  const onSubmit = async (data: InputFields) => {
    const response = await fetch("/api/get-title", {
      method: "POST",
      body: JSON.stringify({ userInput: data.notes }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = (await response.json()) as ApiGetTitleType;
    if (!resData.data) {
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

    router.push(`/${newNote.id}/choose-study-mode`);
  };

  return (
    <main className="p-10 flex flex-col items-center w-full bg-transparent mb-[200px]">
      <div className="fixed top-0 left-0 flex items-center justify-center w-full mt-20">
        <BackgroundAnimation />
      </div>
      <nav className="flex justify-between w-full">
        <div className="flex items-center gap-1">
          <img src="/images/Logo.png" alt="" className="w-[60px]" />
          <span>GPT Teacher</span>
        </div>
        <div>
          <ModeToggle />
        </div>
      </nav>
      <section className="flex flex-col items-center w-full mt-14 gap-5 max-w-[1000px]">
        <span>GPT Teacher | The best teacher ever!</span>
        <h2 className="text-5xl">
          <span className="font-bold">Quiz</span> at the speed of light!
        </h2>
        <span className="text-foreground/50">
          One button away from creating a quiz based on your notes.
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Card className="w-full pt-6 backdrop-blur-2xl bg-background/40">
            <CardContent>
              <Textarea
                {...register("notes", {
                  required: "This field is required",
                })}
                placeholder="Paste your notes here"
                rows={8}
              />
              {errors.notes && (
                <span className="text-red-500">{errors.notes.message}</span>
              )}
            </CardContent>
            <CardFooter>
              <Button>Start Quiz</Button>
            </CardFooter>
          </Card>
        </form>
        <h3 className="text-xl text-foreground/80 mr-auto">Previous Notes</h3>
        {notes.length === 0 && (
          <Alert className="backdrop-blur-2xl bg-background/40">
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
              <div className="w-full" key={note.id}>
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
                  className="w-full"
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <Card className="w-full pt-6 backdrop-blur-2xl bg-background/40 cursor-pointer">
                    <CardContent>
                      <h3 className="text-xl font-bold">{note.id}</h3>
                      <p className="truncate">{note.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
                <AnimatedDivOnTrueValue
                  condition={note.id === selectedTempNoteId}
                >
                  <div className="flex justify-end my-5">
                    <Button onClick={() => handleEnterNote(note.id)}>
                      Enter Note
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
