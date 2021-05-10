import React from 'react';
import { extractDateToken } from '../../../themes/bootstrap3/CompatibleDateWidget';
import Jform from '../../../';
import { FormFrame } from '../../test-utils';
import { render } from 'enzyme';

describe('CompatibleDateWidget', () => {
  it('on null extracted value is empty', () => {
    expect(extractDateToken(null)).toBe('');
  });
  it('on invalid format extracted value is empty', () => {
    expect(extractDateToken('lala-land')).toBe('');
  });
  it('can extract month', () => {
    expect(extractDateToken('1967-04-03', 1)).toBe('04');
  });

  it('should render a form', () => {
    const schema = {
      title: 'A schema',
      properties: {
        date: {
          type: 'string',
          widget: 'compatible-date',
        },
      },
    };

    const Component = (
      <FormFrame>
        <Jform schema={schema} />
      </FormFrame>
    );
    const wrapper = render(Component);
    expect(wrapper.find('select').length).toEqual(3);
  });
});
