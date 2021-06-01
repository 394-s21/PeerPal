import {useState, useEffect} from 'react'; 
import { useParams } from "react-router";
import fire from '../config/fire'
import Typography from '@material-ui/core/Typography';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Course = () => {
    const [assignments, setAssignments] = useState({});
    const [data, setData] = useState([])
    const [users, setUsers] = useState([]);
    let test; 
    const { id } = useParams(); 
    const db = fire.database().ref(`/course/${id}`); 
    useEffect(() => {
        db.on('value', snap => {
            if(snap.val()){
                setAssignments(snap.val())
                test = snap.val()
                const assignmentArray = Object.entries(test.assignments)
                let my_data=[];
                assignmentArray.map(assignment => {
                    let my_object = {name: assignment[1].assignment_name, short_name: assignment[1].assignment_name.substring(0, 2)} //have to work on the score 
                    let my_users = []
                    Object.entries(assignment[1].users).forEach((key_val) => {
                        my_users.push(key_val[0])
                        if (!(key_val[1].score === 'no_score')) {
                            my_object[key_val[0]] = (key_val[1].score / assignment[1].points_possible) * 100
                            // my_object['uv'] = 10
                        } 
                    })
                    my_data.push(my_object)
                    setUsers(my_users)
                })
                setData(my_data)
            }
        }, error => {
            console.log(error)
        })    
    }, [])
    return ( 
        <div>
            {/* <h1>{id}</h1> */}
            <Typography>{assignments.course_name}</Typography> 
            {/* <ResponsiveContainer width={800} height={300}> */}
                <LineChart width={800} height={300} data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Tooltip />
                    {users.map((user) => (
                        <Line type="monotone" dataKey={user} stroke="#8884d8"/>
                    ))}
                </LineChart>
            {/* </ResponsiveContainer> */}

        </div>
     );
}
 
export default Course;
