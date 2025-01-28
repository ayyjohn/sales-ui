"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DateTime } from "luxon";
import Image from "next/image";
// todo: mock this as a fake api call using react query
import data from "public/data.json";
import logo from "public/stackline_logo.svg";
import { Line, LineChart, XAxis, YAxis } from "recharts";
export default function HomePage() {
  const product = data[0];
  const sales = product?.sales;
  const chartData = sales?.map((sale) => ({
    weekEnding: sale.weekEnding,
    // luxon helps so that 2017-01-01 is not automatically converted to Dec 2016 because of time zones
    date: DateTime.fromISO(sale.weekEnding).toJSDate(),
    retailSales: sale.retailSales,
    wholesaleSales: sale.wholesaleSales,
    retailerMargin: sale.retailerMargin,
  }));
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
  return (
    <>
      <nav className="flex h-20 w-full items-center bg-[#052849]">
        <div className="ml-8 flex flex-col">
          {/* todo: add svgr to avoid this error */}
          <Image src={logo} alt="Stackline Logo" height={30} />
          <div className="mt-2 h-1 w-full bg-white"></div>
        </div>
      </nav>
      <main className="grid h-full w-full grid-cols-10 grid-rows-12 gap-5 bg-[#f6f8fa] px-4 py-16">
        <div className="col-span-3 row-span-12 rounded-sm bg-white shadow-lg">
          <div className="flex flex-col items-center p-4">
            <Image
              src={product?.image ?? ""}
              alt={product?.title ?? ""}
              height={200}
              width={200}
            />
            <h1 className="mb-2 text-center text-2xl font-bold">
              {product?.title}
            </h1>
            <p className="px-8 text-center text-sm text-gray-400">
              {product?.subtitle}
            </p>
            <div className="-mx-4 mt-4 border-y border-gray-100 p-4">
              <ul className="flex flex-row flex-wrap gap-2 gap-y-4">
                {product?.tags.map((tag) => (
                  <li
                    key={tag}
                    className="flex cursor-pointer rounded-md border border-gray-100 px-4 py-1 text-sm hover:brightness-[80%]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Card className="col-span-7 row-span-6 rounded-sm border-none bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Retail Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
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
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
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
          </CardContent>
        </Card>
        <div className="col-span-7 row-span-6 rounded-sm bg-white shadow-lg">
          {/* todo: table */}
        </div>
      </main>
    </>
  );
}
