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


  console.log(state)

  useEffect(() => {
    async function fetchData() {
      const user = await propertyAPI.get("/users");
      dispatch({ type: SET_USER, user: user.data[0] });

      const userID = user.data[0].user_id;
      const companies = await propertyAPI.get(`/companies/${userID}`);
      dispatch({
        type: SET_COMPANY,
        company: companies.data,
        activeCompany: state.activeCompany
          ? state.activeCompany
          : companies.data[0].company_id,
      });

      const companyID = companies.data[0].company_id;
      const properties = await propertyAPI.get(`/properties/${companyID}`);
      dispatch({ type: SET_PROPERTIES, properties: properties.data });
    }

    fetchData();
  }, []);


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
