import { useEffect } from "react";
import { useDispatch, useSelector } from "@/redux/hooks";
import { fetchMovieData } from "@/redux/movies/actions";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loading } from "@/components/ui/loading";
import { Error } from "@/components/ui/error";
import OscarStatisticsOverview from "@/components/oscar-statistics-overview";
import TopPerformers from "@/components/top-performers";
import MovieSearchFilters from "@/components/movie-search-filters";
import CountryLanguageInsights from "@/components/country-language-insights";
import MoviesList from "@/components/movies-list";

function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovieData());
  }, [dispatch]);

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Movie Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Explore movie statistics, insights, and details
          </p>
        </div>
        {/* Search Filters */}
        <div className="mb-4">
          <MovieSearchFilters />
        </div>
        {/* Oscar Statistics Overview */}
        <div className="mb-4">
          <Card className="p-4">
            <OscarStatisticsOverview />
          </Card>
        </div>
        {/* Metrics and Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Performance Metrics */}
          <Card className="p-4 w-full">
            <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
            <Tabs defaultValue="movies" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="movies">Top Movies</TabsTrigger>
                <TabsTrigger value="actors">Top Actors</TabsTrigger>
              </TabsList>
              <TabsContent value="movies">
                <TopPerformers view="movies" />
              </TabsContent>
              <TabsContent value="actors">
                <TopPerformers view="actors" />
              </TabsContent>
            </Tabs>
          </Card>
          {/* Movie Insights */}
          <Card className="p-4 w-full">
            <h2 className="text-lg font-semibold mb-4">Movie Insights</h2>
            <Tabs defaultValue="countries" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="countries">Countries</TabsTrigger>
                <TabsTrigger value="languages">Languages</TabsTrigger>
              </TabsList>
              <TabsContent value="countries">
                <CountryLanguageInsights view="countries" />
              </TabsContent>
              <TabsContent value="languages">
                <CountryLanguageInsights view="languages" />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        {/* Movies Table */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Movies List</h2>
          <div className="overflow-x-auto">
            <MoviesList />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
