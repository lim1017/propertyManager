import React, {useContext, useEffect} from "react";
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
import {SET_ACTIVE_COMPANY, SET_PROPERTIES} from "../../hooks/reducers/appDataReducer"
import propertyAPI from "../../apis//propertyManagerAPI";


const useStyles = makeStyles(styles);

export default function Header(props) {

  const { state, dispatch } = useContext(appDataContext);

  const classes = useStyles();

  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });

  const handleChg =(e)=>{
    dispatch({type: SET_ACTIVE_COMPANY, activeCompany: e.target.value})
  }

  useEffect(() => {

     async function updateProperties (){
      const companyID = state.activeCompany
      const properties = await propertyAPI.get(`/properties/${companyID}`);
      dispatch({ type: SET_PROPERTIES, properties: properties.data });
    }

    updateProperties()

  }, [state.activeCompany])

  return (
    <AppBar className={classes.appBar + appBarClasses} style={{borderBottom: "2px solid black"}}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Dropdown
            data={state.company}
            label="Company"
            value={state.activeCompany}
            isLoading={state.isLoading}
            handleChg={handleChg}
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
