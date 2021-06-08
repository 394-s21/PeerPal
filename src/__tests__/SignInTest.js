import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SignInSide from '../screens/Signin';

test('Sign In Page Renders Correctly', () => {
  const page = renderer.create(<SignInSide/>).toJSON();
  expect(page).toMatchSnapshot();
});
