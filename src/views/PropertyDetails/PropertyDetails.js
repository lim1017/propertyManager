import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Context } from "../../hooks/reducers/appDataReducer";
import propertyAPI from "../../apis//propertyManagerAPI";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);


export const PropertyDetails = (props) => {
  const classes = useStyles();

  const context = useContext(Context);
  const {
    state,
    dispatch,
    fetchCompanies,
    createCompany,
    editCompany,
    setActiveCompany,
    fetchData,
    fetchProperties,
  } = context;
  const [propertyDetails, setPropertyDetails] = useState({});
  
  const [loading, setLoading] = useState(false);
  const activeProperty = props.match.params.id;

  const activeUser = localStorage.getItem("id");

  async function updateProperties() {
    const activeCompany = state.company.filter((comp) => {
      return comp.name === state.activeCompany;
    });
    await fetchProperties(activeCompany);
  }

  useEffect(() => {

      setLoading(true);


    async function fetchData4App() {
      await fetchData(state);
      if (state.activeCompany) {
        await updateProperties();
      }
      setLoading(false)
    }
    fetchData4App();
  }, []);

  console.log(state)



  useEffect(() => {
    async function getProperty() {
      if (state.activeCompany) {
        const activeCompany = state.company.filter((comp) => {
          return comp.name === state.activeCompany;
        });

        const response = await propertyAPI.get(
          `/property/${activeCompany[0].company_id}&${activeProperty}`
        );
        setPropertyDetails(response.data[0]);
      }
    }
    getProperty();
  }, [state.activeCompany]);

  console.log(propertyDetails)

  return (

    <Card>
    <CardHeader color="primary">
      <h4 className={classes.cardTitleWhite}>
        {propertyDetails.name} -- {propertyDetails.type}
      </h4>
      <p className={classes.cardCategoryWhite}>
        Complete your profile
      </p>
    </CardHeader>
    </Card>

  )
};
