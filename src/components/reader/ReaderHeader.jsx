import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download } from "lucide-react";

export default function ReaderHeader({ book, onBack, onDownload }) {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-amber-200/30 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="font-bold text-slate-800 text-lg">{book.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                  {book.genre}
                </Badge>
                <span className="text-xs text-slate-500">
                  {book.word_count?.toLocaleString()} words
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}