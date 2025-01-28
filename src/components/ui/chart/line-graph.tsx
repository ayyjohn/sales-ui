"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { DateTime } from "luxon";
import { Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  retailSales: {
    label: "Retail Sales",
    color: "#45a7f6",
  },
  wholesaleSales: {
    label: "Wholesale Sales",
    color: "#9ba6bf",
  },
  retailerMargin: {
    label: "Retailer Margin",
    color: "#9ba6bf",
  },
} satisfies ChartConfig;
type Sales = {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
};
export default function LineGraph({ sales }: { sales: Sales[] }) {
  const chartData = sales?.map((sale) => ({
    weekEnding: sale.weekEnding,
    // luxon helps so that 2017-01-01 is not automatically converted to Dec 2016 because of time zones
    date: DateTime.fromISO(sale.weekEnding).toJSDate(),
    retailSales: sale.retailSales,
    wholesaleSales: sale.wholesaleSales,
    retailerMargin: sale.retailerMargin,
  }));

  return (
    <ChartContainer config={chartConfig} className="p-8">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <YAxis
          dataKey="retailSales"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          hide={true}
          domain={["dataMin - 2000000", "dataMax + 2000000"]}
        />
        <XAxis
          className="text-md font-extralight"
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={4}
          tickFormatter={(value: string) =>
            new Date(value)
              .toLocaleDateString("en-US", {
                month: "short",
              })
              .toUpperCase()
          }
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="retailSales"
          type="monotone"
          stroke={chartConfig.retailSales.color}
          strokeWidth={4}
          dot={false}
        />
        <Line
          dataKey="wholesaleSales"
          type="monotone"
          stroke={chartConfig.wholesaleSales.color}
          strokeWidth={4}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
