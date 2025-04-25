// import Product from "components/Product";
import { useState } from "react";

import Cart from "components/Cart";
import Checkout from "components/Checkout";
import { PageNotFound } from "components/commons";
import Product from "components/Product";
import ProductList from "components/ProductList";
import { Redirect, Route, Switch } from "react-router-dom";

import CartItemsContext from "./contexts/CartItemsContext";
import routes from "./routes";

const App = () => {
  const { index, show } = routes.products;
  // console.log("ApIs : ", index, show);
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartItemsContext.Provider value={[cartItems, setCartItems]}>
      <Switch>
        <Route exact component={ProductList} path={index} />
        <Route exact component={Product} path={show} />
        <Redirect exact from={routes.root} to={index} />
        <Route exact component={Cart} path={routes.cart} />
        <Route exact component={Checkout} path={routes.checkout} />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </CartItemsContext.Provider>
  );
};

export default App;
