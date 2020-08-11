import React, { useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {Context} from "../../hooks/reducers/appDataReducer";
import {
  SET_DATA,
  SET_COMPANY,
  SET_TENANTS,
  SET_PROPERTIES,
  SET_LOADING,
  SET_USER,
  SET_ACTIVE_COMPANY
} from "../../hooks/reducers/appDataReducer";
import BasicCardPicture from "../../components/Card/BasicCardPicture";
import propertyAPI from "../../apis//propertyManagerAPI";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const context = useContext(Context);
  const { state, dispatch, fetchProperties } = context


  async function updateProperties() {
    const activeCompany=state.company.filter(comp =>{
      return comp.name===state.activeCompany
    })
    await fetchProperties(activeCompany)
  }


  function sortObj(a, b) {
    // Use toUpperCase() to ignore character casing
    const company1 = a.company_id
    const company2 = b.company_id
  
    let comparison = 0;
    if (company1 > company2) {
      comparison = 1;
    } else if (company1 < company2) {
      comparison = -1;
    }
    return comparison;
  }


  useEffect(() => {
    async function fetchData() {
      const user = await propertyAPI.get("/users");
      dispatch({ type: SET_USER, user: user.data[0] });

      const userID = user.data[0].user_id;
      const companies = await propertyAPI.get(`/companies/${userID}`);

      const sortedCompanies=companies.data.sort(sortObj)


      dispatch({
        type: SET_COMPANY,
        company: sortedCompanies,
        activeCompany: state.activeCompany
          ? state.activeCompany
          : companies.data[0].name,
      });

      if(state.activeCompany){
        updateProperties();
      }   
    }

    fetchData();

  }, []);

  useEffect(() => {

    if(state.activeCompany){
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
