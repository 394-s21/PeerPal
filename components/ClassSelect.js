import React, {useState} from 'react';
import {View} from 'react-native'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const ClassSelect = ({courseList, navigation}) => {
    const [course, setCourse] = React.useState('');
    const classes = useStyles();

    const handleChange = (event) => {
        setCourse(event.target.value);
      };

    return (
      <Grid container>
        <Grid item>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={course}
          onChange={handleChange}>
          
          {courseList.map((item,idx) => (
              <MenuItem value = {item.id} key = {item.name}> {item.name} </MenuItem>

          ))}
          </Select>
        </Grid>
        <Grid container>
          <Button onClick={()=>navigation.navigate('CourseScreen')}
                  variant='contained'>
            Enter
          </Button>
        </Grid>
      </Grid>

    )

}

export default ClassSelect