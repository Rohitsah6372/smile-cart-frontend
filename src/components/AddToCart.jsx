import { Button } from "neetoui";

const AddToCart = ({ isInCart, toggleIsInCart }) => {
  // const [isInCart, setIsInCart] = useState(false);

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    // setIsInCart(prevValue => !prevValue);
    toggleIsInCart();
  };

  return (
    <div>
      <Button
        label={isInCart ? "Remove from Cart" : "ADD TO CART"}
        style="primary"
        onClick={handleClick}
      />
    </div>
  );
};

export default AddToCart;
