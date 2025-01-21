// src/components/Movies.tsx
import { useEffect, useMemo } from "react";
import { Star, Award } from "lucide-react";
import { useSelector } from "@/redux/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Movies = () => {
  const { filteredMovies, filters } = useSelector((state) => state.movies);

  // Debug logging
  console.log("Current filters:", filters);
  console.log(
    "Filtered movies:",
    filteredMovies.map((m) => ({
      title: m.title,
      year: m.year,
      matches: {
        search:
          !filters.search ||
          m.title.toLowerCase().includes(filters.search.toLowerCase()),
        year: !filters.year || m.year === filters.year,
        genre: !filters.genre || m.genre.includes(filters.genre),
        country: !filters.country || m.country.includes(filters.country),
        language: !filters.language || m.language.includes(filters.language),
      },
    }))
  );

  // Debug log to check filtered results
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Filtered Movies:",
        filteredMovies.map((m) => `${m.title} (${m.year})`)
      );
      console.log("Current filters:", filters);
      console.log("Filtered movies count:", filteredMovies.length);
    }
  }, [filteredMovies, filters]);

  // Add verification logging in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const lordMovies = filteredMovies.filter(
        (m) => m.title.toLowerCase().includes("lord") && m.year === "2003"
      );
      console.log("Lord movies from 2003:", lordMovies);
    }
  }, [filteredMovies]);

  // Memoize the table rows with filters in dependency array
  const moviesList = useMemo(() => {
    return filteredMovies.map((movie) => (
      <TableRow key={`${movie.title}-${movie.year}`}>
        <TableCell className="font-medium">{movie.title}</TableCell>
        <TableCell>{movie.year}</TableCell>
        <TableCell>
          <Badge
            variant="secondary"
            className="flex w-16 items-center justify-center gap-1"
          >
            <Star className="h-3 w-3" />
            {movie.imdb_rating.toFixed(1)}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex flex-wrap gap-1">
            {movie.genre.map((genre) => (
              <Badge key={`${movie.title}-${genre}`} variant="outline">
                {genre}
              </Badge>
            ))}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-wrap gap-1">
            {movie.language.map((lang) => (
              <Badge key={`${movie.title}-${lang}`} variant="secondary">
                {lang}
              </Badge>
            ))}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-wrap gap-1">
            {movie.country.map((country) => (
              <Badge key={`${movie.title}-${country}`} variant="secondary">
                {country}
              </Badge>
            ))}
          </div>
        </TableCell>
        <TableCell>
          {(movie.oscar_nominations > 0 || movie.oscar_winning > 0) && (
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">
                {movie.oscar_winning} / {movie.oscar_nominations}
              </span>
            </div>
          )}
        </TableCell>
      </TableRow>
    ));
  }, [filteredMovies]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Genres</TableHead>
          <TableHead>Languages</TableHead>
          <TableHead>Countries</TableHead>
          <TableHead>Oscar Stats</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{moviesList}</TableBody>
    </Table>
  );
};

export default Movies;
