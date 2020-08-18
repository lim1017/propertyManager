import React, { useState, useContext, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import avatar from "assets/img/faces/marc.jpg";
import propertyAPI from "../../apis/propertyManagerAPI";
import { Context, fetchUnits } from "../../hooks/reducers/appDataReducer";
import TenantModal from "../../components/Modal/TenantModal";
import IssuesModal from "../../components/Modal/IssuesModal";

import {
  SET_ACTIVE_COMPANY,
  SET_COMPANY,
} from "../../hooks/reducers/appDataReducer";

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

export default function CompanyProfile({
  unit,
  setIsEditing,
  setShowModal,
  setUnitInModal,
  propertyDetails
}) {
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
    fetchTenants,
    fetchUnits,
  } = context;

  const [isEditingTenant, setIsEditingTenant] = useState(false);
  const [tenantModal, setTenantModal] = useState(false);
  const [issuesModal, setIssusesModal] = useState(false);

  const [unitInModalTenant, setUnitInModalTenant] = useState(null)

  useEffect(() => {
    fetchTenants(unit.unit_id);
  }, []);

  const renderTenants = () => {
    return state.tenants
      ? state.tenants.map((tenant) => {
        if(tenant.unitid == unit.unit_id){
          return (
            <Button color="primary"
            onClick={()=>{
              setTenantModal(true)
              setIsEditingTenant(true)
              setUnitInModalTenant(tenant.tenant_id)
            }}
            > 
            {tenant.name}
            </Button>
          )
        }
         
        })
      : null;
  };
  console.log(unit)

  const handleDelete = async () =>{
    await propertyAPI.delete(`/unit/${unit.unit_id}`)
    await fetchUnits(propertyDetails.property_id)
  }

  const classes = useStyles();
  return (
    <div>
      <TenantModal
        tenantModal={tenantModal}
        setTenantModal={setTenantModal}
        data={unit}
        isEditingTenant={isEditingTenant}
        setIsEditingTenant={setIsEditingTenant}
        unitInModalTenant={unitInModalTenant}
      />
      <IssuesModal unit={unit} issuesModal={issuesModal} setIssusesModal={setIssusesModal} propertyID={propertyDetails.property_id}/>

      <Card key={unit.unit_id}>
        <CardBody>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            Unit: {unit.unit} {unit.occupied ? null : "*"}
            <div>
              <Button
                color="primary"
                onClick={() => {
                  setTenantModal(true);
                }}
              >
                Add Tenant
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  setIssusesModal(true);
                }}
              >
                Add Issue
              </Button>

              <Button
                color="primary"
                onClick={() => {
                  setIsEditing(true);
                  setShowModal(true);
                  setUnitInModal(unit.unit_id);
                }}
              >
                Edit Unit
              </Button>
              <Button 
              color="primary"
              onClick={handleDelete}
              >Delete Unit</Button>
            </div>
          </div>
          Rent $ {unit.rent}
        </CardBody>
        <CardFooter>
          <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
          <div style={{marginLeft:"5px"}}>Tenant(s): </div> 
          <div>{renderTenants()}</div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
