import React, { Children } from "react";
import PropTypes from 'prop-types'
import { FormSpy } from "react-final-form";

const FormFrame = props => {
  return <FormSpy>{Children.only(props.children)}</FormSpy>;
};

FormFrame.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
}

export { FormFrame };