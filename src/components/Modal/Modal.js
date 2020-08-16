import React, {useState, useContext, useEffect} from "react";
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
import CheckBox from "../CheckBox/CheckBox"
import { Context } from "../../hooks/reducers/appDataReducer";
import propertyAPI from "../../apis/propertyManagerAPI"


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

export default function TransitionsModal({ showModal, setShowModal, data, editState, unitInModal }) {
  const classes = useStyles();

  const context = useContext(Context);
  const {state, createUnit, editUnit, fetchUnits} = context;
  const [unitDetails, setUnitDetails] = useState({});
  const [isCommercial, setIsCommercial] = useState(false);

  useEffect(() => {

    async function getUnit(){
      const unitInfo = await propertyAPI.get(`/unit/${unitInModal}`)
      console.log(unitInfo)
      setUnitDetails(unitInfo.data[0])
    }

    if (editState){
      getUnit()
    }
  }, [editState])

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (e, id) => {
    if (id ==="Occupied"){
      setUnitDetails({ ...unitDetails, [id]: e.target.checked });

    } else if(id === "Hydro" || id === "Gas" || id === "Water" || id=== "Taxes"){
      setUnitDetails({ ...unitDetails, tmi:{...unitDetails.tmi, [id]: e.target.checked}  });
    } else setUnitDetails({ ...unitDetails, [id]: e.target.value });
  };

  const handleSubmit = async () => {
    
    if(!editState){
      await createUnit(unitDetails, data.property_id)
      fetchUnits(data.property_id)
    } else{
      await editUnit(unitDetails, unitInModal)
      fetchUnits(data.property_id)
      
    }
    
    setUnitDetails({})
    handleClose()

  };


  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={showModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <div className={classes.paper}>
            <Card>
              <CardHeader color="primary">
                <div style={{display:"flex", justifyContent:"space-between"}}>
                <h4 className={classes.cardTitleWhite}>{editState ? "Edit unit details" : "Add a Unit"}</h4>
                <div style={{display:"flex"}}>
                <CheckBox label="Commercial" initalState={isCommercial} handleChange={()=>setIsCommercial(!isCommercial)} />
                <CheckBox label="Occupied" initalState={unitDetails?.Occupied} handleChange={handleChange}/>
                </div>
                </div>
              </CardHeader>

              <CardBody>
                <GridContainer>
                <GridItem xs={12} sm={12} md={2}>
                    <InputLabel>Unit </InputLabel>
                    <CustomInput
                      id="unit"
                      handleChange={handleChange}
                      value={unitDetails?.unit}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                      inputProps={{}}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputLabel>Rent</InputLabel>
                    <CustomInput
                      // labelText="Company Name"
                      id="rent"
                      handleChange={handleChange}
                      value={unitDetails?.rent}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                      inputProps={{}}
                    />
                  </GridItem>
                  
                  <GridItem xs={12} sm={12} md={2}>
                    <InputLabel>Sqft</InputLabel>
                    <CustomInput
                      id="sqft"
                      handleChange={handleChange}
                      value={unitDetails?.sqft}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                    />
                  </GridItem>

                  {isCommercial ? null :   
                  <GridItem xs={12} sm={12} md={4}>
                    <InputLabel>Bedrooms</InputLabel>
                    <CustomInput
                      id="bedroom"
                      handleChange={handleChange}
                      value={unitDetails?.bedroom}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                      inputProps={{}}
                    />
                  </GridItem>
                  }
                <GridItem xs={12} sm={12} md={12}>
                  <h5>Included</h5>
                  <div style={{display:"flex"}}>
                    <CheckBox color="purple" label="Hydro" initalState={unitDetails?.tmi?.Hydro} handleChange={handleChange}/>
                    <CheckBox color="purple" label="Gas" initalState={unitDetails?.tmi?.Gas} handleChange={handleChange}/>
                    <CheckBox color="purple" label="Water" initalState={unitDetails?.tmi?.Water} handleChange={handleChange}/>
                    {isCommercial ? <CheckBox color="purple" label="Taxes" initalState={unitDetails?.tmi?.Taxes} handleChange={handleChange}/> : null}
                  </div>
                </GridItem>


                
                  
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>
                      Notes:
                    </InputLabel>
                    <CustomInput
                      id="notes"
                      handleChange={handleChange}
                      value={unitDetails?.notes}
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
                <Button color="primary" onClick={handleSubmit} >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
