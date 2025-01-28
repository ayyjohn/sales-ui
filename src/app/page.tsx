"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { type Column, type SortingState } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateTime } from "luxon";
import Image from "next/image";
// todo: mock this as a fake api call using react query
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import data from "public/data.json";
import logo from "public/stackline_logo.svg";
import { useState } from "react";
import { Line, LineChart, XAxis, YAxis } from "recharts";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  // todo: why is this erroring, it works
  trailingZeroDisplay: "stripIfInteger",
});

export default function HomePage() {
  const product = data[0];
  const sales = product?.sales ?? [];
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

  type Sales = {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
  };

  const AlignedCell = ({
    alignment,
    children,
  }: {
    alignment: "start" | "end";
    children: React.ReactNode;
  }) => {
    return (
      <div
        className={cn(
          "text-sm font-light text-gray-400",
          alignment === "start" && "ml-8 text-start",
          alignment === "end" && "mr-8 text-end",
        )}
      >
        {children}
      </div>
    );
  };

  const columns: ColumnDef<Sales>[] = [
    {
      accessorKey: "weekEnding",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title="Week Ending"
            alignment="start"
          />
        );
      },
      cell: ({ row }) => {
        return (
          <AlignedCell alignment="start">
            {DateTime.fromISO(row.getValue("weekEnding")).toFormat("MM-dd-yy")}
          </AlignedCell>
        );
      },
    },
    {
      accessorKey: "retailSales",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Retail Sales" />;
      },
      cell: ({ row }) => {
        return (
          <AlignedCell alignment="end">
            {formatter.format(row.getValue("retailSales"))}
          </AlignedCell>
        );
      },
    },
    {
      accessorKey: "wholesaleSales",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader column={column} title="Wholesale Sales" />
        );
      },
      cell: ({ row }) => {
        return (
          <AlignedCell alignment="end">
            {formatter.format(row.getValue("wholesaleSales"))}
          </AlignedCell>
        );
      },
    },
    {
      accessorKey: "unitsSold",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Units Sold" />;
      },
      cell: ({ row }) => {
        return (
          <AlignedCell alignment="end">{row.getValue("unitsSold")}</AlignedCell>
        );
      },
    },
    {
      accessorKey: "retailerMargin",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader column={column} title="Retailer Margin" />
        );
      },
      cell: ({ row }) => {
        return (
          <AlignedCell alignment="end">
            {formatter.format(row.getValue("retailerMargin"))}
          </AlignedCell>
        );
      },
    },
  ];

  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  }

  interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
    alignment?: "start" | "end";
  }

  function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
    alignment = "end",
  }: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
      return <div className={cn(className)}>{title}</div>;
    }

    const toggleSorting = () => {
      console.log(column.getIsSorted());
      column.toggleSorting(column.getIsSorted() === "asc");
    };

    return (
      <Button
        variant="ghost"
        onClick={toggleSorting}
        className={cn(
          "flex h-full w-full items-center rounded-none px-0 py-8 font-light text-gray-800",
          alignment === "start" && "justify-start",
          alignment === "end" && "justify-end",
        )}
      >
        <span
          className={cn(
            "relative flex items-center justify-end",
            alignment === "start" && "ml-8",
            alignment === "end" && "mr-8",
          )}
        >
          {title.toUpperCase()}
          {column.getIsSorted() === "desc" ? (
            <ChevronDown className="absolute right-[-1.5rem] text-gray-300" />
          ) : column.getIsSorted() === "asc" ? (
            <ChevronUp className="absolute right-[-1.5rem] text-gray-300" />
          ) : (
            <ChevronDown className="absolute right-[-1.5rem] text-gray-300" />
          )}
        </span>
      </Button>
    );
  }

  function DataTable<TData, TValue>({
    columns,
    data,
  }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      state: {
        sorting,
      },
    });
    return (
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-gray-100 p-0"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="p-0">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="border-b border-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-0 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length}>
              <div className="flex w-full items-center justify-center gap-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }

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
        <div className="col-span-3 row-span-12 rounded-sm bg-white shadow-sm">
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
            <p className="px-8 text-center text-sm font-light text-gray-400">
              {product?.subtitle}
            </p>
            <div className="-mx-4 mt-4 border-y border-gray-100 p-4">
              <ul className="flex flex-row flex-wrap gap-2 gap-y-4">
                {product?.tags.map((tag) => (
                  <li
                    key={tag}
                    className="flex cursor-pointer rounded-md border border-gray-100 px-4 py-1 text-sm font-light hover:brightness-[80%]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Card className="col-span-7 row-span-1 rounded-sm border-none bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-light">Retail Sales</CardTitle>
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
                  // todo: make ticks lighter color and slightly bigger
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
        <Card className="col-span-7 row-span-6 m-0 rounded-sm border-none bg-white shadow-lg">
          <CardContent className="p-0">
            <DataTable columns={columns} data={sales} />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
