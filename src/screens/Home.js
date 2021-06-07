import {useState, useEffect} from 'react'; 
import CourseCard from '../components/CourseCard';
import fire from '../config/fire'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom"
import base64 from 'react-native-base64'

const db = fire.database(); 



const useStyles = makeStyles({
    root: {
      maxWidth: 275,
    },
    no_underline:{
      textDecoration: 'none'
    },
    box:{
      height: 100,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 25,
    },
    pos: {
      fontSize: 'inherit',
      marginBottom: 15,
    },
    container: {
        marginTop: 10, 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-around",
        flex: 1, 
        flexWrap: "wrap",
    },
    courseCard: {
        marginRight: 20
    },
    center: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
    }
});

const Home = () => {
    const [courses, setCourses] = useState([])
    const classes = useStyles()

    let history = useHistory()
    var user = fire.auth().currentUser;
    const uid = user.uid
    const user_ref = db.ref('/user/' + uid);



    useEffect(() => {
        

            user_ref.on('value', snap => {
                if(snap.val()){
                    const headers = {
                        headers: {
                            authorization: `Bearer ${base64.decode(snap.val().Token)}`
                        }
                    }
                    console.log("Headers: ", headers)
                    fetch("https://us-central1-peerpal-a286b.cloudfunctions.net/getClasses", headers)  //https://us-central1-peerpal-a286b.cloudfunctions.net/getClasses //http://localhost:5001/peerpal-a286b/us-central1/getClasses
                    .then(data => { 
                        return data.json()    
                    })
                    .then(res => {
                        setCourses(res)
                    }) 
                }
                else{
                    history.push("/settings")
                }
            }, error => {
                console.log(error)
                history.push("/settings")
            })  
    }, [])
    return ( 
        <div >
            <Typography className= {classes.title}>Current Courses </Typography>
           <div className="home" className = {classes.container}>
            {courses.length > 0 ? (courses.map((course) => (
                <CourseCard name = {course.name} id = {course.id} key = {course.id} className={classes.courseCard}></CourseCard>
            ))) : (<h1 className={classes.center}>Loading...</h1>)}
        </div> 
        </div>
        
     );
}
 
export default Home;