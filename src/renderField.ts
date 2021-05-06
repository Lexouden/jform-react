import React from 'react';
import deepmerge from 'deepmerge';

const guessWidget = (fieldSchema: any, theme) => {
  if (fieldSchema.widget) {
    return fieldSchema.widget;
  } else if ('enum' in fieldSchema) {
    return 'choice';
  } else if ('oneOf' in fieldSchema) {
    return 'oneOf';
  } else if (theme[fieldSchema.format]) {
    return fieldSchema.format;
  }

  return fieldSchema.type || 'object';
};

const renderField = (
  fieldSchema,
  fieldName,
  theme,
  prefix = '',
  context = {},
  required = false
) => {
  if ('allOf' in fieldSchema) {
    fieldSchema = { ...fieldSchema, ...deepmerge.all(fieldSchema.allOf) };
    delete fieldSchema.allOf;
  }

  const widget = guessWidget(fieldSchema, theme);

  if (!theme[widget]) {
    throw new Error(`jform: ${widget} is not defined in the theme`);
  }

  const prefixedFieldName = prefix ? prefix + fieldName : fieldName;

  return React.createElement(theme[widget], {
    key: fieldName,
    fieldName: widget === 'oneOf' ? fieldName : prefixedFieldName,
    label: fieldSchema.showLabel === false ? '' : fieldSchema.title || fieldName,
    required: required,
    schema: fieldSchema,
    theme,
    context,
    prefix,
  });
};

export default renderField;
