import * as React from 'react';
import Nav from '../Nav';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { IconButton, Typography } from '@material-ui/core';
import { mount } from 'enzyme';

let wrapped;

beforeEach(() => {
  wrapped = mount(<Router><Nav /></Router>);
});

describe('<Nav/> rendering', () => {
  it('contains an IconButton', () => {
    expect(wrapped.find(IconButton)).toHaveLength(1);
  });

  it('contains Typography with Music Player text', () => {
    expect(wrapped.find(Typography)).toHaveLength(3);
    expect(wrapped.text()).toContain('Music Player');
  });

  it('contains 2 Nav Links', () => {
    expect(wrapped.find(Link)).toHaveLength(2);
  });
});

// describe('<Nav/> interactions', () => {
//   fit('navigates to the home page', () => {
//     console.log(wrapped.find(Link).first().props());
//     wrapped.find(Link).first().simulate('click');
//     // expect(wrapped.find(Link).first().props())
//   });
// });
