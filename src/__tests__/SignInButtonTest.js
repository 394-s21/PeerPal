import renderer from 'react-test-renderer';
import Settings from '../screens/Settings';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import SignInSide from '../screens/Signin';

test('Test if buttons are clickable  Correctly',  () => {
  // const page = renderer.create(<Settings/>).toJSON();
  // expect(page).toMatchSnapshot();
  // fireEvent.click(screen.getByText('Update API Token'))

  // wait until the `get` request promise resolves and
  // the component calls setState and re-renders.
  // `waitFor` waits until the callback doesn't throw an error
  render(<SignInSide/>)
  expect(screen.getByText('Sign Up')).not.toBeDisabled()
});
