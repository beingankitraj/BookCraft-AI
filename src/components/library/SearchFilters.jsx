import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function SearchFilters({ 
  searchQuery, 
  setSearchQuery, 
  selectedGenre, 
  setSelectedGenre, 
  genres 
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Search books by title, description, or genre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-amber-200 focus:border-amber-400"
        />
      </div>
      
      <Select value={selectedGenre} onValueChange={setSelectedGenre}>
        <SelectTrigger className="w-full md:w-48 border-amber-200 focus:border-amber-400">
          <SelectValue placeholder="All genres" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}