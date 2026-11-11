import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";

type PopUpLayoutProps = {
  title: string;
  content: React.ReactNode;
  children: React.ReactNode;
  classNameContent?: string;
  classNameChildren?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function PopUpLayout({
  title,
  content,
  children,
  classNameContent,
  classNameChildren,
  open,
  onOpenChange,
}: PopUpLayoutProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <div className={cn("cursor-pointer", classNameContent)}>{content}</div>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "p-0 bg-popover dark:bg-card-dark max-h-[90vh] overflow-y-auto",
          classNameChildren,
        )}
      >
        <DialogHeader className="flex flex-row-reverse items-center justify-between p-4 border-b border-sidebar/30 dark:border-white/20 text-sidebar dark:text-white">
          <DialogClose asChild />
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
