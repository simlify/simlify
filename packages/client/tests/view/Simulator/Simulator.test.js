import React from 'react';
import api from '../../../helper/api';
import Simulator from '../../../app/view/Simulator';
import renderer from 'react-test-renderer';

jest.mock('../../../helper/api');

it('renders correctly', () => {
  api.getFlows.mockResolvedValue({});
  api.getAvailableNodes.mockResolvedValue({});

  const snapshot = renderer
    .create(<Simulator />)
    .toJSON();
  expect(snapshot).toMatchSnapshot();
});