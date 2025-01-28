import Image from "next/image";

type Product = {
  image: string;
  title: string;
  subtitle: string;
  tags: string[];
};

export function ProductDetail({ product }: { product?: Product }) {
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Image
        src={product?.image ?? ""}
        alt={product?.title ?? ""}
        height={200}
        width={200}
      />
      <h1 className="mb-2 text-center text-2xl font-bold">{product?.title}</h1>
      <p className="px-6 text-center text-sm font-light text-gray-400">
        {product?.subtitle}
      </p>
      <div className="-mx-4 mt-4 border-gray-100 p-4 lg:border-y">
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
    </>
  );
}
