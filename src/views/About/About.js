import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import {Link} from 'react-router-dom'


import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

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

export default function About() {
  const classes = useStyles();

  return (
    <div>
      <GridContainer style={{display:"flex", justifyContent:"center"}}>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>About</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>

            <CardBody>
              <div style={{fontSize:"20px", lineHeight:"1.6"}}>
              Property Manger is a Full Stack web application developed with:
              <div>
                Front-end: JavaScript, React Hooks, React Context for state management, Material-UI, Bootstrap               
              </div>
              <div>
                Back-end: NodeJS, Express, PostgresSQL
              </div>

              <div style={{marginTop:"3em"}}>
                As a manager of couple small rental properties, I designed this application to suit my needs.
                It is far from complete, as you can see from my <Link to={{pathname:"/admin/todo"}}>To Do list </Link> 
                This is a v0.1 release just to get it out there.
              </div>

              </div>

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
