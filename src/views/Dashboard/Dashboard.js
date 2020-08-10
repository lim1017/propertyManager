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

  useEffect(() => {
    console.log('changing active')
  }, [state.activeCompany])

  console.log(state);

  const buildings = [
    {
      name: "Home",
      img: "https://www.newstreet.ca/property-images/E4185556-1.jpeg",
      description: "Heart of Scarbrough",
      id: 1,
    },
    {
      name: "Condo",
      img:
        "https://shared-s3.property.ca/public/images/archive_listings/c4612065/c4612065_1.jpg",
      description: "Heart of City Place",
      id: 2,
    },
    {
      name: "Hamilton",
      img:
        "https://photos.zolo.ca/2-229-bay-street-south-hamilton-h4069563-largephoto-1-processed-orig.jpg?2019-12-21+21%3A55%3A25",
      description: "Rosedale area, just off the mountain",
      id: 3,
    },
    {
      name: "Whitby",
      img:
        "https://www.durhamradionews.com/wp-content/uploads/BROCK-STREET-BUILDING-CAVE-IN-WALL-WHITBY-DOWNTOWN.jpg",
      description: "Downtown whitby Four corners",
      id: 4,
    },
  ];

  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {buildings.map((building) => {
        return (
          <div style={{ marginBottom: 10 }}>
            <BasicCardPicture
              title={building.name}
              img={building.img}
              description={building.description}
              id={building.id}
            />
          </div>
        );
      })}
    </div>
  );
}
