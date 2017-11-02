import React, { Component } from 'react'
import { propTypes as reduxFormPropTypes, reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


import compose from 'recompose/compose'

import { Card, Button, Form } from 'antd'






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
    minWidth: 300,
    border: 0
  },
  avatar: {
    margin: '2em 1em',
    textAlign: 'left ',
  },
  form: {
    padding: '0 1em 1em 1em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'stretch'
  },
  input: {
    display: 'flex',
    height: 68,
    borderRadius: 0
  },
  hint: {
    textAlign: 'center',
    marginTop: '1em',
    color: '#ccc',
  },
  button: {
    // marginTop: 32,
    height: 32,
    // position: 'relative',
    // bottom: 32,
    // height: 32,
    // borderRadius: 0,
    // borderLeft: 0
  }
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


class Login extends Component {

  static PropTypes = {
    ...reduxFormPropTypes,
    theme: PropTypes.object.isRequired,
    previousRoute: PropTypes.string,
    // translate: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired
  }

  login = ({ username, password }) => {
    const { userLogin, location } = this.props;
    userLogin({ username, password }, location.state ? location.state.nextPathname : '/');
  }

  render() {
    const { handleSubmit, submitting, theme, translate } = this.props;

    return (
      <div style={{ ...styles.main, backgroundColor: "#fff" }}>
        <Card style={styles.card} >
          <div style={styles.avatar}>
            <span style={{ fontWeight: 'bold', color: '#555', fontSize: 20 }}>Forti</span>
            <span style={{ fontWeight: 'bold', color: 'darkgreen', fontSize: 20 }}>SDWAN </span>
            <span style={{ fontWeight: 'normal', color: '#333', fontSize: 14 }}>v0.0.1 </span>
          </div>
          <form onSubmit={handleSubmit(this.login)}>
            <div style={styles.form}>
              <div style={styles.input} >
                <Field
                  name="username"
                  component={Input}
                  placeholder={'username'}
                />
              </div>
              <div style={styles.input}>
                <Field
                  name="password"
                  component={Input}
                  placeholder={'password'}
                  type="password"
                />
              </div>
              <Button style={styles.button} htmlType="submit" disabled={submitting} children={'Sign In'} />
            </div>

          </form>
        </Card>
      </div>

    )
  }
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
