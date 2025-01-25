import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import OscarStatisticsOverview from "@/components/oscar-statistics-overview";
import { useOscarStats } from "@/hooks/use-oscar-stats";

vi.mock("recharts", async () => {
  const original = await vi.importActual("recharts");
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

vi.mock("@/hooks/use-oscar-stats");
const mockUseOscarStats = vi.mocked(useOscarStats);

interface OscarStats {
  nominationsByYear: Record<string, number>;
  winsByYear: Record<string, number>;
  totalNominations: number;
  totalWins: number;
}

function createMockOscarStats(overrides: Partial<OscarStats> = {}): {
  stats: OscarStats;
} {
  return {
    stats: {
      nominationsByYear: {
        "2023": 5,
        "2022": 3,
      },
      winsByYear: {
        "2023": 2,
        "2022": 1,
      },
      totalNominations: 8,
      totalWins: 3,
      ...overrides,
    },
  };
}

describe("OscarStatisticsOverview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseOscarStats.mockReturnValue(createMockOscarStats());
  });

  it("renders header and description correctly", () => {
    render(<OscarStatisticsOverview />);

    expect(screen.getByText("Oscar Statistics Overview")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Historical data of Oscar nominations and wins over the years"
      )
    ).toBeInTheDocument();
  });

  it("displays total nominations and wins correctly", () => {
    render(<OscarStatisticsOverview />);

    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Total Nominations")).toBeInTheDocument();
    expect(screen.getByText("Total Wins")).toBeInTheDocument();
  });

  it("handles empty stats correctly", () => {
    mockUseOscarStats.mockReturnValue(
      createMockOscarStats({
        nominationsByYear: {},
        winsByYear: {},
        totalNominations: 0,
        totalWins: 0,
      })
    );

    render(<OscarStatisticsOverview />);
    const zeros = screen.getAllByText("0");
    expect(zeros).toHaveLength(2);
  });
});
