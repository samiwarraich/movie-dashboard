import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import MoviesList from "@/components/movies-list";
import { useMovieFilters } from "@/hooks/use-movie-filters";
import { createMockFilterData, createMockMovie } from "@/lib/test-utils";

vi.mock("@/hooks/use-movie-filters");
const mockUseMovieFilters = vi.mocked(useMovieFilters);

describe("MoviesList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders table headers correctly", () => {
    mockUseMovieFilters.mockReturnValue(createMockFilterData());
    render(<MoviesList />);

    const expectedHeaders = [
      "Title",
      "Year",
      "Rating",
      "Genres",
      "Languages",
      "Countries",
      "Oscar Stats",
    ];

    expectedHeaders.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it("renders movie data correctly", () => {
    const mockMovie = createMockMovie({
      title: "Test Movie",
      year: "2023",
      genre: ["Action", "Drama"],
      language: ["English", "French"],
      country: ["USA", "UK"],
      imdb_rating: 8.5,
      oscar_nominations: 3,
      oscar_winning: 1,
    });

    mockUseMovieFilters.mockReturnValue(
      createMockFilterData({
        filteredMovies: [mockMovie],
      })
    );

    render(<MoviesList />);
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("8.5")).toBeInTheDocument();
    ["Action", "Drama", "English", "French", "USA", "UK"].forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("renders multiple movies correctly", () => {
    const mockMovies = [
      createMockMovie({ title: "Movie 1", year: "2023" }),
      createMockMovie({ title: "Movie 2", year: "2022" }),
    ];

    mockUseMovieFilters.mockReturnValue(
      createMockFilterData({
        filteredMovies: mockMovies,
      })
    );

    render(<MoviesList />);
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

  it("handles movies with no oscar nominations correctly", () => {
    const mockMovie = createMockMovie({
      oscar_nominations: 0,
      oscar_winning: 0,
    });

    mockUseMovieFilters.mockReturnValue(
      createMockFilterData({
        filteredMovies: [mockMovie],
      })
    );

    render(<MoviesList />);
    expect(screen.queryByText("0 / 0")).not.toBeInTheDocument();
  });

  it("renders empty table when no movies are present", () => {
    mockUseMovieFilters.mockReturnValue(createMockFilterData());
    render(<MoviesList />);

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.queryByText("Test Movie")).not.toBeInTheDocument();
  });
});
