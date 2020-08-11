import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../hooks/reducers/appDataReducer";
import propertyAPI from "../../apis//propertyManagerAPI";

export const PropertyDetails = (props) => {
  const context = useContext(Context);
  const { state, dispatch } = context;

  const [propertyDetails, setPropertyDetails] = useState({});
  const activeProperty = props.match.params.id;

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

  return <div>PropertyDetails name:{propertyDetails.name}</div>;
};
