import React, {useState, useEffect} from 'react';
import {View} from 'react-native'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import RankCard from '../components/RankCard';
import AssignmentCard from '../components/AssignmentCard'
import Table from '@material-ui/core/Table'
import { DataGrid } from '@material-ui/data-grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import ClassSelect from '../components/ClassSelect'
import useFetch from '../components/useFetch';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

async function asyncCall() {
    console.log('calling');
    const result = new Promise(resolve => {
      setTimeout(function(){ console.log('hello world'); }, 3000);
    });
    result.then((value)=>{
      console.log("called")
      asyncCall();
    })
    .catch((err)=>console.log(err))
    // console.log(result);
    // expected output: "resolved"
  }

const UserCourseScreen = ({route, navigation}) => {
    // const user_class_json= getUserClasses('1876~6TIbmwUY1SkTgGMOSO377QdPMOmsyvMZsqacTeosED9nY7o36B7hP0mYFnbTwPBI')
    // let courseList = []
    // for (let i=0; i<user_class_json.length; i++) {
    //   courseList.push({id: user_class_json[i].id, course: user_class_json[i].name})
    //   console.log(user_class_json[i])
    // }
    // This is Alan here trying to see if I can create a custom hook in the compoenents folder
    const [courseList, setCourseList] = useState([]);
    
    const token = '1876~6TIbmwUY1SkTgGMOSO377QdPMOmsyvMZsqacTeosED9nY7o36B7hP0mYFnbTwPBI' //christopher's token
    const token2 = '1876~zeAbPlt0suio6fZRlJEjRPYC85jXROLGPmEBszXJChZv3fDeIC5TMD3si6TI3TU8' //alan's token 
    useEffect(() => {
        const fetchClasses = async() => {
            const res = await fetch('http://localhost:5001/peerpal-a286b/us-central1/getClasses', {
                headers: {
                authorization: `Bearer ${token2}`
                }})
            if (!res.ok) throw res;
            const result_json = await res.json();
            let courseArray = []
            for (let i=0; i< result_json.length; i++) {
                courseArray.push({id: result_json[i].id, course: result_json[i].name})
                // console.log(result_json[i])
                }
            setCourseList(courseArray)
        }
        fetchClasses()
        }, [])
    
    // [courseList, setCourseList] = useState([])
    // getUserClasses('1876~6TIbmwUY1SkTgGMOSO377QdPMOmsyvMZsqacTeosED9nY7o36B7hP0mYFnbTwPBI')
    console.log(courseList)
    return(
        <Grid container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}>
            {/* {courseList ? <ClassSelect courseList={courseList} /> : <div>Loading . . .</div>} */}
            <ClassSelect courseList={courseList}/>
        </Grid>

    );
}

export default UserCourseScreen;