import { Header, PageLoader, PageNotFound } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button, Typography } from "neetoui";
import { isNotNil } from "ramda";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";

import Carousel from "./Carousel";

const Product = () => {
  // const [product, setProduct] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  // const [isError, setIsError] = useState(false);
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  // const fetchProduct = async () => {
  //   try {
  //     const response = await productApi.show(slug);
  //     // console.log("Product Page ", response.name);
  //     // setProduct(response);
  //   } catch (err) {
  //     console.log("Error : ", err);
  //     // setIsError(true);
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProduct();
  // }, []);
  const { data: product = {}, isLoading, isError } = useShowProduct(slug);

  if (isError) {
    return <PageNotFound />;
  }

  // console.log("Products ", product);

  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrls,
    imageUrl,
    availableQuantity,
  } = product;
  const totDiscount = mrp - offerPrice;
  const discountedPercentage = ((totDiscount / mrp) * 100).toFixed(2);

  // console.log(name, description, mrp, offerPrice, imageUrls, imageUrl);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="px-6 pb-6">
      <div className="grid">
        <Header title={name} />
        <hr className="neeto-ui-border-black neeto-ui-bg-black col-span-2 h-1 w-full" />
      </div>
      <div className="mt-16 flex gap-4">
        <div className="col-auto  w-2/5 justify-center text-center align-middle">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel />
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
          <div className="flex space-x-10">
            <AddToCart {...{ availableQuantity, slug }} />
            <div className="flex flex-col items-center pt-4">
              <Button
                className="bg-neutral-800 hover:bg-neutral-950"
                label="Buy now"
                size="large"
                to={routes.checkout}
                onClick={() => setSelectedQuantity(selectedQuantity || 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
