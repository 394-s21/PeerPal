import {useState, useEffect} from 'react'; 
import CourseCards from './CourseCards';
import { firebase } from '../firebase'; 

const db = firebase.database().ref("/courses"); 

const Home = () => {
    const [courses, setCourses] = useState({})
    useEffect(() => {
        db.on('value', snap => {
            if(snap.val()){
                setCourses(snap.val())
            }
        }, error => {
            console.log(error)
        })
    }, [])
    return ( 
        <div className="home">
            <h1>{console.log(courses)}</h1>
            <h2>hello world</h2>
        </div>
     );
}
 
export default Home;