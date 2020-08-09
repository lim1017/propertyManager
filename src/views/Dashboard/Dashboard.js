import React, {useContext} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import appDataContext from "../../hooks/useContext"
import { SET_DATA, } from "../../hooks/reducers/appDataReducer"
import BasicCardPicture from "../../components/Card/BasicCardPicture"



import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {


  const { state, dispatch } = useContext(appDataContext);

  const handleClick= ()=>{
    dispatch({type: SET_DATA, number:22, letter:"abc"})
  }

const buildings = [ 
  {name:'Home', img: "https://www.newstreet.ca/property-images/E4185556-1.jpeg"},
  {name:'Condo', img: "https://shared-s3.property.ca/public/images/archive_listings/c4612065/c4612065_1.jpg"},
  {name:'Hamilton', img: "https://photos.zolo.ca/2-229-bay-street-south-hamilton-h4069563-largephoto-1-processed-orig.jpg?2019-12-21+21%3A55%3A25"},
  {name:'Whitby', img: "https://www.durhamradionews.com/wp-content/uploads/BROCK-STREET-BUILDING-CAVE-IN-WALL-WHITBY-DOWNTOWN.jpg"},

 ]

  const classes = useStyles();
  return (
    <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around"}}>

    {buildings.map(building=>{
      return (
        <div style={{marginBottom:10}}> 
          <BasicCardPicture title={building.name} img={building.img} />
        </div>
      )
    })}


    </div>
  );
}
