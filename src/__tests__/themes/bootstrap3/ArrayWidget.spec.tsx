import React from 'react';
import Liform from '../../../';
import { FormFrame } from '../../test-utils';
import { mount } from 'enzyme';

describe('ArrayWidget', () => {
  it('should render a form with children', () => {
    const schema = {
      title: 'A Schema',
      properties: {
        tasks: {
          type: 'array',
          title: 'A list of objects',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                title: 'Name of the Task',
              },
              dueTo: {
                type: 'string',
                title: 'Due To',
                widget: 'datetime',
                format: 'date-time',
              },
            },
          },
        },
      },
    };

    const Component = (
      <FormFrame>
        <Liform schema={schema} />
      </FormFrame>
    );

    const wrapper = mount(Component);

    expect(wrapper.find('.btn')).toHaveLength(2);
  });
});
