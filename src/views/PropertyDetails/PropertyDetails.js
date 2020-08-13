import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Context } from "../../hooks/reducers/appDataReducer";
import propertyAPI from "../../apis//propertyManagerAPI";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// import Button from "components/CustomButtons/Button.js";
import Button from "@material-ui/core/Button";
import CardAvatar from "components/Card/CardAvatar.js";
import avatar from "assets/img/faces/marc.jpg";
import Modal from "../../components/Modal/Modal"

import CardFooter from "components/Card/CardFooter";
import UnitProfile from "../../components/UnitProfile/UnitProfile"

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
    fontSize: "20px",
  },
};

const useStyles = makeStyles(styles);

export const PropertyDetails = (props) => {
  const classes = useStyles();

  const context = useContext(Context);
  const {
    state,
    dispatch,
    fetchData,
    fetchProperties,
    fetchUnits
  } = context;
  const [propertyDetails, setPropertyDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [unitInModal, setUnitInModal] = useState(null);



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
      setLoading(false);
    }
    fetchData4App();
  }, []);

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


  useEffect(() => {
    if(propertyDetails.property_id){
      fetchUnits(propertyDetails.property_id)
    }
  }, [propertyDetails])

  const renderUnits= ()=>{
    return state.units? state.units.map(unit =>{
      return (

        <UnitProfile 
          unit={unit} 
          setIsEditing={setIsEditing} 
          setShowModal={setShowModal} 
          setUnitInModal={setUnitInModal}
        />
     
      )
    }) : null
  }

  // console.log(state)

  return (
    <div>
      <Modal showModal={showModal} setShowModal={setShowModal} data={propertyDetails} editState={isEditing} unitInModal={unitInModal}/>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
            {propertyDetails.name} // {propertyDetails.type}
          </h4>
          <div className={classes.cardCategoryWhite}>
            {propertyDetails.address?.address?.toUpperCase()}
          </div>
          <div className={classes.cardCategoryWhite}>
            {propertyDetails.address?.city?.toUpperCase()},{" "}
            {propertyDetails.address?.postal?.toUpperCase()},{" "}
            {propertyDetails.address?.country?.toUpperCase()}
          </div>
          <div className={classes.cardCategoryWhite}>
            {propertyDetails.address?.country?.toUpperCase()}
          </div>
        </CardHeader>

        <CardBody></CardBody>
      </Card>

      <GridContainer style={{display:"flex", justifyContent:"space-between"}}>

        <GridItem xs={12} sm={12} md={8}>
          <Card >
          <CardBody>
            <div style={{display:"flex", justifyContent:"space-between"}}>
            <p style={{fontSize: 22, marginTop:5, marginRight: 10}}>Units</p> 
            <Button variant="contained" color="primary" onClick={()=>setShowModal(true)}>Add Unit</Button> 
            </div>
            
            {renderUnits()}

          </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
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
        </GridItem>
      </GridContainer>
    </div>
  );
};
