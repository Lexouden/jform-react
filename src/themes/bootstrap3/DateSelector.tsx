import React from 'react';
import PropTypes from 'prop-types';

const DateSelector = (props) => {
  return (
    <select
      value={props.extractField(props.input.value)}
      onBlur={props.onBlur}
      onChange={props.onChange}
      className="form-control"
      id={'props-' + props.name}
      required={props.required}>
      {!props.required && (
        <option key={''} value={''}>
          {props.emptyOption}
        </option>
      )}
      {props.range.map((idx) => {
        return (
          <option key={idx} value={idx}>
            {idx}
          </option>
        );
      })}
    </select>
  );
};

DateSelector.propTypes = {
  input: PropTypes.object,
  extractField: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  name: PropTypes.string,
  required: PropTypes.bool,
  emptyOption: PropTypes.string,
  range: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]),
};

export default DateSelector;
