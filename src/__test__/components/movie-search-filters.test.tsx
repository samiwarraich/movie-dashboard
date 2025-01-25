import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieSearchFilters from "@/components/movie-search-filters";
import { useMovieFilters } from "@/hooks/use-movie-filters";
import {
  createMockFilterData,
  setupRadixMocks,
  setupTestPortal,
} from "@/lib/test-utils";

vi.mock("@/hooks/use-movie-filters");
const mockUseMovieFilters = vi.mocked(useMovieFilters);

describe("MovieSearchFilters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupRadixMocks();
    mockUseMovieFilters.mockReturnValue(createMockFilterData());
  });

  it("renders all filter components", () => {
    render(<MovieSearchFilters />);

    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
    expect(screen.getByText(/Year/)).toBeInTheDocument();
    expect(screen.getByText(/Genre/)).toBeInTheDocument();
    expect(screen.getByText(/Country/)).toBeInTheDocument();
    expect(screen.getByText(/Language/)).toBeInTheDocument();
  });

  it("handles search input changes", async () => {
    const mockHandleFilterChange = vi.fn();
    mockUseMovieFilters.mockReturnValue(
      createMockFilterData({
        handleFilterChange: mockHandleFilterChange,
      })
    );

    const user = userEvent.setup();
    render(<MovieSearchFilters />);

    const searchInput = screen.getByPlaceholderText("Search movies...");
    await user.type(searchInput, "t");

    expect(mockHandleFilterChange).toHaveBeenCalledWith("search", "t");
  });

  it("shows clear search button when search has value", () => {
    mockUseMovieFilters.mockReturnValue(
      createMockFilterData({
        filters: { ...createMockFilterData().filters, search: "test" },
      })
    );

    render(<MovieSearchFilters />);
    const clearButton = screen.getByRole("button");
    expect(clearButton).toBeInTheDocument();
  });

  it("handles clear search button click", async () => {
    const mockHandleFilterChange = vi.fn();
    mockUseMovieFilters.mockReturnValue(
      createMockFilterData({
        filters: { ...createMockFilterData().filters, search: "test" },
        handleFilterChange: mockHandleFilterChange,
      })
    );

    const user = userEvent.setup();
    render(<MovieSearchFilters />);

    const clearButton = screen.getByRole("button");
    await user.click(clearButton);

    expect(mockHandleFilterChange).toHaveBeenCalledWith("search", "");
  });
  it("shows clear filters button when filters are active", () => {
    mockUseMovieFilters.mockReturnValue(
      createMockFilterData({
        hasActiveFilters: true,
      })
    );

    render(<MovieSearchFilters />);
    expect(screen.getByText("Clear filters")).toBeInTheDocument();
  });

  it("handles clear filters button click", async () => {
    const mockHandleClearFilters = vi.fn();
    mockUseMovieFilters.mockReturnValue(
      createMockFilterData({
        hasActiveFilters: true,
        handleClearFilters: mockHandleClearFilters,
      })
    );

    const user = userEvent.setup();
    render(<MovieSearchFilters />);

    const clearFiltersButton = screen.getByText("Clear filters");
    await user.click(clearFiltersButton);

    expect(mockHandleClearFilters).toHaveBeenCalled();
  });

  it("handles filter select changes", async () => {
    const mockHandleFilterChange = vi.fn();
    mockUseMovieFilters.mockReturnValue(
      createMockFilterData({
        handleFilterChange: mockHandleFilterChange,
      })
    );

    const user = userEvent.setup();
    setupTestPortal();

    render(<MovieSearchFilters />);

    const comboboxes = screen.getAllByRole("combobox");
    const yearSelect = comboboxes.find((combobox) =>
      combobox.textContent?.includes("All Years")
    );
    expect(yearSelect).toBeTruthy();
    await user.click(yearSelect!);

    const yearOption = screen.getByText("2023");
    await user.click(yearOption);

    expect(mockHandleFilterChange).toHaveBeenCalledWith("year", "2023");
  });
});
