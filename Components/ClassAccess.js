import React, {useState} from 'react';
import {View} from 'react-native'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import RankCard from './RankCard';
import AssignmentCard from './AssignmentCard'
import Table from '@material-ui/core/Table'
import { Chart, VerticalAxis, HorizontalAxis, Line, Area } from 'react-native-responsive-linechart'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import SaveIcon from '@material-ui/icons/Save'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));

const CheckboxEx = ({id}) => {
    const [checked, setChecked] = useState(false)
    const handleChange = (e) => {
        setChecked(e.target.checked)
    }
    return(
        <Checkbox
            checked={checked}
            checkedIcon={<SaveIcon/>}
            onChange = {handleChange}
            inputProps={{
                'aria-label': 'secondary checkbox'
            }}
        />
    )
}

const ClassAccess = ({courseList}) => {
    const classes = useStyles();
    // const grantedcourses = []
    


    // const [grantedcourses, setGrantedCourses] = useState(
    //     {courseList.map((item,idx)) => (
    //         item.id: false,
    //     )}
    // )
    return(
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Grant Access</FormLabel>
        <FormGroup>
        
            {courseList.map((item,idx) => (
            <FormControlLabel
                control={<CheckboxEx>item.id</CheckboxEx>}    
                label={item.name}
                key={item.id}
            />))}
        </FormGroup>
        <FormHelperText>Select classes to share with PeerPal</FormHelperText>
      </FormControl>

    )
}


export default ClassAccess

