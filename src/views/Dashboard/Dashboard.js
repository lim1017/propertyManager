import React, { useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import appDataContext from "../../hooks/useContext";
import {
  SET_DATA,
  SET_COMPANY,
  SET_TENANTS,
  SET_PROPERTIES,
  SET_LOADING,
  SET_USER,
} from "../../hooks/reducers/appDataReducer";
import BasicCardPicture from "../../components/Card/BasicCardPicture";
import propertyAPI from "../../apis//propertyManagerAPI";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const { state, dispatch } = useContext(appDataContext);




  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {state.properties ? state.properties.map((building) => {
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
      : <div>LOADING </div>
      }
    </div>
  );
}
