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
import { Movie } from "@/types";

interface ActorStats {
  name: string;
  movies: number;
  wins: number;
}

interface TopPerformersProps {
  view: "movies" | "actors";
}

const TopPerformers = ({ view }: TopPerformersProps) => {
  const { filteredMovies } = useMovieFilters();

  const topPerformers = useMemo(() => {
    if (view === "movies") {
      return [...filteredMovies]
        .sort((a, b) => b.imdb_rating - a.imdb_rating)
        .slice(0, 10);
    }

    const actorStats = new Map<string, { movies: number; wins: number }>();

    filteredMovies.forEach((movie) => {
      movie.cast.forEach((actor) => {
        const current = actorStats.get(actor) || { movies: 0, wins: 0 };
        actorStats.set(actor, {
          movies: current.movies + 1,
          wins: current.wins + movie.oscar_winning,
        });
      });
    });

    return Array.from(actorStats.entries())
      .map(([name, stats]): ActorStats => ({ name, ...stats }))
      .sort((a, b) => b.wins - a.wins || b.movies - a.movies)
      .slice(0, 10);
  }, [filteredMovies, view]);

  const tableRows = useMemo(() => {
    return topPerformers.map((item, index) => (
      <TableRow
        key={
          view === "movies" ? (item as Movie).title : (item as ActorStats).name
        }
        className="hover:bg-muted/50"
      >
        <TableCell className="w-16 font-medium">#{index + 1}</TableCell>
        <TableCell className="font-medium">
          {view === "movies"
            ? (item as Movie).title
            : (item as ActorStats).name}
        </TableCell>
        <TableCell className="text-muted-foreground text-center">
          {view === "movies"
            ? (item as Movie).year
            : (item as ActorStats).movies}
        </TableCell>
        <TableCell>
          {view === "movies" ? (
            <Badge
              variant="secondary"
              className="flex w-20 items-center justify-center gap-1"
            >
              <Star className="h-3.5 w-3.5" />
              {(item as Movie).imdb_rating.toFixed(1)}
            </Badge>
          ) : (
            <Badge
              variant="default"
              className="flex w-20 items-center justify-center gap-1"
            >
              <Trophy className="h-3.5 w-3.5" />
              {(item as ActorStats).wins}
            </Badge>
          )}
        </TableCell>
      </TableRow>
    ));
  }, [topPerformers, view]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>{view === "movies" ? "Title" : "Actor"}</TableHead>
          <TableHead className="text-center">
            {view === "movies" ? "Year" : "Movies"}
          </TableHead>
          <TableHead>{view === "movies" ? "Rating" : "Oscar Wins"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{tableRows}</TableBody>
    </Table>
  );
};

export default TopPerformers;
