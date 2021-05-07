import React from 'react';
import Jform from '../../../';
import { FormFrame } from '../../test-utils';
import { render } from 'enzyme';

describe('ChoiceWidget', () => {
  it('should render a form with a select', () => {
    const schema = {
      title: 'A schema',
      properties: {
        choice: {
          type: 'string',
          enum: ['foo', 'bar'],
        },
      },
    };

    const Component = (
      <FormFrame>
        <Jform schema={schema} />
      </FormFrame>
    );

    const wrapper = render(Component);
    expect(wrapper.find('select').length).toEqual(1);
    expect(wrapper.find('option').length).toEqual(3);
  });

  it('required renders no extra field', () => {
    const schema = {
      title: 'A schema',
      properties: {
        choice: {
          type: 'string',
          enum: ['foo', 'bar'],
        },
      },
      required: ['choice'],
    };

    const Component = (
      <FormFrame>
        <Jform schema={schema} />
      </FormFrame>
    );

    const wrapper = render(Component);
    expect(wrapper.find('select').length).toEqual(1);
    expect(wrapper.find('option').length).toEqual(2);
  });
});
