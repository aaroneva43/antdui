import React from "react"
import { Field, reduxForm } from "redux-form"
import { Form, Input, Radio, Select, Checkbox, Button } from "antd"
import { connect } from 'react-redux'
import compose from 'recompose/compose'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { Option } = Select
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 6
    }
  }
}

const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
  const hasError = meta.touched && meta.invalid
  return (
    <FormItem
      {...formItemLayout}
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} children={children} value={input.value || ''} />
    </FormItem>
  )
}

const AInput = makeField(Input)
const ARadioGroup = makeField(RadioGroup)
const ASelect = makeField(Select)
const ACheckbox = makeField(Checkbox)
const ATextarea = makeField(TextArea)

let SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props


  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="First Name"
        name="firstName"
        component={AInput}
        placeholder="First Name"
        hasFeedback
      />

      <Field
        label="Last Name"
        name="lastName"
        component={AInput}
        placeholder="Last Name"
      />

      <Field
        label="Email"
        name="email"
        component={AInput}
        type="email"
        placeholder="Email"
      />

      <Field label="Sex" name="sex" component={ARadioGroup} value="male">
        <Radio value="male"> Male</Radio>
        <Radio value="female">Female</Radio>
      </Field>

      <Field label="Favoraite Color" name="favoriteColor" component={ASelect}>
        <Option value="ff0000">Red</Option>
        <Option value="00ff00">Green</Option>
        <Option value="0000ff">Blue</Option>
      </Field>

      <Field
        label="Employed"
        name="employed"
        id="employed"
        component={ACheckbox}
        type="checkbox"
      />

      <Field label="Notes" name="notes" component={ATextarea} />

      <FormItem {...tailFormItemLayout}>
        <Button
          type="primary"
          disabled={pristine || submitting}
          htmlType="submit"
          style={{ marginRight: "10px" }}
        >
          Submit
        </Button>

        <Button disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
        <Button disabled={pristine || submitting} onClick={() => { props.dispatch({ type: 'LOAD', payload: { firstName: 'bbbb' } }) }}>
          Load
        </Button>
      </FormItem>
    </Form>
  )
}

const enhance = compose(
  connect(
    state => ({
      initialValues: state.user
    })
  ),
  reduxForm({
    form: 'simple',
    validate: (values, props) => {

      const errors = {}
      if (!values.firstName) errors.firstName = 'required'
      if (!values.lastName) errors.lastName = 'required'
      return errors
    }
  })

)

export default enhance(SimpleForm)