import { AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "@/redux/hooks";
import { fetchMovieData } from "@/redux/movies/actions";

export const Error = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.movies);
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full p-6">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Error Loading Data</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchMovieData())}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};
