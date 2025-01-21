// src/components/CountryLanguageInsights.tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Payload,
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { useMovieFilters } from "@/hooks/useMovieFilters";
import { ChartContainer } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";

interface ChartData {
  name: string;
  value: number;
}

interface CountryLanguageInsightsProps {
  view: "countries" | "languages";
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const CountryLanguageInsights = ({ view }: CountryLanguageInsightsProps) => {
  const { filteredMovies } = useMovieFilters();

  // Process data based on view
  const data = filteredMovies.reduce((acc, movie) => {
    const items = view === "countries" ? movie.country : movie.language;
    items.forEach((item) => {
      acc[item] = (acc[item] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Convert to chart format and get top 5
  const chartData: ChartData[] = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  // Chart configuration
  const chartConfig = {
    [view]: {
      label: view === "countries" ? "Countries" : "Languages",
      theme: {
        light: "hsl(var(--chart-1))",
        dark: "hsl(var(--chart-1))",
      },
    },
  };

  return (
    <div className="w-full">
      <div className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => (
                  <PieChartTooltip active={active} payload={payload} />
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {item.value} movies
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryLanguageInsights;

interface PieChartTooltipProps {
  active?: boolean;
  payload?: Payload<ValueType, NameType>[] | undefined;
}

export function PieChartTooltip({ active, payload }: PieChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0];

  return (
    <Card className="bg-background border shadow-md p-3">
      <div className="flex items-center gap-2">
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: data.payload.fill }}
        />
        <span className="font-medium">
          {data.name} : {data.value}
        </span>
      </div>
    </Card>
  );
}
