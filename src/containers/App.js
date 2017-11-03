import React, { Component } from 'react'
import { propTypes as reduxFormPropTypes, reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


import compose from 'recompose/compose'

import { Card, Button, Form } from 'antd'

import { Link } from 'react-router-dom'

import * as auth from '../actions/auth'

import Input from '../utils/antd-redux-form'


class App extends Component {

    static PropTypes = {
    }

    componentDidMount() {

        const { checkAuth, dispatch } = this.props

        alert('auth!')

    }



    render() {
        debugger
        const { handleSubmit, submitting, theme, translate } = this.props;

        return (
            <div>
                App
            </div>

        )
    }
}

const enhance = compose(
    // connect to store
    connect((states) => {
        return {
            auth: states.auth || {}
        }
    }, { login: auth.login, checkAuth: auth.check })
)

export default enhance(App)
