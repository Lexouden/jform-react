import { isEmpty as _isEmpty } from 'lodash'; // added for empty check

const convertToReduxFormErrors = (obj) => {
  let objectWithoutChildrenAndFalseErrors = {};
  Object.keys(obj).map((name) => {
    if (name === 'children') {
      objectWithoutChildrenAndFalseErrors = {
        ...objectWithoutChildrenAndFalseErrors,
        ...convertToReduxFormErrors(obj[name]),
      };
    } else {
      if ('children' in obj[name]) {
        // if children, take field from it and set them directly as own field
        objectWithoutChildrenAndFalseErrors[name] = convertToReduxFormErrors(obj[name]);
      } else {
        if ('errors' in obj[name] && !_isEmpty(obj[name]['errors'])) {
          // using lodash for empty error check, dont add them if empty
          objectWithoutChildrenAndFalseErrors[name] = obj[name]['errors'];
        }
      }
    }
    return null;
  });
  return objectWithoutChildrenAndFalseErrors;
};

const processSubmitErrors = (errors) => {
  if ('errors' in errors) {
    errors = convertToReduxFormErrors(errors.errors);
    return errors;
  }
};

export default processSubmitErrors;
