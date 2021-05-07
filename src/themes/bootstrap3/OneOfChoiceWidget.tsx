import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Field } from "redux-form";
import { connect } from "react-redux";
import renderField from "../../renderField";
import { map as _map} from "lodash";

class OneOfChoiceWidget extends Component {
  public props;
  public state;
  public static propTypes;

  constructor(props) {
    super(props);
    this.state = {
      choice: 0
    };
    this.renderOption = this.renderOption.bind(this);
  }

  render() {
    const field = this.props;
    const className = classNames(["form-group"]);
    const schema = field.schema;
    const options = schema.oneOf;

    return (
      <div className={className}>
        <label className="control-label" htmlFor={"field-" + field.fieldName}>
          {schema.title}
        </label>
        <Field
          name={field.fieldName}
          component="select"
          className="form-control"
          id={"field-" + field.fieldName}
          required={field.required}
          multiple={false}
        >
          {_map(options, (item, idx) => {
            return (
              <option key={options.indexOf(item)} value={idx}>
                {item.title || idx}
              </option>
            );
          })}
        </Field>
        <div>{this.renderOption()}</div>
        {field.description && (
          <span className="help-block">{field.description}</span>
        )}
      </div>
    );
  }

  renderOption() {
    const field = this.props;
    const schema = field.schema.oneOf[this.state.choice];
    return renderField(
      schema,
      field.fieldName,
      field.theme,
      field.prefix,
      field.context
    );
  }
}

OneOfChoiceWidget.propTypes = {
  schema: PropTypes.object.isRequired,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.object,
  multiple: PropTypes.bool,
  required: PropTypes.bool,
  prefix: PropTypes.string,
  formName: PropTypes.string,
  context: PropTypes.any,
  dispatch: PropTypes.func,
  description: PropTypes.string
};

export default connect()(OneOfChoiceWidget);