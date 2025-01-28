"use client";

import * as Card from "@/components/ui/card";

import LineGraph from "@/components/ui/chart/line-graph";
import { ProductDetail } from "@/components/ui/product/product-detail";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import DataTable, { columns } from "@/components/ui/table/data-table";
import { getProductData } from "@/server/fakeApi";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const productId = "B007TIE0GQ";
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductData(productId),
  });
  const sales = product?.sales ?? [];

  return (
    <>
      <main className="grid grid-cols-1 gap-5 bg-[#f6f8fa] px-4 py-16 lg:grid-cols-[20rem_1fr] lg:grid-rows-[1fr_auto]">
        <Skeleton loading={isLoading}>
          <Card.Card className="col-span-1 row-span-2 rounded-sm border-none bg-white shadow-sm">
            <Card.CardContent className="flex flex-col items-center p-4">
              <ProductDetail product={product} />
            </Card.CardContent>
          </Card.Card>
        </Skeleton>
        <Skeleton loading={isLoading}>
          <Card.Card className="rounded-sm border-none bg-white shadow-sm">
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
        </Skeleton>
        <Skeleton loading={isLoading}>
          <Card.Card className="rounded-sm border-none bg-white shadow-sm">
            <Card.CardContent className="p-0">
              <DataTable columns={columns} data={sales} />
            </Card.CardContent>
          </Card.Card>
        </Skeleton>
      </main>
    </>
  );
}
