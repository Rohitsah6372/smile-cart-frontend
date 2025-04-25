import { useState } from "react";

import { Header, PageLoader } from "components/commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useDebounce from "hooks/useDebounce";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { isEmpty, mergeLeft, without } from "ramda";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const queryParams = useQueryParams();
  const { page, pageSize, searchTerm = "" } = queryParams;
  const [searchKey, setSearchKey] = useState(searchTerm);
  const [cartItems, setCartItems] = useState([]);
  useDebounce(searchKey);

  const history = useHistory();
  const handlePageNavigation = page =>
    history.replace(
      buildUrl(
        routes.products.index,
        mergeLeft({ page, pageSize: DEFAULT_PAGE_SIZE }, queryParams)
      )
    );

  const toggleIsInCart = slug =>
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], cartItems)
        : [slug, ...cartItems]
    );

  const updateQueryParams = useFuncDebounce(value => {
    const params = {
      page: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      searchTerm: value || null,
    };

    setSearchKey(value);

    history.replace(buildUrl(routes.products.index, filterNonNull(params)));
  });

  const productsParams = {
    searchTerm,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
  };

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);

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
                  onChange={({ target: { value } }) => {
                    updateQueryParams(value);
                    setSearchKey(value);
                  }}
                  // onChange={event => {
                  //   setSearchKey(event.target.value);
                  //   // setCurrentPage(DEFAULT_PAGE_INDEX);
                  // }}
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
            <Pagination
              count={totalProductsCount}
              navigate={handlePageNavigation}
              pageNo={Number(page) || DEFAULT_PAGE_INDEX}
              pageSize={Number(pageSize) || DEFAULT_PAGE_SIZE}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
