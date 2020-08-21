import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import history from "./history"

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

// const { state, dispatch } = useAppData();


ReactDOM.render(
  <HashRouter history={history}>
    <Switch>
        <Route path="/admin" component={Admin} />
        {/* <Route path="/rtl" component={RTL} /> */}
        <Redirect from="/" to="/admin/dashboard" />
  </Switch>
  </HashRouter>,
  document.getElementById("root")
);
