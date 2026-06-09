import React, { useState } from "react";
import { Book } from "@/entities/Book";
import { InvokeLLM } from "@/integrations/Core";
import { Card } from "@/components/ui/card";
import { PenTool, Sparkles, BookOpen, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import BookGenerationForm from "../components/create/BookGenerationForm";
import GenerationProgress from "../components/create/GenerationProgress";

export default function CreatePage() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [error, setError] = useState(null);

  const handleGenerateBook = async (formData) => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setCurrentStep("Preparing your book concept...");
    setError(null);

    try {
      // Step 1: Generate book outline
      setCurrentStep("Creating book outline...");
      setGenerationProgress(20);
      
      const outlinePrompt = `Create a detailed book outline based on this context:
      
      Title: ${formData.title}
      Genre: ${formData.genre}
      Context: ${formData.context}
      Target Length: ${formData.targetLength}
      Tone: ${formData.tone}
      
      Create a comprehensive outline with chapter titles and brief descriptions. Make it engaging and well-structured.`;

      const outlineResponse = await InvokeLLM({
        prompt: outlinePrompt,
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            chapters: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  chapter_number: { type: "number" },
                  title: { type: "string" },
                  description: { type: "string" }
                }
              }
            }
          }
        }
      });

      setCurrentStep("Writing chapters...");
      setGenerationProgress(40);

      // Step 2: Generate full chapters
      const chapters = [];
      for (let i = 0; i < outlineResponse.chapters.length; i++) {
        const chapter = outlineResponse.chapters[i];
        setCurrentStep(`Writing Chapter ${i + 1}: ${chapter.title}...`);
        setGenerationProgress(40 + (40 / outlineResponse.chapters.length) * i);

        const chapterPrompt = `Write a full chapter for this book:
        
        Book Title: ${outlineResponse.title}
        Book Description: ${outlineResponse.description}
        Chapter Number: ${chapter.chapter_number}
        Chapter Title: ${chapter.title}
        Chapter Description: ${chapter.description}
        Genre: ${formData.genre}
        Tone: ${formData.tone}
        
        Write a complete, engaging chapter that fits the book's narrative. Make it detailed and immersive, approximately 1000-2000 words.`;

        const chapterContent = await InvokeLLM({
          prompt: chapterPrompt
        });

        chapters.push({
          chapter_number: chapter.chapter_number,
          title: chapter.title,
          content: chapterContent
        });
      }

      setCurrentStep("Finalizing your book...");
      setGenerationProgress(90);

      // Step 3: Combine and save
      const fullContent = chapters.map(ch => `# Chapter ${ch.chapter_number}: ${ch.title}\n\n${ch.content}`).join('\n\n\n');
      const wordCount = fullContent.split(' ').length;

      const bookData = {
        title: outlineResponse.title,
        description: outlineResponse.description,
        genre: formData.genre,
        context_used: formData.context,
        content: fullContent,
        chapters: chapters,
        word_count: wordCount,
        status: "completed"
      };

      const savedBook = await Book.create(bookData);
      
      setGenerationProgress(100);
      setCurrentStep("Complete!");
      
      setTimeout(() => {
        navigate(createPageUrl(`Reader?bookId=${savedBook.id}`));
      }, 1000);

    } catch (error) {
      console.error("Error generating book:", error);
      setError("Failed to generate book. Please try again with different context.");
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <GenerationProgress 
          progress={generationProgress}
          currentStep={currentStep}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Book Generation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Create Your Next
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent"> Masterpiece</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Transform your ideas into complete, engaging books with the power of artificial intelligence
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <BookGenerationForm onGenerate={handleGenerateBook} />

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6 border-amber-200/30">
            <BookOpen className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Full-Length Books</h3>
            <p className="text-sm text-slate-600">Generate complete novels, guides, or any book format</p>
          </Card>
          
          <Card className="text-center p-6 border-amber-200/30">
            <PenTool className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Your Style</h3>
            <p className="text-sm text-slate-600">Customize tone, genre, and writing style to match your vision</p>
          </Card>
          
          <Card className="text-center p-6 border-amber-200/30">
            <Clock className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Minutes Not Months</h3>
            <p className="text-sm text-slate-600">Get your complete book in minutes, not months of writing</p>
          </Card>
        </div>
      </div>
    </div>
  );
}