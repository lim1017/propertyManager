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
import Dropdown from "../Dropdown/Dropdown";
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
  unit,
  setIssusesModal,
  issuesModal,
  propertyID
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

  const [issues, setIssues] = useState({});
  const [issueDetail, setIssueDetail] = useState({});

  useEffect(() => {}, []);

  const handleClose = () => {
    setIssusesModal(false);
    setIssues({});
  };

  const handleChange = (e, id) => {
    setIssueDetail({ ...issueDetail, [id]: e.target.value });
  };

  const handleSubmit = async () => {
    await propertyAPI.patch(`/unit/editissues/${unit.unit_id}`, issueDetail);
    fetchUnits(propertyID)
    handleClose();
  };

  const handleDelete = async () => {
    await propertyAPI.delete(`/tenant/${issues.tenant_id}`);
    fetchTenants();
    handleClose();
  };

  console.log(unit);
  console.log(issues);
  console.log(issueDetail);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={issuesModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={issuesModal}>
          <div className={classes.paper}>
            <Card>
              <CardHeader color="primary">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className={classes.cardTitleWhite}>Add Issue</h4>
                  <div style={{ display: "flex" }}></div>
                </div>
              </CardHeader>

              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel>Issue </InputLabel>
                    <CustomInput
                      id="name"
                      handleChange={handleChange}
                      value={issueDetail?.name}
                      formControlProps={{
                        fullWidth: true,
                        style: { marginTop: 0 },
                      }}
                      inputProps={{}}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Dropdown
                      data={[{ name: "Pending" }, { name: "Complete" }]}
                      label="Status"
                      value={issueDetail.status}
                      handleChg={handleChange}
                      id="status"
                      style={{paddingLeft:"80px"}}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>Notes:</InputLabel>
                    <CustomInput
                      id="notes"
                      handleChange={handleChange}
                      value={issueDetail?.notes}
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
                  Save
                </Button>
              </CardFooter>
            </Card>
            <GridContainer >
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                <CardHeader color="primary">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 className={classes.cardTitleWhite}>Issues</h4>
                  <div style={{ display: "flex" }}></div>
                </div>
              </CardHeader>
              <CardBody>
                {unit.issues.map(issue =>{
                  return(
                    <div>{issue.name}</div>
                  )
                })}
              </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
