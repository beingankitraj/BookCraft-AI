import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, FileText, Eye } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function BookGrid({ books }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 border-amber-200/30 hover:border-amber-300">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between mb-2">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                {book.genre}
              </Badge>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {format(new Date(book.created_date), "MMM d, yyyy")}
              </div>
            </div>
            <CardTitle className="text-lg leading-tight group-hover:text-amber-700 transition-colors">
              {book.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-sm mb-4 line-clamp-3">
              {book.description}
            </p>
            
            <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                {book.word_count?.toLocaleString() || "Unknown"} words
              </div>
              {book.chapters && (
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {book.chapters.length} chapters
                </div>
              )}
            </div>

            <Link to={createPageUrl(`Reader?bookId=${book.id}`)}>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white group-hover:shadow-md transition-all duration-200">
                <Eye className="w-4 h-4 mr-2" />
                Read Book
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}