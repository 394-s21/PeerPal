
import renderer from 'react-test-renderer';
import CourseCard from '../components/CourseCard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 

test('Home Page Renders Correctly', () => {
  
  const name = "CS394"
  const id = 12345
  
  const page = renderer.create(
    <Router>
    <Route path="/course/:id">
    <CourseCard name={name} id={id}/>
    </Route>
    </Router>
    ).toJSON();
  expect(page).toMatchSnapshot();
});
