import { useEffect, useState } from "react";

import productApi from "apis/products";
import { LeftArrow } from "neetoicons";
import { Spinner, Typography } from "neetoui";
import { append, isNotNil } from "ramda";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

import Carousel from "./Carousel";
import PageNotFound from "./PageNotFound";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  const fetchProduct = async () => {
    try {
      const response = await productApi.show(slug);
      // console.log("Product Page ", response.name);
      setProduct(response);
    } catch (err) {
      console.log("Error : ", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isError) {
    return <PageNotFound />;
  }

  console.log("Products ", product);

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totDiscount = mrp - offerPrice;
  const discountedPercentage = ((totDiscount / mrp) * 100).toFixed(2);

  console.log(name, description, mrp, offerPrice, imageUrls, imageUrl);

  if (isLoading) {
    return (
      <div className=" flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      <div className="grid">
        <LeftArrow
          className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-6 mt-4 cursor-pointer"
          onClick={history.goBack}
        />
        <Typography className="py-2 text-4xl font-semibold">{name}</Typography>
        <hr className="neeto-ui-border-black neeto-ui-bg-black col-span-2 h-1 w-full" />
      </div>
      <div className="mt-16 flex gap-4">
        <div className="col-auto  w-2/5 justify-center text-center align-middle">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
            ) : (
              <img alt="Laptop image" className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: ${mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: ${offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountedPercentage}% off
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Product;
