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
import Button from '@material-ui/core/Button';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'studentName', headerName: 'Name', width: 130 },
    {
      field: 'a1',
      headerName: 'Homework 1',
      type: 'number',
      width: 160,
    },

    {
      field: 'a2',
      headerName: 'Homework 2',
      type: 'number',
      width: 160,
    },

    {
      field: 'a3',
      headerName: 'Homework 3',
      type: 'number',
      width: 160,
    },

    {
      field: 'a4',
      headerName: 'Midterm',
      type: 'number',
      width: 160,
    },


  ];
  
  const rows = [
    { id: 1, studentName: 'Student 1 (you)', a1: 100, a2: 95, a3: 85, a4: 70 },
    { id: 2, studentName: 'Student 2', a1: 100, a2: 100, a3: 100, a4: 88 },
    { id: 3, studentName: 'Student 3', a1: 95, a2: 85, a3: 95, a4: 90 },
    { id: 4, studentName: 'Student 4', a1: 65, a2: 75, a3: 95, a4: 72 },
    { id: 5, studentName: 'Student 5', a1: 75, a2: 75, a3: 75, a4: 62 },
    { id: 6, studentName: 'Student 6', a1: 75, a2: 85, a3: 85, a4: 76 },
  ];

  const keys = ["a1","a2","a3","a4"];

  const rowWeight = [.1, .1, .1, .7];

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      padding: 10
    },
    title: {
      fontSize: 16,
      textAlign: 'center'
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
      

    },
    pos: {
      marginBottom: 12,
    },
});


const CourseScreen = ({route,navigation}) => {

    const classes = useStyles();

    const getScore = (info, weights, keys, studentIDX) => {
      let to_return = 0;
      keys.map((item, idx) => {
        to_return += info[studentIDX][item] * weights[idx]
      })
      return to_return;
    }

    return (
        <Grid className={classes.root} container direction="row"
        justify="center"
        alignItems="top">
            <RankCard score={getScore(rows, rowWeight, keys, 0)} type={'Personal'}/>
            <RankCard score={90} type={'Class'}/>
            <div style={{ height: '450', width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={6} checkboxSelection  />
            </div>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" size="medium" onClick={() =>  navigation.navigate('UserCourseScreen')}>
                      Back
              </Button>
            </Grid>
        </Grid>
    );
}

export default CourseScreen;