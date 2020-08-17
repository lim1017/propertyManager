import React from 'react'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";



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

export default function PropertyManagerInfo({manager}) {

  const { firstName, lastname, personalEmail, phone1, title } = manager

  const classes = useStyles();

  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
            Property Manger Info:
          </h4>
        </CardHeader>

        <CardBody>
          {firstName}
         

        </CardBody>
      </Card>

    </div>
  )
}
