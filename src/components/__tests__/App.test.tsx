import * as React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';


// failed Provider
// test nav routes here 
// render home page on click
// render playlist page on click
// https://medium.com/@antonybudianto/react-router-testing-with-jest-and-enzyme-17294fefd303
xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
