import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import merge from 'deepmerge';
import { set as _set } from 'lodash';

interface JSchema {
  type?: string;
  items?: Array<JSchema>;
  allOf?: Array<JSchema>;
  oneOf?: Array<JSchema>;
  properties?: object;
  requires?: Array<string>;
}

const setError = (error, schema: JSchema) => {
  let instance = error.instancePath.split('/').slice(1);
  if (!instance.length) instance.push(error.params.missingProperty);

  const type = findTypeInSchema(schema, instance);

  let errorToSet;
  if (type === 'array' || type === 'allOf' || type === 'oneOf') {
    errorToSet = { _error: error.message };
  } else {
    errorToSet = error.message;
  }

  let errors = {};
  _set(errors, instance, errorToSet);
  return errors;
};

const findTypeInSchema = (schema: JSchema, dataPath: Array<string>) => {
  if (!schema) {
    return;
  } else if (dataPath.length === 0 && 'type' in schema) {
    return schema.type;
  } else {
    if (schema.type === 'array') {
      return findTypeInSchema(schema.items as JSchema, dataPath.slice(1));
    } else if ('allOf' in schema) {
      if (dataPath.length === 0) return 'allOf';
      schema = { ...schema, ...merge.all(schema.allOf) };
      delete schema.allOf;
      return findTypeInSchema(schema, dataPath);
    } else if ('oneOf' in schema) {
      if (dataPath.length === 0) return 'oneOf';
      schema.oneOf.forEach((item) => {
        let type: string = findTypeInSchema(item, dataPath);
        if (type) {
          return type;
        }
      });
    } else {
      return findTypeInSchema(schema.properties[dataPath[0]], dataPath.slice(1));
    }
  }
};

const buildSyncValidation = (schema: JSchema, ajvParam = null) => {
  let ajv = ajvParam;
  if (ajv === null) {
    ajv = new Ajv({
      allErrors: true,
      strict: false,
    });

    addFormats(ajv);
  }
  return (values) => {
    const valid = ajv.validate(schema, values);
    if (valid) {
      return {};
    }

    let errors = ajv.errors.map((error) => {
      return setError(error, schema);
    });

    // Need minimum of 2 entries to merge
    errors.push({});
    errors.push({});

    return merge.all(errors);
  };
};

export default buildSyncValidation;

export { setError };
