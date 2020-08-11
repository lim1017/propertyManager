import React, { useState, useContext } from "react";
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
import propertyAPI from "../../apis/propertyManagerAPI"
import appDataContext from "../../hooks/useContext";


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
  const { state, dispatch } = useContext(appDataContext);
  console.log(state)
  let isEditing = props.location.pathname.endsWith("create") ? false : true;
  const [editState, setEditState] = useState(isEditing);


  const [companyDetails, setCompanyDetails]= useState({})

  const handleChange= (e, id) =>{
    setCompanyDetails({...companyDetails, [id]:e.target.value})
  }

  const handleSubmit= async ()=>{
    const activeUser=state.user.user_id
    console.log(activeUser)
    if (!editState){
      await propertyAPI.post('/company/create', {...companyDetails, activeUser})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {editState ? "Edit Company Profile" : "Create Company Profile"}{" "}
              </h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company Name"
                    id="companyName"
                    handleChange={handleChange}
                    value= {companyDetails.id}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={
                      {
                      }
                    }
                    
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Email address"
                    id="email"
                    handleChange={handleChange}
                    value= {companyDetails.id}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <CustomInput
                    labelText="Address"
                    id="address"
                    handleChange={handleChange}
                    value= {companyDetails.id}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={
                      {
                        style:{width:"100%"}
                      }
                    }
                    
                  />
                </GridItem>
               
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    handleChange={handleChange}
                    value= {companyDetails.id}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    handleChange={handleChange}
                    value= {companyDetails.id}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal"
                    handleChange={handleChange}
                    value= {companyDetails.id}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <div style={{ marginTop: "5px", fontSize:'18px' }}>Contact Information:</div>
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="firstName"
                    handleChange={handleChange}
                    value= {companyDetails.id}
                    formControlProps={{
                      fullWidth: true,
                      style: { marginTop: 0 },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="lastName"
                    handleChange={handleChange}
                    value= {companyDetails.id}
                    formControlProps={{
                      fullWidth: true,
                      style: { marginTop: 0 },
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Title"
                    id="title"
                    handleChange={handleChange}
                    value= {companyDetails.id}
                    formControlProps={{
                      fullWidth: true,
                      style: { marginTop: 0 },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email"
                    id="email"
                    handleChange={handleChange}
                    value= {companyDetails.id}
                    formControlProps={{
                      fullWidth: true,
                      style: { marginTop: 0 },
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Phone #1"
                    id="phone1"
                    handleChange={handleChange}
                    value= {companyDetails.id}
                    formControlProps={{
                      fullWidth: true,
                      style: { marginTop: 0 },
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Phone #2"
                    id="phone2"
                    handleChange={handleChange}
                    value= {companyDetails.id}
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
                    About/Notes:
                  </InputLabel>
                  <CustomInput
                    labelText="Tell us about this company"
                    id="about"
                    handleChange={handleChange}
                    value= {companyDetails.id}
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
              <Button color="primary" onClick={handleSubmit}>Save Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem> */}
      </GridContainer>
    </div>
  );
}
