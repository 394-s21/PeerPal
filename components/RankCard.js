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


const RankCard = (props) => {
    
    const classes = useStyles();


    return (
        <Grid item className={classes.scoreCard}>
            <Card>

                <CardContent> 
                    <Typography className={classes.title} >{props.type} Score</Typography>
                    <Typography className= {classes.score}>{props.score}</Typography>
                </CardContent>

            </Card>

        </Grid>
    )
}

export default RankCard;