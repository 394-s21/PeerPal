import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { firebase } from './firebase';
import { SettingsCellSharp } from '@material-ui/icons';

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

const rows = [];

const update_rows = (courseInfo) => {
    // initializes rows for our datagrid
    // finds all the users that will be our rows
    var course_users = [];
    Object.values(courseInfo.enrollemnt_scores).map((user_id) => {
    course_users.push(user_id)
    })
    rows = []
    // adds all important data to the rows
    Object.entries(courseInfo.assignments).map((assignment) => {
    rows.push({ id: course_users[0],
                assignment_name: assignment.assignment_name,
                score: assignment.users.course_users[0].score,
                points_possible: assignment.points_possible,
                strats: ''
                })
    })
}

const UserCourseTable = ({route,navigation}) => {

    const classes = useStyles();

    // updates courseInfo state with firebase json and updates rows
    const [courseInfo, setCourseInfo] = useState({})
    useEffect(() => {
        const cdb = firebase.database().ref('course/137169');
        console.log(cdb.key)
        const handleData = snap => {
            if (snap.val()) {setCourseInfo(snap.val());};
                            // update_rows(courseInfo);}
    };
    cdb.on('value', snap => {
        if (snap.val()) {
            setCourseInfo(snap.val());
            console.log(courseInfo)
        }
    }, error => console.log(error));
    return () => { db.off('value', handleData);};
    }, []);
    

    return (
        <DataGrid rows={rows} columns={columns} pageSize={6}/>
    );
}

export default UserCourseTable; 