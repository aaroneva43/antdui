import React, { Component } from 'react'
import { propTypes as reduxFormPropTypes, reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


import compose from 'recompose/compose'

import { Card, Button, Form } from 'antd'

import * as ant from 'antd'

import _ from 'lodash'

import style from './Login.css'

import {
  Router,
  Route,
  Link
} from 'react-router-dom'

import { login } from './actions'

import antdFields from './utils/antd-redux-form'
const Input = antdFields.Input
const Select = antdFields.Select
const Option = antdFields.Option

const AntSelect = ant.Select
const AntOption = AntSelect.Option


class Foo extends Component {

  static PropTypes = {
  }

  submit = ({ username, password }) => {

  }

  render() {
    const { handleSubmit, submitting, theme, translate } = this.props;

    return (
      <div style={{ backgroundColor: "#fff" }}>
        <Card >

          <form onSubmit={handleSubmit(this.submit)}>
            <div >
              <div >
                <Field
                  name="username"
                  component={Input}
                  placeholder={'username'}
                  autoFocus={true}
                />
              </div>
              <Button style={{}} htmlType="submit" disabled={submitting} children={'Sign In'} />
            </div>

          </form>
        </Card>
      </div>

    )
  }
}

const enhance = compose(
  // decorate with redux-form
  reduxForm({
    form: 'f1',
    validate: (values, props) => {

      const errors = {}
      if (!values.username) errors.username = 'required'
      if (!values.password) errors.password = 'required'
      return errors
    }
  })
)

export default enhance(Foo)
