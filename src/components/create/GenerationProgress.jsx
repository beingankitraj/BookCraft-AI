import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, BookOpen } from "lucide-react";

export default function GenerationProgress({ progress, currentStep }) {
  return (
    <Card className="max-w-md mx-auto shadow-xl border-amber-200/30">
      <CardContent className="p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            {progress === 100 ? (
              <BookOpen className="w-8 h-8 text-white" />
            ) : (
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            {progress === 100 ? "Book Complete!" : "Creating Your Book"}
          </h2>
          <p className="text-slate-600 text-sm">{currentStep}</p>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-slate-500">{progress}% complete</p>
        </div>

        {progress === 100 && (
          <p className="text-sm text-amber-600 mt-4 font-medium">
            Redirecting to your new book...
          </p>
        )}
      </CardContent>
    </Card>
  );
}