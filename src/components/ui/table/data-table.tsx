"use client";

import { Button } from "@/components/ui/button";
import * as Table from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  type Column,
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DateTime } from "luxon";
import { useState } from "react";

type Sales = {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
};

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
  alignment?: "start" | "end";
} & React.HTMLAttributes<HTMLDivElement>;

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  trailingZeroDisplay: "stripIfInteger",
});

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
    column.toggleSorting(column.getIsSorted() === "asc");
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleSorting}
      className={cn(
        "flex h-full w-full items-center text-wrap rounded-none px-0 py-8 font-light text-gray-800",
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

export const columns: ColumnDef<Sales>[] = [
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
      return <DataTableColumnHeader column={column} title="Wholesale Sales" />;
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
      return <DataTableColumnHeader column={column} title="Retailer Margin" />;
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

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });
  return (
    <Table.Table>
      <Table.TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.TableRow
            key={headerGroup.id}
            className="border-b border-gray-100 p-0"
          >
            {headerGroup.headers.map((header) => {
              return (
                <Table.TableHead key={header.id} className="p-0">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </Table.TableHead>
              );
            })}
          </Table.TableRow>
        ))}
      </Table.TableHeader>
      <Table.TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <Table.TableRow key={row.id} className="border-b border-gray-100">
              {row.getVisibleCells().map((cell) => (
                <Table.TableCell key={cell.id} className="px-0 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.TableCell>
              ))}
            </Table.TableRow>
          ))
        ) : (
          <Table.TableRow>
            <Table.TableCell
              colSpan={columns.length}
              className="h-24 text-center"
            >
              Loading...
            </Table.TableCell>
          </Table.TableRow>
        )}
      </Table.TableBody>
      <Table.TableFooter className="bg-white">
        <Table.TableRow>
          <Table.TableCell colSpan={columns.length}>
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
          </Table.TableCell>
        </Table.TableRow>
      </Table.TableFooter>
    </Table.Table>
  );
}
