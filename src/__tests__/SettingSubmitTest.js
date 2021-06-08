import renderer from 'react-test-renderer';
import Settings from '../screens/Settings';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

test('Test if buttons are clickable  Correctly',  () => {
  // const page = renderer.create(<Settings/>).toJSON();
  // expect(page).toMatchSnapshot();
  // fireEvent.click(screen.getByText('Update API Token'))

  // wait until the `get` request promise resolves and
  // the component calls setState and re-renders.
  // `waitFor` waits until the callback doesn't throw an error
  render(<Settings/>)
  // expect(screen.getByRole('button')).not.toBeDisabled()
  // fireEvent.click(screen.getByText('Update API Token'))
  expect(screen.getByText('Log out')).not.toBeDisabled()
  expect(screen.getByText('Update API Token')).not.toBeDisabled()
});
