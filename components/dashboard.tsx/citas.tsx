'use client'

import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A donut chart with text'
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart'

const chartData = [
  { type: 'Completado', count: 275, fill: 'var(--color-Completado)' },
  { type: 'Cancelado', count: 275, fill: 'var(--color-Cancelado)' },
]

const chartConfig = {
  Completado: {
    label: 'Completado',
    color: 'hsl(var(--chart-1))',
  },
  Cancelado: {
    label: 'Chrome',
    color: 'hsl(var(--chart-2))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

export interface ChatItem {
  type: string
  count: number
  fill: string
}

interface CitasChartProps {
  chartData?: ChatItem[]
}

const CitasChart: React.FC<CitasChartProps> = ({ chartData = [] }) => {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [])

  return (
    <ChartContainer
      config={chartConfig}
      className=" h-[200px] aspect-auto min-w-[312px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="type"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Citas
                    </tspan>
                  </text>
                )
              }
            }}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}

export default CitasChart
