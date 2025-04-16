
import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SocialLinksDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-pixel bg-black/50 text-white border-white/20 hover:bg-black/70">
          Follow Me
        </Button>
      </DialogTrigger>
      <DialogContent className="font-pixel bg-black/90 border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-xl mb-4">Created by Saurabh Saxena</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <a 
            href="https://www.instagram.com/mesaurabhsaxena/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-gray-300 transition-colors"
          >
            <ExternalLink size={16} />
            Follow on Instagram
          </a>
          <a 
            href="https://www.youtube.com/c/delhitechnologyclub" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-gray-300 transition-colors"
          >
            <ExternalLink size={16} />
            Follow on Youtube
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialLinksDialog;
