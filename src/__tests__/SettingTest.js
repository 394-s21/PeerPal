import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Settings from '../screens/Settings';

test('Setting Page Renders Correctly', () => {
  const page = renderer.create(<Settings/>).toJSON();
  expect(page).toMatchSnapshot();
});
