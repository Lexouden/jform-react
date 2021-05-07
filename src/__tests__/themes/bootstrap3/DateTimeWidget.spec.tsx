import React from 'react';
import Jform from '../../../';
import { FormFrame } from '../../test-utils';
import { render } from 'enzyme';

describe('DateTimeWidget', () => {
  it('should render a form with a type datetime widget', () => {
    const schema = {
      title: 'A schema',
      properties: {
        datetime: {
          type: 'string',
          widget: 'datetime',
        },
      },
    };

    const Component = (
      <FormFrame>
        <Jform schema={schema} />
      </FormFrame>
    );

    const wrapper = render(Component);

    expect(wrapper.find('input[type=datetime-local]').length).toEqual(1);
  });

  it('required gives the input the required attribute', () => {
    const schema = {
      title: 'A schema',
      properties: {
        field: {
          type: 'string',
          widget: 'datetime',
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
