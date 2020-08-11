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
import appDataContext from "../../hooks/useContext";
import {
  SET_ACTIVE_COMPANY,
  SET_PROPERTIES,
  SET_DATA,
  SET_COMPANY,
  SET_TENANTS,
  SET_LOADING,
  SET_USER,
} from "../../hooks/reducers/appDataReducer";
import propertyAPI from "../../apis//propertyManagerAPI";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const { state, dispatch } = useContext(appDataContext);
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

  // useEffect(() => {
  //   async function fetchData() {
  //     const user = await propertyAPI.get("/users");
  //     dispatch({ type: SET_USER, user: user.data[0] });

  //     const userID = user.data[0].user_id;
  //     const companies = await propertyAPI.get(`/companies/${userID}`);
  //     console.log(companies)
  //     dispatch({
  //       type: SET_COMPANY,
  //       company: companies.data,
  //       activeCompany: state.activeCompany
  //         ? state.activeCompany
  //         : companies.data[0].company_id,
  //     });

  //     const companyID = companies.data[0].company_id;
  //     const properties = await propertyAPI.get(`/properties/${companyID}`);
  //     dispatch({ type: SET_PROPERTIES, properties: properties.data });
  //   }

  //   fetchData();
  // }, []);

  useEffect(() => {
    async function updateProperties() {
      const companyID = state.activeCompany;
      const properties = await propertyAPI.get(`/properties/${companyID}`);
      dispatch({ type: SET_PROPERTIES, properties: properties.data });
    }

    updateProperties();
  }, [state.activeCompany]);

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
