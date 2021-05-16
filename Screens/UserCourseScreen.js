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

const UserCourseScreen = ({route, navigation}) => {
    
    return(
        <Grid container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() =>  navigation.navigate('CourseScreen')}>
                    CS 213
                </Button>
            </Grid>
        </Grid>

    );
}

export default UserCourseScreen;