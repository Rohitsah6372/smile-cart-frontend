import { Button } from "neetoui";
import useCartItemsStore from "stores/useCartItemsStore";
import shallow from "zustand/shallow";

const AddToCart = ({ slug }) => {
  const { isInCart, toggleIsInCart } = useCartItemsStore(
    store => ({
      isInCart: store.cartItems.includes(slug),
      toggleIsInCart: store.toggleIsInCart,
    }),
    shallow
  );

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    // setIsInCart(prevValue => !prevValue);
    // toggleIsInCart();
    // setCartItems(prevCartItems =>
    //   prevCartItems.includes(slug)
    //     ? without([slug], cartItems)
    //     : [slug, ...cartItems]
    // );
    toggleIsInCart(slug);
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
