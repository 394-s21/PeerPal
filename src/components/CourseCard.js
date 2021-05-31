import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import {Card, CardActionArea, CardActions, CardContent, Button, Typography, Box} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      maxWidth: 275,
    },
    no_underline:{
      textDecoration: 'none'
    },
    box:{
      height: 100,
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
      fontSize: 'inherit',
      marginBottom: 15,
    },
});

const CourseCard = ({name, id}) => {
    const classes = useStyles();
    return (
      <Link to = {`/course/${id}`} className = {classes.no_underline}>
        <Card className = {classes.root} key = {id}>
            <CardContent>
              <Typography className={classes.title}>
                {name}
              </Typography>
              <Typography className={classes.pos}>
                {id}
              </Typography>
            </CardContent>
          </Card>
      </Link> 
     );
}
 
export default CourseCard;