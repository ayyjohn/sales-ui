import data from "public/data.json";

const getProductData = async (
  id: string,
): Promise<(typeof data)[0] | undefined> => {
  // fake returning product data after 2s
  console.log("fetching product data");
  return new Promise((resolve) =>
    setTimeout(() => resolve(data.find((product) => product.id === id)), 2000),
  );
};

export { getProductData };
