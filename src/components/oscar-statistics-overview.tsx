import { useMemo } from "react";
import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useOscarStats } from "@/hooks/use-oscar-stats";

const OscarStatisticsOverview = () => {
  const { stats } = useOscarStats();

  const chartData = useMemo(() => {
    return Object.entries(stats.nominationsByYear)
      .map(([year, nominations]) => ({
        name: year,
        Nominations: nominations,
        Wins: stats.winsByYear[year] || 0,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [stats]);

  const chartConfig = {
    Nominations: {
      label: "Nominations",
      color: "hsl(var(--chart-1))",
    },
    Wins: {
      label: "Wins",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="space-y-4">
      <CardHeader className="px-0">
        <CardTitle>Oscar Statistics Overview</CardTitle>
        <CardDescription>
          Historical data of Oscar nominations and wins over the years
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl font-bold">
                {stats.totalNominations}
              </CardTitle>
              <CardDescription>Total Nominations</CardDescription>
            </CardHeader>
          </div>
          <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl font-bold">
                {stats.totalWins}
              </CardTitle>
              <CardDescription>Total Wins</CardDescription>
            </CardHeader>
          </div>
        </div>

        <div>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ left: -20 }}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  interval={"preserveStartEnd"}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                  content={({ active, payload, label }) => (
                    <ChartTooltipContent
                      active={active}
                      payload={payload}
                      label={label}
                    />
                  )}
                />
                <Bar
                  dataKey="Nominations"
                  fill="hsl(var(--chart-1))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Wins"
                  fill="hsl(var(--chart-2))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </div>
  );
};

export default OscarStatisticsOverview;
