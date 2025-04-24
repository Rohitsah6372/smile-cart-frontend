import { useEffect, useState } from "react";

import productApi from "apis/products";
import { Header, PageLoader } from "components/commons";

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
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col">
      <div className="m-2">
        <Header shouldShowBackButton={false} title="Smile Cart" />
        <hr className="neeto-ui-bg-black h-1" />
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductListItem key={product.slug} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
