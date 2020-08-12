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
import { Context } from "../../hooks/reducers/appDataReducer";

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

export default function CompanyProfile(props) {
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
    createProperty,
  } = context;

  let isEditing = props.location.pathname.endsWith("create") ? false : true;
  const [editState, setEditState] = useState(isEditing);
  const [propertyDetails, setpropertyDetails] = useState({});
  const [loading, setLoading] = useState(isEditing ? true : false);

  const activeUser = localStorage.getItem("id");

  async function updateProperties() {
    const activeCompany = state.company.filter((comp) => {
      return comp.name === state.activeCompany;
    });
    await fetchProperties(activeCompany);
  }

  useEffect(() => {
    if (editState) {
      setLoading(true);
    }

    async function fetchData4App() {
      await fetchData(state);
      if (state.activeCompany) {
        await updateProperties();
      }
    }
    fetchData4App();
  }, []);

  useEffect(() => {
    async function getpropertyDetails() {
      setLoading(true);
      const activeCompany = state.company.filter((comp) => {
        return comp.name === state.activeCompany;
      });
      const details = await propertyAPI.get(
        `/company/${activeUser}&${activeCompany[0].company_id}`
      );
      setpropertyDetails(details.data[0]);
      setLoading(false);
    }

    if (editState && state.company) {
      getpropertyDetails();
    }
  }, [state.company]);

  const handleChange = (e, id) => {
    if (
      id === "city" ||
      id === "country" ||
      id === "postal" ||
      id === "address"
    ) {
      setpropertyDetails({
        ...propertyDetails,
        address: { ...propertyDetails.address, [id]: e.target.value },
      });
    } else if (
      id === "firstName" ||
      id === "lastName" ||
      id === "phone1" ||
      id === "phone2" ||
      id === "personalEmail" ||
      id === "title"
    ) {
      setpropertyDetails({
        ...propertyDetails,
        manager: { ...propertyDetails.manager, [id]: e.target.value },
      });
    } else setpropertyDetails({ ...propertyDetails, [id]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!editState) { //create

      const activeCompany = state.company.filter((comp) => {
        return comp.name === state.activeCompany;
      });

      await createProperty(propertyDetails, activeCompany[0].company_id);
      await fetchProperties(activeCompany);

      // dispatch({
      //   type: SET_ACTIVE_COMPANY,
      //   activeCompany: propertyDetails.companyName,
      // });
      props.history.push("/admin/dashboard");
    } else {
      await editCompany(propertyDetails, activeUser);
      await fetchCompanies(activeUser);
      setActiveCompany(propertyDetails.name);
      props.history.push("/admin/dashboard");
    }
  };

  console.log(propertyDetails)

  const classes = useStyles();
  return (
    <div>
      {loading ? (
        <div>loading........</div>
      ) : (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  {editState
                    ? "Edit Property Profile"
                    : "Create Property Profile"}{" "}
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <InputLabel>Property Name</InputLabel>
                    <CustomInput
                      // labelText="Company Name"
                      id="name"
                      handleChange={handleChange}
                      value={propertyDetails.name}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                      inputProps={{}}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
                    <InputLabel>Property Type</InputLabel>
                    <CustomInput
                      // labelText="Email address"
                      id="type"
                      handleChange={handleChange}
                      value={propertyDetails.type}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <InputLabel># of Units</InputLabel>
                    <CustomInput
                      // labelText="Email address"
                      id="units"
                      handleChange={handleChange}
                      value={propertyDetails.units}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <InputLabel>Image Url</InputLabel>
                    <CustomInput
                      // labelText="Address"
                      id="image"
                      handleChange={handleChange}
                      value={propertyDetails.image}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        style: { width: "100%", marginTop: 0 },
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <InputLabel>Address</InputLabel>
                    <CustomInput
                      // labelText="Address"
                      id="address"
                      handleChange={handleChange}
                      value={propertyDetails?.address?.address}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        style: { width: "100%", marginTop: 0 },
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputLabel>City</InputLabel>
                    <CustomInput
                      // labelText="City"
                      id="city"
                      handleChange={handleChange}
                      value={propertyDetails?.address?.city}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputLabel>Country</InputLabel>
                    <CustomInput
                      // labelText="Country"
                      id="country"
                      handleChange={handleChange}
                      value={propertyDetails?.address?.country}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputLabel>Postal Code</InputLabel>
                    <CustomInput
                      // labelText="Postal Code"
                      id="postal"
                      handleChange={handleChange}
                      value={propertyDetails?.address?.postal}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <div
                      style={{
                        marginTop: "5px",
                        marginBottom: "10px",
                        fontSize: "18px",
                      }}
                    >
                      Management Contact:
                    </div>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>First Name</InputLabel>
                    <CustomInput
                      // labelText="First Name"
                      id="firstName"
                      handleChange={handleChange}
                      value={propertyDetails?.manager?.firstName}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Last Name</InputLabel>
                    <CustomInput
                      // labelText="Last Name"
                      id="lastName"
                      handleChange={handleChange}
                      value={propertyDetails?.manager?.lastName}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Title</InputLabel>
                    <CustomInput
                      // labelText="Title"
                      id="title"
                      handleChange={handleChange}
                      value={propertyDetails?.manager?.title}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Email</InputLabel>
                    <CustomInput
                      // labelText="Email"
                      id="personalEmail"
                      handleChange={handleChange}
                      value={propertyDetails?.manager?.personalEmail}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Phone #1</InputLabel>
                    <CustomInput
                      // labelText="Phone #1"
                      id="phone1"
                      handleChange={handleChange}
                      value={propertyDetails?.manager?.phone1}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Phone #2</InputLabel>
                    <CustomInput
                      // labelText="Phone #2"
                      id="phone2"
                      handleChange={handleChange}
                      value={propertyDetails?.manager?.phone2}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>
                      Description
                    </InputLabel>
                    <CustomInput
                      // labelText="Tell us about this company"
                      id="description"
                      handleChange={handleChange}
                      value={propertyDetails.notes}
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
                <Button color="primary" onClick={handleSubmit}>
                  Save Profile
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      )}
    </div>
  );
}
