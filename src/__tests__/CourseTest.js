import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Course from '../screens/Course';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 

test('Course Page Renders Correctly', () => {
  const page = renderer.create(

    <Router>
    <Route path="/course/:id">
      <Course />
    </Route>
    </Router>
 ).toJSON();
  expect(page).toMatchSnapshot();
});
