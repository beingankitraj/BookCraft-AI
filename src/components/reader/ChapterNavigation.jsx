import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ChapterNavigation({ chapters, currentChapterIndex, onChapterSelect }) {
  return (
    <div className="mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full md:w-auto border-amber-200">
            Chapter {chapters[currentChapterIndex].chapter_number}: {chapters[currentChapterIndex].title}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          {chapters.map((chapter, index) => (
            <DropdownMenuItem 
              key={index}
              onClick={() => onChapterSelect(index)}
              className={index === currentChapterIndex ? "bg-amber-50" : ""}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">
                  Chapter {chapter.chapter_number}: {chapter.title}
                </span>
                {index === currentChapterIndex && (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 text-xs">
                    Current
                  </Badge>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}