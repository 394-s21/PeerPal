import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { firebase } from './firebase';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      padding: 10
    },
    table:{
    },
    pos: {
      marginBottom: 12,
    },
});

const data = []
const course_users = [];
const update_data = () => {
    // initializes rows for our datagrid
    data = []
    // finds all the users that will be our rows
    course_users = []
    Object.values(courseInfo.enrollemnt_scores).map((user_id) => {
    course_users.push(user_id)
    })
    
    // adds all important data to the rows
    Object.entries(courseInfo.assignments).map((assignment, i) => {
      for (i=0; i<1; i++) {
        rows.push({ name: assignment.assignment_name,
          p1:  assignment.users.course_users[i].score / assignment.points_possible,
        })
      }
    })
}

const ClassRechart = ({route,navigation}) => {

    const classes = useStyles();

    // updates courseInfo state with firebase json and updates rows
    const [courseInfo, setCourseInfo] = useState({})
    useEffect(() => {
    const cdb = firebase.database().ref('course/137169');
    const handleData = snap => {
        if (snap.val()) {setCourseInfo(snap.val());
                        update_data();};
    };
    cdb.on('value', handleData, error =>(error));
    return () => { db.off('value', handleData);};
    }, []);

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="p1" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default ClassRechart;