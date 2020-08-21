import React, { useState, useEffect, useContext } from "react";
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
import { Context } from "../../hooks/reducers/appDataReducer";
import propertyAPI from "../../apis/propertyManagerAPI";
import Swal from "sweetalert2";

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

export default function UserProfile() {
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
    fetchActiveUser,
  } = context;

  const [userDetails, setUserDetails] = useState(state.user);

  useEffect(() => {
    async function fetchData4App() {
      const user = await propertyAPI.get("/users");
      setUserDetails(user.data[0]);
    }
    fetchData4App();
  }, []);

  const handleChange = (e, id) => {
    setUserDetails({ ...userDetails, [id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await propertyAPI.patch(`/users/${userDetails.user_id}`, userDetails);
      fetchActiveUser(userDetails.user_id);

      Swal.fire("User Profile Updated", "", "success");
    } catch {
      alert("error");
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel>First Name</InputLabel>
                  <CustomInput
                    // labelText="First Name"
                    id="first_name"
                    value={userDetails?.first_name}
                    handleChange={handleChange}
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
                    id="last_name"
                    value={userDetails?.last_name}
                    handleChange={handleChange}
                    formControlProps={{
                      fullWidth: true,
                      style: { marginTop: 0 },
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel>Phone</InputLabel>
                  <CustomInput
                    // labelText="Phone#"
                    id="phone"
                    value={userDetails?.phone}
                    handleChange={handleChange}
                    formControlProps={{
                      fullWidth: true,
                      style: { marginTop: 0 },
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel>Email</InputLabel>
                  <CustomInput
                    // labelText="Email address"
                    id="email"
                    value={userDetails?.email}
                    handleChange={handleChange}
                    formControlProps={{
                      fullWidth: true,
                      style: { marginTop: 0 },
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <InputLabel>Profile Url:</InputLabel>
                  <CustomInput
                    // labelText="Email address"
                    id="profile_img"
                    value={userDetails?.profile_img}
                    handleChange={handleChange}
                    formControlProps={{
                      fullWidth: true,
                      style: { marginTop: 0 },
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    // labelText="About"
                    id="about"
                    value={userDetails?.about}
                    handleChange={handleChange}
                    formControlProps={{
                      fullWidth: true,
                      style: { marginTop: 0 },
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
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4} style={{ marginTop: "15px" }}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img
                  src={userDetails?.profile_img}
                  alt="..."
                  width="500"
                  length="300"
                />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>
                {userDetails?.first_name + " " + userDetails?.last_name}
              </h4>
              <p className={classes.description}>{userDetails?.about}</p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
