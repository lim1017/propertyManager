import React, { useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../../hooks/reducers/appDataReducer";
import {
  SET_DATA,
  SET_COMPANY,
  SET_TENANTS,
  SET_PROPERTIES,
  SET_LOADING,
  SET_USER,
  SET_ACTIVE_COMPANY,
} from "../../hooks/reducers/appDataReducer";
import { sortObj } from "../../helperFunctions"
import BasicCardPicture from "../../components/Card/BasicCardPicture";
import propertyAPI from "../../apis//propertyManagerAPI";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const context = useContext(Context);
  const { state, dispatch, fetchProperties, fetchData } = context;

  async function updateProperties() {
    const activeCompany = state.company.filter((comp) => {
      return comp.name === state.activeCompany;
    });
    await fetchProperties(activeCompany);
  }

  // localStorage.setItem("id", user.data[0].user_id);


  useEffect(() => {
    async function fetchData() {
      const user = await propertyAPI.get("/users");
      dispatch({ type: SET_USER, user: user.data[0] });

      const userID = user.data[0].user_id;
      const companies = await propertyAPI.get(`/companies/${userID}`);

      const sortedCompanies = companies.data.sort(sortObj);

      dispatch({
        type: SET_COMPANY,
        company: sortedCompanies,
        activeCompany: state.activeCompany
          ? state.activeCompany
          : companies.data[0].name,
      });

      if (state.activeCompany) {
        updateProperties();
      }
    }

    fetchData();
  }, []);

  console.log(state)

  useEffect(() => {
    if (state.activeCompany) {
      updateProperties();
    }
  }, [state.activeCompany]);

  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {state.properties ? (
        state.properties.map((building) => {
          return (
            <div style={{ marginBottom: 10 }}>
              <BasicCardPicture
                title={building.name}
                img={building.image}
                description={building.description}
                id={building.property_id}
                data={building}
              />
            </div>
          );
        })
      ) : (
        <div>LOADING </div>
      )}
    </div>
  );
}
