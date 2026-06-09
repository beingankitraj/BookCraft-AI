import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

export default function BookGenerationForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    title: "",
    context: "",
    genre: "",
    targetLength: "medium",
    tone: "engaging"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-xl border-amber-200/30 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          Book Generation Studio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Book Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter your book title..."
              className="border-amber-200 focus:border-amber-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="context" className="text-sm font-medium">
              Context & Ideas
              <span className="text-slate-500 font-normal ml-2">(The more detail, the better!)</span>
            </Label>
            <Textarea
              id="context"
              value={formData.context}
              onChange={(e) => handleInputChange("context", e.target.value)}
              placeholder="Describe your book idea, plot, characters, themes, setting, or any other context you'd like to include. Be as detailed as possible - the AI will use this to create your entire book..."
              className="h-32 border-amber-200 focus:border-amber-400 resize-none"
              required
            />
            <p className="text-xs text-slate-500">
              {formData.context.length}/2000 characters
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select value={formData.genre} onValueChange={(value) => handleInputChange("genre", value)}>
                <SelectTrigger className="border-amber-200 focus:border-amber-400">
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fiction">Fiction</SelectItem>
                  <SelectItem value="mystery">Mystery/Thriller</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                  <SelectItem value="sci-fi">Science Fiction</SelectItem>
                  <SelectItem value="horror">Horror</SelectItem>
                  <SelectItem value="historical">Historical Fiction</SelectItem>
                  <SelectItem value="biography">Biography/Memoir</SelectItem>
                  <SelectItem value="self-help">Self-Help</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="guide">How-To/Guide</SelectItem>
                  <SelectItem value="children">Children's Book</SelectItem>
                  <SelectItem value="poetry">Poetry</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Writing Tone</Label>
              <Select value={formData.tone} onValueChange={(value) => handleInputChange("tone", value)}>
                <SelectTrigger className="border-amber-200 focus:border-amber-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engaging">Engaging & Accessible</SelectItem>
                  <SelectItem value="formal">Formal & Professional</SelectItem>
                  <SelectItem value="casual">Casual & Conversational</SelectItem>
                  <SelectItem value="dramatic">Dramatic & Intense</SelectItem>
                  <SelectItem value="humorous">Light & Humorous</SelectItem>
                  <SelectItem value="poetic">Poetic & Lyrical</SelectItem>
                  <SelectItem value="academic">Academic & Scholarly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetLength">Target Length</Label>
            <Select value={formData.targetLength} onValueChange={(value) => handleInputChange("targetLength", value)}>
              <SelectTrigger className="border-amber-200 focus:border-amber-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short (3-5 chapters, ~10k words)</SelectItem>
                <SelectItem value="medium">Medium (6-10 chapters, ~20k words)</SelectItem>
                <SelectItem value="long">Long (10-15 chapters, ~40k words)</SelectItem>
                <SelectItem value="novel">Full Novel (15+ chapters, 60k+ words)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-3 text-lg"
            disabled={!formData.title || !formData.context || !formData.genre}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate My Book
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}