import React from 'react';
import api from '../../../helper/api';
import Bezier from '../../../app/components/Bezier';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const snapshot = renderer
    .create(<Bezier />)
    .toJSON();
  expect(snapshot).toMatchSnapshot();
});