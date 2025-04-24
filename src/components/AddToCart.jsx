import { useContext } from "react";

import { Button } from "neetoui";
import { without } from "ramda";
import CartItemsContext from "src/contexts/CartItemsContext";

const AddToCart = ({ slug }) => {
  // const [isInCart, setIsInCart] = useState(false);

  const [cartItems, setCartItems] = useContext(CartItemsContext);

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    // setIsInCart(prevValue => !prevValue);
    // toggleIsInCart();
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], cartItems)
        : [slug, ...cartItems]
    );
  };

  return (
    <div>
      <Button
        label={cartItems.includes(slug) ? "Remove from Cart" : "ADD TO CART"}
        style="primary"
        onClick={handleClick}
      />
    </div>
  );
};

export default AddToCart;
