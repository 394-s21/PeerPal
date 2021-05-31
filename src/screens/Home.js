import {useState, useEffect} from 'react'; 
import CourseCard from '../components/CourseCard';
import CourseCards from '../components/CourseCards';
import fire from '../config/fire'

const db = fire.database().ref("/course"); 
const token = "1876~zeAbPlt0suio6fZRlJEjRPYC85jXROLGPmEBszXJChZv3fDeIC5TMD3si6TI3TU8"
const headers = {
    headers: {
        authorization: `Bearer ${token}`
    }
}

const Home = () => {
    const [courses, setCourses] = useState([])
    useEffect(() => {
        fetch("http://localhost:5001/peerpal-a286b/us-central1/getClasses", headers)
            .then(data => {
                console.log(data)   
                return data.json()    
            })
            .then(res => {
                setCourses(res)
            })

        // db.on('value', snap => {
        //     if(snap.val()){
        //         setCourses(snap.val())
        //     }
        // }, error => {
        //     console.log(error)
        // })
    }, [])
    console.log(courses)
    const render = (() => {
        if(courses.length){
            return courses.map((course) => {
                // <h1>hello</h1>
                <CourseCard name={course.name} id={course.id} />
            })
        }
        else{
            return null 
        }
    })
    return ( 
        <div className="home">
            <CourseCard name = "ehwqihe" id = "e123"></CourseCard>
            {render}
        </div>
     );
}
 
export default Home;