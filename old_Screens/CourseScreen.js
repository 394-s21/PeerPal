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
import { firebase } from '../components/firebase';

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

const columns = [
  { field: 'id', headerName: 'ID', width: 90},
  { field: 'assignment_name', headerName: 'Assignment', width: 250 },
  { field: 'score', headerName: 'Score', type: 'number', width: 90},
  { field: 'points_possible', headerName: 'Total', type: 'number', width: 90 },
  { field: 'percentage', headerName: 'Percentage', type: 'number', width: 90,
    valueGetter: (params) =>
    params.getValue(params.id, 'score')/params.getValue(params.id, 'points_possible')
    },
  { field: 'strats', headerName: 'Learning Strategies', width: 150, sortable: false },
];

// updates courseInfo state with firebase json
[courseInfo, setCourseInfo] = useState({})
useEffect(() => {
  const cdb = firebase.database().ref('course/137169');
  const handleData = snap => {
    if (snap.val()) setCourseInfo(snap.val());
  };
  cdb.on('value', handleData, error =>(error));
  return () => { db.off('value', handleData);};
}, []);

// makes rows for our datagrid
const rows = [];

// need to push rows with the data we need
// the folllowing code is an artifact of a failed attempt T_T
course.values(this.props.a).map((item,idx) => {
  rows.push({ id: item.users[`${users.idx}`], 
              assignment_name: item.assignment_name,
              score: item.users[`${users.idx}`].score,
              states: ''
            })
  })

const CourseScreen = ({route,navigation}) => {

  const ref = firebase.database().ref('/course/137169/Assignments/0')
  console.log(ref)


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
            <RankCard score={getScoree(rows, rowWeight, keys, 0)} type={'Personal'}/>
            <RankCard score={90} type={'Class'}/>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Typography>Class Performance</Typography>
              <ClassChart data={'hi'}/>
            </View>
            <View style={{ height: '450', width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={6} checkboxSelection  />
            </View>
        </Grid>
    );
}

export default CourseScreen;