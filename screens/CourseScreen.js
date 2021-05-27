import React, {useEffect, useState} from 'react';
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
import Button from '@material-ui/core/Button';
import ClassChart from '../components/ClassChart'
import { firebase } from '../Components/firebase';
import UserCourseTable from '../Components/UserCourseTable'
import ClassRechart from '../Components/ClassRechart'

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      padding: 10
    },
    title: {
      width: '100%',
      alignItems: 'center'
    },
    scoreCard:{
        padding:5
    }
    ,
    score:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    table:{
      height: '450', 
      width: '100%'
    },
    pos: {
      marginBottom: 12,
    },
});

const CourseScreen = ({route,navigation}) => {

  // const ref = firebase.database().ref('/course/137169/Assignments/0')
  // console.log(ref)

    const classes = useStyles();

    return (
        <Grid container
        className={classes.root}
        direction="row"
        justify="center">
            {/* <RankCard score={getScore(rows, rowWeight, keys, 0)} type={'Personal'}/> */}
            {/* <RankCard score={90} type={'Class'}/> */}
            <Grid item className={classes.title}>
              <Typography>Class Performance</Typography>
            </Grid>
            <Grid item className={classes.table}>
              <UserCourseTable/>
            </Grid>
        </Grid>
    );
}

export default CourseScreen;