import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";
import Dropdown from "../Dropdown/Dropdown";
import {Context} from "../../hooks/reducers/appDataReducer";
import {
  SET_ACTIVE_COMPANY,
} from "../../hooks/reducers/appDataReducer";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const context = useContext(Context);
  const { state, dispatch } = context
  const classes = useStyles();

  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });

  let isDisabled =
    props.location.pathname === "/admin/dashboard" ? null : "disabled";

  const handleChg = (e) => {
    dispatch({ type: SET_ACTIVE_COMPANY, activeCompany: e.target.value });
  };

  return (
    <AppBar
      className={classes.appBar + appBarClasses}
      style={{ borderBottom: "2px solid black" }}
    >
      <Toolbar className={classes.container}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Dropdown
              data={state.company}
              label="Company"
              value={state.activeCompany}
              isLoading={state.isLoading}
              handleChg={handleChg}
              isDisabled={isDisabled}
            />

            <Link
              to={{
                pathname: `/admin/companyprofile/create`,
                state: { state: "create" },
              }}
            >
              <Button
                style={{
                  marginRight: "1em",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
                variant="contained"
                color="primary"
              >
                {" "}
                Create Company{" "}
              </Button>
            </Link>
            <Button
              style={{
                marginRight: "1em",
                display: "flex",
                justifyContent: "flex-start",
              }}
              variant="contained"
              color="primary"
            >
              {" "}
              Add Property{" "}
            </Button>
          </div>

          <div style={{ alignSelf: "center" }}>
            <Button variant="contained" color="primary">
              {" "}
              Logout{" "}
            </Button>
          </div>
        </div>
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
