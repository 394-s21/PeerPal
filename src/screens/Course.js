import {useState, useEffect} from 'react'; 
import { useParams } from "react-router";
import fire from '../config/fire'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Course = () => {
    const [assignments, setAssignments] = useState({});
    let test; 
    let data = []
    const { id } = useParams(); 
    const db = fire.database().ref(`/course/${id}`); 
    useEffect(() => {
        db.on('value', snap => {
            if(snap.val()){
                setAssignments(snap.val())
                test = snap.val()
                console.log("test", test)
                console.log(assignments)
                const assignmentArray = Object.entries(test.assignments)
                assignmentArray.map(assignment => {
                    let object = {name: assignment[1].assignment_name, score:10} //have to work on the score 
                    data.push(object)
                })
                console.log(data)
            }
        }, error => {
            console.log(error)
        })    
    }, [])
    return ( 
        <div>
            <h1>{id}</h1>
            <h1>{assignments.course_name}</h1> 
        </div>
     );
}
 
export default Course;
