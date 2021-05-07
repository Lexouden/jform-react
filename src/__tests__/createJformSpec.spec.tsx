import React from 'react';
import Jform, { DefaultTheme } from '../';
import { render } from 'enzyme';

import { FormFrame } from './test-utils';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

describe('createJForm', () => {
  const schema = {
    title: 'A schema',
    properties: {
      name: {
        type: 'string',
      },
    },
  };

  it('should render a form', () => {
    const Component = (
      <FormFrame>
        <Jform schema={schema} />
      </FormFrame>
    );
    const wrapper = render(Component);
    expect(wrapper.find('input').length).toEqual(1);
  });

  it('can pass a context', () => {
    const CustomString = (field) => {
      const { fun } = field.context;
      fun();
      return <input {...field.input} className="form-control" type="email" />;
    };
    const CustomWidget = (props) => {
      return <Field component={CustomString} name={props.fieldName} context={props.context} />;
    };
    CustomWidget.propTypes = {
      fieldName: PropTypes.string,
      context: PropTypes.any,
    };

    const myTheme = { ...DefaultTheme, string: CustomWidget };

    const fun = jest.fn();

    const Component = (
      <FormFrame>
        <Jform schema={schema} context={{ fun }} theme={myTheme} />
      </FormFrame>
    );
    const wrapper = render(Component);
    expect(fun).toHaveBeenCalled();
    expect(wrapper.find('input').length).toEqual(1);
  });
});
