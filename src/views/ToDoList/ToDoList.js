import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CheckBox from "../../components/CheckBox/CheckBox"

import {
  SET_TODO,
} from "../../hooks/reducers/appDataReducer";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }, done:{
    textDecoration: "line-through"
  }
};

const useStyles = makeStyles(styles);


const toDoItems=[
  {name:"Implement login for mutiple users", status:false},
  {name:"Implement form validation/error handling", status:false},
  {name:"Better stats/analytics for properties", status:false},
  {name:"Helpful resources", status:false},
  {name:"Implement a data table for tenants.  Would scale better for larger groups of tenants, allowing for search/sort etc of tenants", status:false},
  {name:"Create/Show ERD", status:false},
  {name:"Add indication of outstanding issues in list of properties", status:false},
  {name:"Add ability to delete properties/companies/users", status:false},

]

export default function ToDo() {
  const classes = useStyles();


  const [toDoList, setToDoList] = useState(toDoItems)

  return (
    <div >
 <GridContainer style={{display:"flex", justifyContent:"center"}}>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>To Do List</h4>
              <p className={classes.cardCategoryWhite}>In no particular order</p>
            </CardHeader>

            <CardBody>
              <ul>
              {toDoList.map(items=>{
                return (
                  // <div style={{display:"flex", justifyContent:"space-between"}}>
                    <li
                     className={items.status ? classes.done: null}
                     style={{lineHeight:"1.6", fontSize:"20px"}}>
                    {items.name}
                    </li>
              
                  // </div>
                )
              })}
              </ul>
            </CardBody>
            
    </Card>
    </GridItem>
    </GridContainer>          
    </div>
  )
}
