import React from 'react'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import {countOccupiedUnits, totalUnitsRent} from "../../helperFunctions"


export default function PropertySummaryCard({state, propertyDetails}) {
  
  const occupiedUnits = countOccupiedUnits(state.units)
  
  return (
    <Card profile>
    <CardHeader>Summary</CardHeader>
     <CardBody profile>
        <h5>Occupancy: {occupiedUnits?.length}/{state?.units?.length}</h5>
        <h5>Total Rent: {totalUnitsRent(occupiedUnits)}/{totalUnitsRent(state.units)}</h5>
     </CardBody>
   </Card>
  )
}
