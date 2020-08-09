import React from 'react'

export const PropertyDetails = (props) => {

  console.log(props)

  const {title, img, description} = props.location.state.state
  return (
    <div>
      PropertyDetails
      name:{title}
    </div>
  )
}
