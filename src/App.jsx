// import Product from "components/Product";
import { PageNotFound } from "components/commons";
import Product from "components/Product";
import ProductList from "components/ProductList";
import { Redirect, Route, Switch } from "react-router-dom";

import routes from "./routes";

const App = () => {
  const { index, show } = routes.products;
  console.log("ApIs : ", index, show);

  return (
    <Switch>
      <Route exact component={ProductList} path={index} />
      <Route exact component={Product} path={show} />
      <Redirect exact from={routes.root} to={index} />
      <Route component={PageNotFound} path="*" />
    </Switch>
  );
};

export default App;
