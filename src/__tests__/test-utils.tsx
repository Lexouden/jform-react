import React, { Children } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";
import PropTypes from "prop-types";

const makeStore = () => createStore(combineReducers({ form: formReducer }));

const FormFrame = props => {
  const store = makeStore();
  return <Provider store={store}>{Children.only(props.children)}</Provider>;
};

FormFrame.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export { FormFrame };