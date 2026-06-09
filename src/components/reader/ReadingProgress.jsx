import React from "react";
import { Progress } from "@/components/ui/progress";

export default function ReadingProgress({ progress }) {
  return (
    <div className="w-full bg-white/80 backdrop-blur-sm">
      <Progress value={progress} className="h-1 rounded-none" />
    </div>
  );
}