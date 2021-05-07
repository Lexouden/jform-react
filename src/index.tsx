import React from 'react';
import PropTypes from 'prop-types';
import renderField from './renderField';
import renderFields from './renderFields';
import compileSchema from './compileSchema';
import DefaultTheme from './themes/bootstrap3';
import buildSyncValidation, { setError } from './buildSyncValidation';
import { reduxForm } from 'redux-form';

const BaseForm = (props) => {
  const { schema, handleSubmit, theme, error, submitting, context } = props;
  return (
    <form onSubmit={handleSubmit}>
      {renderField(schema, null, theme || DefaultTheme, '', context)}
      <div>{error && <strong>{error}</strong>}</div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        Submit
      </button>
    </form>
  );
};

BaseForm.propTypes = {
  schema: PropTypes.object,
  handleSubmit: PropTypes.func,
  theme: PropTypes.object,
  error: PropTypes.any,
  submitting: PropTypes.bool,
  context: PropTypes.object,
};

const Jform = (props) => {
  props.schema.showLabel = false;
  const schema = compileSchema(props.schema);
  const formName = props.formKey || props.schema.title || 'form';
  const FinalForm = reduxForm({
    form: props.formKey || props.schema.title || 'form',
    validate: props.syncValidation || buildSyncValidation(schema, props.ajv),
    initialValues: props.initialValues,
    context: { ...props.context, formName },
  })(props.baseForm || BaseForm);
  return <FinalForm renderFields={renderField.bind(this)} {...props} schema={schema} />;
};

Jform.propTypes = {
  schema: PropTypes.object,
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  syncValidation: PropTypes.func,
  formKey: PropTypes.string,
  baseForm: PropTypes.func,
  context: PropTypes.object,
  theme: PropTypes.object,
  ajv: PropTypes.object,
};

export default Jform;

export { renderFields, renderField, setError, buildSyncValidation, DefaultTheme, compileSchema };
