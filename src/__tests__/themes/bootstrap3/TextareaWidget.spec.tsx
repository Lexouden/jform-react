import React from 'react';
import Jform from '../../../';
import { FormFrame } from '../../test-utils';
import { render } from 'enzyme';

describe('TextareaWidget', () => {
  it('should render a form with a textarea widget', () => {
    const schema = {
      title: 'A schema',
      properties: {
        field: {
          type: 'string',
          widget: 'textarea',
        },
      },
    };

    const Component = (
      <FormFrame>
        <Jform schema={schema} />
      </FormFrame>
    );

    const wrapper = render(Component);

    expect(wrapper.find('textarea').length).toEqual(1);
    expect(wrapper.find('textarea').prop('id')).toEqual('field-field');
    expect(wrapper.find('label').prop('for')).toEqual('field-field');
  });
});
