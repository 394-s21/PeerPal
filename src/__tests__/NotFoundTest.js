import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import NotFound from '../screens/NotFound';

test('Not Found Renders Correctly', () => {
  const page = renderer.create(

    <Router>
    <Route path="*">
        <NotFound></NotFound>
    </Route>
    </Router>
 ).toJSON();
  expect(page).toMatchSnapshot();
});
