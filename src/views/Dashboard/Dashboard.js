import React, { useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../../hooks/reducers/appDataReducer";
import { sortPropertyObj } from "../../helperFunctions";
import BasicCardPicture from "../../components/Card/BasicCardPicture";
import Spinner from "../../components/Spinner/Spinner"
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


  useEffect(() => {
    async function fetchData4App() {
      await fetchData(state);
      if (state.activeCompany) {
        updateProperties();
      }

      // localStorage.setItem("id", user.data[0].user_id);
      localStorage.setItem("id", state.user.user_id);

    }
    fetchData4App();
  }, []);

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
        state.properties.sort(sortPropertyObj).map((building) => {
          return (
            <div style={{ marginTop: "1em" }}>
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
        <div style={{marginTop:"2em"}}>
          <Spinner />
          <p style={{fontSize:"20px", marginTop:"30px"}}>Heroku free tier... </p>
          <p style={{fontSize:"20px", marginTop:"30px"}}>Allow up to 20 seconds </p>
        </div>
      )}
    </div>
  );
}
