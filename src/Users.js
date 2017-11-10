import React from "react"
import { Field, reduxForm } from "redux-form"
import { connect } from 'react-redux'
import compose from 'recompose/compose'



let Users = props => {
  const { handleSubmit, pristine, reset, submitting } = props


  return (
    <div>Users</div>
  )
}

const enhance = compose(
  connect(
    state => ({
      initialValues: state.user
    })
  )

)

export default enhance(Users)