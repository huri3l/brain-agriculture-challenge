import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCallback, useMemo } from "react"
import { Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"

interface DashboardChartProps {
  title: string
  description: string
  data: Record<string, number>
}

export function DashboardChart({ title, description, data }: DashboardChartProps) {
  const size = useMemo(() => Object.entries(data).length, [data])

  const generateColor = useCallback((index: number, total: number) => {
    const hue = (index / total) * 360
    return `hsl(${hue}, 70%, 50%)`
  }, []);

  const chartData = useMemo(() => {
    return Object.entries(data).map(([key, data], index) => ({
      key,
      data,
      fill: size > 5 ? generateColor(index + 1, size) : `hsl(var(--chart-${index + 1}))`,
    }));
  }, [data])

  const chartConfig = useMemo(() => {
    return Object.fromEntries(
      Object.keys(data).map((key, index) => [
        key,
        {
          label: key,
          color: size > 5 ? generateColor(index + 1, size) : `hsl(var(--chart-${index + 1}))`
        },
      ])
    );
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="data" nameKey="key" />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend
              content={<ChartLegendContent nameKey="key" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
