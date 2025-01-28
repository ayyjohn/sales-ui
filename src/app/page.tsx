"use client";

import { NavBar } from "@/app/_components/nav-bar";
import * as Card from "@/components/ui/card";

// todo: mock this as a fake api call using react query
import LineGraph from "@/components/ui/chart/line-graph";
import { ProductDetail } from "@/components/ui/product/product-detail";
import { Separator } from "@/components/ui/separator";
import DataTable, { columns } from "@/components/ui/table/data-table";
import data from "public/data.json";

export default function HomePage() {
  // todo: mock this as a fake api call using react query
  const product = data[0];
  const sales = product?.sales ?? [];

  // todo: add skeleton loaders
  return (
    <>
      <NavBar />
      <main className="grid grid-cols-1 gap-5 bg-[#f6f8fa] px-4 py-16 lg:grid-cols-[20rem_1fr] lg:grid-rows-[1fr_auto]">
        <Card.Card className="col-span-1 row-span-2 rounded-sm border-none bg-white shadow-sm">
          <Card.CardContent className="flex flex-col items-center p-4">
            <ProductDetail product={product} />
          </Card.CardContent>
        </Card.Card>
        <Card.Card className="col-span-1 row-span-1 rounded-sm border-none bg-white shadow-sm">
          <Card.CardHeader>
            <Card.CardTitle className="text-lg font-light">
              Retail Sales
            </Card.CardTitle>
          </Card.CardHeader>
          <Card.CardContent className="relative p-0">
            <LineGraph sales={sales} />
            <Separator className="absolute bottom-20 h-[1px] w-full bg-gray-100" />
          </Card.CardContent>
        </Card.Card>
        <Card.Card className="col-span-1 row-span-1 rounded-sm border-none bg-white shadow-sm">
          <Card.CardContent className="p-0">
            <DataTable columns={columns} data={sales} />
          </Card.CardContent>
        </Card.Card>
      </main>
    </>
  );
}
