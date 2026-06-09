
import React, { useState, useEffect, useCallback } from "react";
import { Book } from "@/entities/Book";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";

import BookGrid from "../components/library/BookGrid";
import SearchFilters from "../components/library/SearchFilters";

export default function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const loadBooks = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedBooks = await Book.list("-created_date");
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Error loading books:", error);
    }
    setIsLoading(false);
  }, []); // Empty dependency array as loadBooks doesn't depend on any props or state from its closure

  const filterBooks = useCallback(() => {
    let filtered = books;

    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre !== "all") {
      filtered = filtered.filter(book => book.genre === selectedGenre);
    }

    setFilteredBooks(filtered);
  }, [books, searchQuery, selectedGenre]); // Dependencies for filterBooks

  useEffect(() => {
    loadBooks();
  }, [loadBooks]); // Now depends on the memoized loadBooks function

  useEffect(() => {
    filterBooks();
  }, [filterBooks]); // Now depends on the memoized filterBooks function

  const getUniqueGenres = () => {
    const genres = books.map(book => book.genre).filter(Boolean);
    return [...new Set(genres)];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-12 w-64 mb-4" />
            <Skeleton className="h-6 w-96" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-20" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Your Library</h1>
          <p className="text-slate-600 mb-6">
            {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
          </p>

          <SearchFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            genres={getUniqueGenres()}
          />
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              {books.length === 0 ? "No books yet" : "No books match your search"}
            </h3>
            <p className="text-slate-500 mb-6">
              {books.length === 0 
                ? "Start creating your first AI-generated book" 
                : "Try adjusting your search or filters"}
            </p>
            {books.length === 0 && (
              <Link to={createPageUrl("Create")}>
                <Button className="bg-amber-500 hover:bg-amber-600">
                  Create Your First Book
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <BookGrid books={filteredBooks} />
        )}
      </div>
    </div>
  );
}
