import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ContactforBusiness from "./pages/contact-for-business";
import Thankyou from "./pages/thankyou";

const Routes = () => (
  <Switch>
    <Route exact path="/thankyou" component={Thankyou} />
    <Route exact path="/" component={ContactforBusiness} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
