import { useEffect, useState } from "react";

import productApi from "apis/products";
import { Header, PageLoader } from "components/commons";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty, without } from "ramda";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const debouncedSearchKey = useDebounce(searchKey);

  const toggleIsInCart = slug =>
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], cartItems)
        : [slug, ...cartItems]
    );

  const fecthProducts = async () => {
    try {
      const { products } = await productApi.fetch({
        searchTerm: debouncedSearchKey,
      });
      setProducts(products);
    } catch (error) {
      console.log(`Error in fetching from ProductList.jsx : `, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fecthProducts();
  }, [debouncedSearchKey]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col">
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No Data to show" />
      ) : (
        <>
          <div className="m-2">
            <Header
              cartItemCount={cartItems.length}
              shouldShowBackButton={false}
              title="Smile Cart"
              actionBlock={
                <Input
                  placeholder="Search Products"
                  prefic={<Search />}
                  type="Search"
                  onChange={event => setSearchKey(event.target.value)}
                />
              }
            />
            <hr className="neeto-ui-bg-black h-1" />
          </div>
          <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <ProductListItem
                key={product.slug}
                {...product}
                isInCart={cartItems.includes(product.slug)}
                toggleIsInCart={() => toggleIsInCart(product.slug)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
