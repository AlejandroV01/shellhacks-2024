import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import howItWorksMd from "@/docs/how-it-works.md";
import { DialogTitle } from "@radix-ui/react-dialog";

export const HowItWorksDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button type="button" variant="ghost">
          How it works?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>How it works?</DialogTitle>
        <DialogHeader>
          <DialogDescription>
            <MarkdownRenderer markdown={howItWorksMd} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
