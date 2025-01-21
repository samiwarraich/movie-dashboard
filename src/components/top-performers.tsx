import { useMemo } from "react";
import { Star, Trophy } from "lucide-react";
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

interface TopPerformersProps {
  view: "ratings" | "oscars";
}

const TopPerformers = ({ view }: TopPerformersProps) => {
  const { filteredMovies } = useMovieFilters();

  const topMovies = useMemo(() => {
    let sorted;
    if (view === "ratings") {
      sorted = [...filteredMovies].sort(
        (a, b) => b.imdb_rating - a.imdb_rating
      );
    } else {
      sorted = [...filteredMovies].sort((a, b) => {
        const oscarDiff = b.oscar_winning - a.oscar_winning;
        // If oscar wins are equal, sort by nominations
        if (oscarDiff === 0) {
          return b.oscar_nominations - a.oscar_nominations;
        }
        return oscarDiff;
      });
    }
    return sorted.slice(0, 10);
  }, [filteredMovies, view]);

  const tableRows = useMemo(() => {
    return topMovies.map((movie, index) => (
      <TableRow key={`${movie.title}-${index}`}>
        <TableCell className="font-medium">#{index + 1}</TableCell>
        <TableCell>{movie.title}</TableCell>
        <TableCell>{movie.year}</TableCell>
        <TableCell>
          {view === "ratings" ? (
            <Badge
              variant="secondary"
              className="flex w-16 items-center justify-center gap-1"
            >
              <Star className="h-3 w-3" />
              {movie.imdb_rating.toFixed(1)}
            </Badge>
          ) : (
            <Badge className="flex w-16 items-center justify-center gap-1">
              <Trophy className="h-3 w-3" />
              {movie.oscar_winning}
            </Badge>
          )}
        </TableCell>
      </TableRow>
    ));
  }, [topMovies, view]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>{view === "ratings" ? "Rating" : "Oscar Wins"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{tableRows}</TableBody>
    </Table>
  );
};

export default TopPerformers;
