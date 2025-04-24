import { Typography } from "neetoui";
import { Link } from "react-router-dom";

const ProductListItem = ({ imageUrl, name, offerPrice, slug }) => {
  console.log(imageUrl);

  return (
    <Link
      className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between border p-4"
      to={`products/${slug}`}
    >
      <img alt="" className="h-40 w-40" src={imageUrl} />
      <Typography className="text-center">{name}</Typography>
      <Typography>${offerPrice}</Typography>
    </Link>
  );
};
export default ProductListItem;
