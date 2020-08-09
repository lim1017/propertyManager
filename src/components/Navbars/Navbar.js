import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";
// import Button from "components/CustomButtons/Button.js";
import Button from "@material-ui/core/Button";

import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";

import Dropdown from "../Dropdown/Dropdown";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();

  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  return (
    <AppBar className={classes.appBar + appBarClasses} style={{borderBottom: "2px solid black"}}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Dropdown
            data={["Company A", "Company X", "Company Y"]}
            label="Company"
          />
        </div>

        <Button variant="contained" color="primary">
          {" "}
          Logout{" "}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
