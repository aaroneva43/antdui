import React, { Component } from 'react'
import { propTypes as reduxFormPropTypes, reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


import compose from 'recompose/compose'

import { Card, Button, Form } from 'antd'

import Input from './utils/antd-redux-form'

import {
  Router,
  Route,
  Link
} from 'react-router-dom'

import { userLogin as userLoginAction } from './actions'

import Input from './utils/antd-redux-form'


const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: 200,
    border: 0
  },
  avatar: {
    margin: '2em 1em',
    textAlign: 'left ',
  },
  input: {
    display: 'flex',
    height: 68
  },
  hint: {
    textAlign: 'center',
    marginTop: '1em',
    color: '#ccc',
  },
}

// const renderInput = (field) => {

//   return (

//     <div className="input-row">
//       <input {...field.input} type="text" value={field.value} />
//       {field.meta.touched && field.meta.error &&
//         <span className="error">{field.meta.error}</span>}
//     </div>

//   )
// }

const renderInput = ({ meta: { touched, error }, input, ...props }) => {

  return (
    <Input
      label={props.label}
      helperText={touched && error}
      {...input}
      fullWidth
    />
  )
}

let SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props


  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="First Name"
        name="firstName"
        component={Input}
        placeholder="First Name"
        hasFeedback
      />

    </Form>
  )
}

const enhance = compose(
  reduxForm({
    form: 'login',
    validate: (values, props) => {

      const errors = {}
      if (!values.username) errors.username = 'required'
      if (!values.password) errors.password = 'required'
      return errors
    }
  }),
  connect(null, { userLogin: userLoginAction })
)

export default enhance(Login)
