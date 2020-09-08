import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";

import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "components/Grid/GridItem.js";
import CheckBox from "../CheckBox/CheckBox";
import { Context, fetchTenants } from "../../hooks/reducers/appDataReducer";
import propertyAPI from "../../apis/propertyManagerAPI";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
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
    fontSize: "20px",
  },
}));

export default function TransitionsModal({
  tenantModal,
  setTenantModal,
  data,
  isEditingTenant,
  setIsEditingTenant,
  unitInModalTenant,
}) {
  const classes = useStyles();
  const context = useContext(Context);
  const {
    state,
    createUnit,
    editUnit,
    fetchUnits,
    createTenant,
    fetchTenants,
    editTenant,
  } = context;
  const [tenantDetails, setTenantDetails] = useState({});

  useEffect(() => {
    async function getTenant() {
      const TenantInfo = await propertyAPI.get(`/tenant/${unitInModalTenant}`);
      setTenantDetails(TenantInfo.data[0]);
    }

    if (isEditingTenant) {
      getTenant();
    }
  }, [isEditingTenant]);

  const handleClose = () => {
    setTenantModal(false);
    // setIsEditingTenant(false)
    setTenantDetails({});
  };

  const handleChange = (e, id) => {
    setTenantDetails({ ...tenantDetails, [id]: e.target.value });
  };

  const handleSubmit = async () => {
    if (isEditingTenant) {
      await editTenant(tenantDetails);
      await fetchTenants(data.unit_id);
      // setIsEditingTenant(false)
    } else {
      await createTenant(tenantDetails, data.unit_id);
      await fetchTenants(data.unit_id);
    }

    handleClose();
  };

  const handleDelete = async () => {
    console.log(tenantDetails.tenant_id)
    await propertyAPI.delete(`/tenant/${tenantDetails.tenant_id}`);
    fetchTenants();
    handleClose();
  };

let isDisabled= tenantDetails?.name?.trim() ? false : true

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={tenantModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={tenantModal}>
          <div className={classes.paper}>
            <Card>
              <CardHeader color="primary">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className={classes.cardTitleWhite}>
                    {isEditingTenant ? "Edit Tenant Details" : "Add a Tenant"}
                  </h4>
                  <div style={{ display: "flex" }}></div>
                </div>
              </CardHeader>

              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                  <InputLabel>Name <span style={{fontSize:"10px", color:'red'}}>*Required</span> </InputLabel>
                    <CustomInput 
                      id="name"
                      handleChange={handleChange}
                      value={tenantDetails?.name}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Gender</InputLabel>
                    <CustomInput
                      // labelText="Company Name"
                      id="gender"
                      handleChange={handleChange}
                      value={tenantDetails?.gender}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                      inputProps={{}}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Phone </InputLabel>
                    <CustomInput
                      id="phone"
                      handleChange={handleChange}
                      value={tenantDetails?.phone}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                      inputProps={{}}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>Notes:</InputLabel>
                    <CustomInput
                      id="notes"
                      handleChange={handleChange}
                      value={tenantDetails?.notes}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={handleSubmit} disabled={isDisabled}>
                  Save
                </Button>
                {isEditingTenant ? (
                  <Button color="primary" onClick={handleDelete}>
                    Delete
                  </Button>
                ) : null}
              </CardFooter>
            </Card>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
