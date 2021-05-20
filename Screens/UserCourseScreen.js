import React, {useState} from 'react';
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


const getUserClasses = async(token) => {

    const res = await fetch('http://localhost:5001/peerpal-a286b/us-central1/getClasses', {
            headers: {
            authorization: `Bearer ${token}`
        }
    })
    const result_json = await res.json();
    console.log(result_json)
  
}

const UserCourseScreen = ({route, navigation}) => {
    getUserClasses('1876~6TIbmwUY1SkTgGMOSO377QdPMOmsyvMZsqacTeosED9nY7o36B7hP0mYFnbTwPBI')
    return(
        <Grid container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}>
            <ClassSelect courseList={[{id:"1234",course:'CS 213'}]} />
        </Grid>

    );
}

export default UserCourseScreen;