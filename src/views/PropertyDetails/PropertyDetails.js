import React, { useEffect, useContext, useState } from "react";
import appDataContext from "../../hooks/useContext";
import propertyAPI from "../../apis//propertyManagerAPI";

export const PropertyDetails = (props) => {
  const { state, dispatch } = useContext(appDataContext);

  const [propertyDetails, setPropertyDetails] = useState({});
  console.log(propertyDetails);
  const activeProperty = props.match.params.id;

  useEffect(() => {
    async function getProperty() {
      if (state.activeCompany) {
        const response = await propertyAPI.get(`/property/${state.activeCompany}&${activeProperty}`);
        setPropertyDetails(response.data[0]);
      }
    }
    getProperty();
  }, [state.activeCompany]);

  return (
    <div>PropertyDetails name:{propertyDetails.name}</div>
  );
};
