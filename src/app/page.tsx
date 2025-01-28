import Image from "next/image";
// todo: mock this as a fake api call using react query
import data from "public/data.json";
import logo from "public/stackline_logo.svg";

export default function HomePage() {
  const product = data[0];
  return (
    <>
      <nav className="flex h-20 w-full items-center bg-[#052849]">
        <div className="ml-8 flex flex-col">
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
        <div className="col-span-7 row-span-6 rounded-sm bg-white shadow-lg">
          <h1 className="p-8 text-xl">Retail Sales</h1>
          <div className="m-4 flex h-[calc(100%-8rem)] w-[calc(100%-2rem)] rounded-lg bg-gray-100"></div>
        </div>
        <div className="col-span-7 row-span-6 rounded-sm bg-white shadow-lg">
          {/* todo: table */}
        </div>
      </main>
    </>
  );
}
