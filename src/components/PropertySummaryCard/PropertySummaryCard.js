import React from 'react'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import {countOccupiedUnits, totalUnitsRent} from "../../helperFunctions"
import PieChart from 'components/PieChart/PieChart';


export default function PropertySummaryCard({state, propertyDetails}) {
  
  const occupiedUnits = countOccupiedUnits(state.units)
  const collectedRent = totalUnitsRent(occupiedUnits)
  const totalPossibleRent = totalUnitsRent(state.units)
  
  return (
    <Card profile>
    <CardHeader>Summary</CardHeader>
     <CardBody profile>
        <h5>Occupancy: {occupiedUnits?.length}/{state?.units?.length}</h5>
        <h5>Total Rent: {collectedRent}/{totalPossibleRent}</h5>
        <PieChart collectedRent={collectedRent} totalPossibleRent={totalPossibleRent} />
     </CardBody>
   </Card>
  )
}
