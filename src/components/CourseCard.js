import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActionArea, CardActions, CardContent, Button, Typography} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      maxWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

const CourseCard = ({name, id}) => {
    const classes = useStyles();

    return (
        <Card className = {classes.root}>
            <CardContent>
                <Typography className={classes.title}>
                    {name}
                </Typography>
                <Typography className={classes.pos}>
                    {id}
                </Typography>
            </CardContent>
        </Card>
     );
}
 
export default CourseCard;