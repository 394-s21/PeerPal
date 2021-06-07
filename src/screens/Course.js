import {useState, useEffect} from 'react'; 
import { useParams } from "react-router";
import fire from '../config/fire'
import Typography from '@material-ui/core/Typography';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    bigContainer: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
    }, 
    title: {
        fontSize: 25,
        marginBottom: 20
    },
})

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
                    let my_object = {name: assignment[1].assignment_name, short_name: assignment[1].assignment_name.substring(0, 2)} 
                    let my_users = []
                    Object.entries(assignment[1].users).forEach((key_val) => {
                        my_users.push(key_val[0])
                        if (!(key_val[1].score === 'no_score')) {
                            my_object[key_val[0]] = (key_val[1].score / assignment[1].points_possible) * 100
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
    let colors = ["#d02f3d", "#56d22d", "#B4A7EB", "#F3A5BC", "#A0D8E9"]
    const classes = useStyles()
    return ( 
        <div className= {classes.bigContainer}>
            <Typography className= {classes.title}>{assignments.course_name}</Typography> 
                <LineChart width={1500} height={500} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid stroke={colors[4]} strokeDasharray="5 5"/>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend align="center"/>
                    {users.map((user, idx) => (
                        <Line type="monotone" dataKey={user} stroke={colors[idx % 5]}/>
                    ))}
                </LineChart>
        </div>
     );
}
 
export default Course;
