import React from 'react';
import {View} from 'react-native'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'

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
    pos: {
      marginBottom: 12,
    },
  });

const CourseScreen = ({route,navigation}) => {

    const classes = useStyles();


    return (
        <Grid className={classes.root} container direction="row"
        justify="center"
        alignItems="top">
            <Grid item className={classes.scoreCard}>
                <Card>

                    <CardContent> 
                        <Typography className={classes.title} >Your Score</Typography>
                        <Typography className= {classes.score}>88</Typography>
                    </CardContent>

                </Card>

            </Grid>

            <Grid item className={classes.scoreCard}>

                <Card>

                    <CardContent> 
                        <Typography className={classes.title}>Class Average</Typography>
                        <Typography className={classes.score}>90</Typography>
                    </CardContent>

                </Card>
            </Grid>
        </Grid>

    );
}

export default CourseScreen;