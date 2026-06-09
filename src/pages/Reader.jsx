
import React, { useState, useEffect, useCallback } from "react";
import { Book } from "@/entities/Book";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ReactMarkdown from 'react-markdown';

import ReaderHeader from "../components/reader/ReaderHeader";
import ChapterNavigation from "../components/reader/ChapterNavigation";
import ReadingProgress from "../components/reader/ReadingProgress";

export default function ReaderPage() {
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  const loadBook = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');
    
    if (!bookId) {
      navigate(createPageUrl("Library"));
      return;
    }

    try {
      const books = await Book.list();
      const foundBook = books.find(b => b.id === bookId);
      if (foundBook) {
        setBook(foundBook);
      } else {
        navigate(createPageUrl("Library"));
      }
    } catch (error) {
      console.error("Error loading book:", error);
      navigate(createPageUrl("Library"));
    }
    setIsLoading(false);
  }, [navigate]); // navigate is a dependency as it's used inside loadBook

  useEffect(() => {
    loadBook();
  }, [loadBook]); // loadBook is now a stable function reference due to useCallback

  useEffect(() => {
    if (book?.chapters) {
      const progress = ((currentChapterIndex + 1) / book.chapters.length) * 100;
      setReadingProgress(progress);
    }
  }, [currentChapterIndex, book]);

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const handleNextChapter = () => {
    if (book?.chapters && currentChapterIndex < book.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const handleDownload = () => {
    if (!book) return;

    // The original code was using book.content directly for the main content
    // while the component structure implies chapters.
    // To ensure consistency, if chapters exist, it should download all chapters.
    // Otherwise, fallback to the book.content.

    let content = `# ${book.title}\n\n`;

    if (book.description) {
      content += `${book.description}\n\n`;
    }

    if (book.chapters && book.chapters.length > 0) {
      book.chapters.forEach(chapter => {
        content += `---\n\n`;
        content += `## Chapter ${chapter.chapter_number}: ${chapter.title}\n\n`;
        content += `${chapter.content}\n\n`;
      });
    } else if (book.content) {
      // Fallback for books without explicit chapters (e.g., legacy or short books)
      content += `---\n\n`;
      content += `${book.content}\n\n`;
    }

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${book.title}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-pulse" />
          <p className="text-slate-600">Loading your book...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Book not found</p>
          <Button onClick={() => navigate(createPageUrl("Library"))}>
            Return to Library
          </Button>
        </div>
      </div>
    );
  }

  const currentChapter = book.chapters?.[currentChapterIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      <ReaderHeader 
        book={book}
        onBack={() => navigate(createPageUrl("Library"))}
        onDownload={handleDownload}
      />
      
      <ReadingProgress progress={readingProgress} />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {book.chapters && book.chapters.length > 0 ? (
          <>
            <ChapterNavigation 
              chapters={book.chapters}
              currentChapterIndex={currentChapterIndex}
              onChapterSelect={setCurrentChapterIndex}
            />

            <Card className="mb-8 shadow-lg border-amber-200/30">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                    Chapter {currentChapter.chapter_number}: {currentChapter.title}
                  </h1>
                  <div className="text-slate-700 leading-relaxed">
                    <ReactMarkdown>{currentChapter.content}</ReactMarkdown>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePreviousChapter}
                disabled={currentChapterIndex === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Chapter
              </Button>

              <div className="text-sm text-slate-500">
                Chapter {currentChapterIndex + 1} of {book.chapters.length}
              </div>

              <Button
                onClick={handleNextChapter}
                disabled={currentChapterIndex === book.chapters.length - 1}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600"
              >
                Next Chapter
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <Card className="shadow-lg border-amber-200/30">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                  {book.title}
                </h1>
                <div className="text-slate-700 leading-relaxed">
                  <ReactMarkdown>{book.content}</ReactMarkdown>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
