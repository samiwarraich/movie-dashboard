import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CountryLanguageInsights from "@/components/country-language-insights";
import { useMovieFilters } from "@/hooks/use-movie-filters";
import { createMockFilterData, createMockMovie } from "@/lib/test-utils";

vi.mock("recharts", async () => {
  const original = await vi.importActual("recharts");
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

vi.mock("@/hooks/use-movie-filters");
const mockUseMovieFilters = vi.mocked(useMovieFilters);

describe("CountryLanguageInsights", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    mockUseMovieFilters.mockReturnValue(createMockFilterData());
    const { container } = render(<CountryLanguageInsights view="countries" />);
    expect(container.firstChild).toBeTruthy();
  });

  it("handles empty data", () => {
    mockUseMovieFilters.mockReturnValue(createMockFilterData());
    render(<CountryLanguageInsights view="countries" />);
    const chart = screen.getByTestId("chart-container");
    expect(chart).toBeInTheDocument();
  });

  it("displays country data correctly", () => {
    const mockMovie = createMockMovie({ country: ["USA", "UK"] });
    mockUseMovieFilters.mockReturnValue(
      createMockFilterData({ filteredMovies: [mockMovie] })
    );

    render(<CountryLanguageInsights view="countries" />);
    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("UK")).toBeInTheDocument();
  });

  it("displays language data correctly", () => {
    const mockMovie = createMockMovie({ language: ["English", "French"] });
    mockUseMovieFilters.mockReturnValue(
      createMockFilterData({ filteredMovies: [mockMovie] })
    );

    render(<CountryLanguageInsights view="languages" />);
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("French")).toBeInTheDocument();
  });
});
