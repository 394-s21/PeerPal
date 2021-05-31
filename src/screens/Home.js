import {useState, useEffect} from 'react'; 
import CourseCards from '../components/CourseCards';
import fire from '../config/fire'

const db = fire.database().ref("/course"); 

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
            <h1>{console.log(Object.values(courses))}</h1>
            <h2>hello world</h2>
            <CourseCards current_courses={Object.values(courses)}></CourseCards>
        </div>
     );
}
 
export default Home;