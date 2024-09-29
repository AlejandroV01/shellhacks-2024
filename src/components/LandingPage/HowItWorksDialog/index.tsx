import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const HowItWorksDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button type="button" variant="ghost">
          How it works?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">
            How will Quiz Sensei help you out ace your tests?
          </DialogTitle>
          <DialogDescription>
            <p className="text-md">
              Input your content: Paste your notes, prompts, or any topic you
              want to quiz yourself on into the program. Question generation:
              The program will analyze your input and create different types of
              quiz questions (either true/false or multiple-choice).Answer and
              score: As you select each answer, the program will immediately
              score your response and provide an option to explore further
              details on incorrect answers.Save and revisit: Your quiz history
              is saved automatically, so you can review previous quizzes and
              scores at any time.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
