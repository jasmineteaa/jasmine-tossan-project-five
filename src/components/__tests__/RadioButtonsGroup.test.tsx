import * as React from 'react';
import { mount } from 'enzyme';
import RadioButtonsGroup from '../RadioButtonsGroup';
import { radioOptions } from '../Home';
import { FormLabel, Radio } from '@material-ui/core';

let wrapped;

const label = 'select a country';

function createTestProps(props?: Object) {
  return {
    radioOptions,
    label,
    ...props
  }
}

beforeEach(() => {
  const props = createTestProps();
  wrapped = mount(<RadioButtonsGroup {...props} />);
});

afterEach(() => {
  wrapped.unmount();
});

describe('<RadioButtonsGroup/> rendering', () => {
  it('should render one label per radio group', () => {
    expect(wrapped.find(FormLabel)).toHaveLength(1);
  });

  it('should render the correct label text', () => {
    expect(wrapped.find(FormLabel).text()).toContain(label);
  });

  it('should render the correct number of radio options', () => {
    expect(wrapped.find(Radio)).toHaveLength(radioOptions.length);
  });
});