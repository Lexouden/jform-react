import React from 'react';
import Jform from '../../../';
import { FormFrame } from '../../test-utils';
import { render } from 'enzyme';

describe('ColorWidget', () => {
  it('should render a form with a type color widget', () => {
    const schema = {
      title: 'A schema',
      properties: {
        color: {
          type: 'string',
          widget: 'color',
        },
      },
    };

    const Component = (
      <FormFrame>
        <Jform schema={schema} />
      </FormFrame>
    );

    const wrapper = render(Component);
    expect(wrapper.find('input[type=color]').length).toEqual(1);
  });

  it('required gives the input the required attribute', () => {
    const schema = {
      title: 'A schema',
      properties: {
        field: {
          type: 'string',
          widget: 'color',
        },
      },
      required: ['field'],
    };

    const Component = (
      <FormFrame>
        <Jform schema={schema} />
      </FormFrame>
    );

    const wrapper = render(Component);

    expect(wrapper.find('input[required]').length).toEqual(1);
  });
});
