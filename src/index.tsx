import React from 'react';
import PropTypes from 'prop-types'
import renderField from "./renderField";
import renderFields from "./renderFields";
import compileSchema from "./compileSchema";
import buildSyncValidation, { setError } from "./buildSyncValidation";
import { Form } from 'react-final-form';

const JForm = (props) => {
  let { schema, handleSubmit, initialValues, theme, context, ajv, syncValidation } = props;
  schema.showLabel = false;
  schema = compileSchema(schema);
  const formName = props.formKey || props.schema.title || "form";

  return (
    <Form onSubmit={handleSubmit}
      form={formName}
      validate={syncValidation || buildSyncValidation(schema, ajv)}
      initialValues={initialValues}
      renderFields={renderField.bind(this)}
      context={{...props.context, formName}}
      schema={schema}>
      {({handleSubmit, error, submitting}) => (
        <form onSubmit={handleSubmit}>
          {renderField(schema, null, theme, "", context)}
          <div>{error && <strong>{error}</strong>}</div>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            Submit
          </button>
        </form>
      )}
    </Form>
  )
}

JForm.propTypes = {
  schema: PropTypes.object,
  theme: PropTypes.any,
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  syncValidation: PropTypes.func,
  formKey: PropTypes.string,
  context: PropTypes.object,
  ajv: PropTypes.object
};

export default JForm;

export {
  renderFields,
  renderField,
  setError,
  buildSyncValidation,
  compileSchema,
}