import { useMemo } from "react";
import { Star, Award } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useMovieFilters } from "@/hooks/use-movie-filters";

const Movies = () => {
  const { filteredMovies } = useMovieFilters();

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
