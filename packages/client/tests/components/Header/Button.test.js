import React from 'react';
import api from '../../../helper/api';
import Button from '../../../app/components/Button';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const snapshot = renderer
    .create(<Button />)
    .toJSON();
  expect(snapshot).toMatchSnapshot();
});