import {useState, useEffect} from 'react'; 
import CourseCard from '../components/CourseCard';
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
    return ( 
        <div className="home">
            {courses.length > 0 ? (courses.map((course) => (
                <CourseCard name = {course.name} id = {course.id}></CourseCard>
            ))) : (<h1>Loading...</h1>)}
        </div>
     );
}
 
export default Home;