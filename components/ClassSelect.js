import React, {useState} from 'react';
import {View} from 'react-native'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import RankCard from './RankCard';
import AssignmentCard from '../components/AssignmentCard'
import Table from '@material-ui/core/Table'
import { Chart, VerticalAxis, HorizontalAxis, Line, Area } from 'react-native-responsive-linechart'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const ClassSelect = ({courseList}) => {
    const [course, setCourse] = React.useState('');
    const classes = useStyles();

    const handleChange = (event) => {
        setCourse(event.target.value);
      };

    return (
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={course}
        onChange={handleChange}>
        
        {courseList.map((item,idx) => (
          
            <MenuItem value = {item.id} key = {item.name}> {item.name} </MenuItem>

        ))}
        


        </Select>

    )

}

export default ClassSelect