import { useEffect, useState } from "react";

import productApi from "apis/products";
import Header from "components/commons/Header";
import { Spinner } from "neetoui";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fecthProducts = async () => {
    try {
      const { products } = await productApi.fetch();
      // console.log(response);
      console.log(products);
      setProducts(products);
    } catch (error) {
      console.log(`Error in fetching from ProductList.jsx : `, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fecthProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner />;
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="m-2">
        <Header shouldShowBackButton={false} title="Smile Cart" />
        <hr className="neeto-ui-bg-black h-1" />
      </div>
      {/* <Typography className="mx-auto" style="h2">
        Home
      </Typography> */}
      <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductListItem key={product.slug} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
