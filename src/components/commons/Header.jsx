import { Left } from "neetoicons";
import { Button, Typography } from "neetoui";
import { keys } from "ramda";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";
import useCartItemsStore from "stores/useCartItemsStore";

const Header = ({ title, shouldShowBackButton = true, actionBlock }) => {
  const history = useHistory();
  const cartItemsCount = useCartItemsStore(
    store => keys(store.cartItems).length
  );

  return (
    <div className="m-2 flex items-center justify-between gap-3">
      {shouldShowBackButton && (
        <Button
          icon={Left}
          style="secondary"
          onClick={() => history.goBack()}
        />
      )}
      <Typography className="ml-4 text-5xl font-medium" style="h3">
        {title}
      </Typography>
      <div className="flex items-end space-x-4">
        {actionBlock}
        <div className="carticon self-end">
          <div className="flex flex-col">
            {cartItemsCount > 0 && (
              <span className="neeto-ui-border-black neeto-ui-rounded-full min-w-fit flex h-5 w-5 items-center self-end border p-1">
                {cartItemsCount}
              </span>
            )}
            <Link to={routes.cart}>
              <AiOutlineShoppingCart className="h-8 w-8 " />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
