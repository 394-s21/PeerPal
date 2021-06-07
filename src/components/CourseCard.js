import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import {Card, CardActionArea, CardActions, CardContent, Button, Typography, Box} from '@material-ui/core';
const useStyles = makeStyles({
    root: {
      maxWidth: 275,
    },
    no_underline:{
      color: "inherit", 
      textDecoration: 'none'
    },

    box:{
      height: 110,
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
      columnGap: 10
    },
});
let colors = ["primary.main", "secondary.main", "error.main", "warning.main", "info.main", "success.main"]
const CourseCard = ({name, id}) => {
    const classes = useStyles();
    return (
        <Card className = {classes.root} key = {id}>
        <Link to = {`/course/${id}`} className = {classes.no_underline} >
          <Box bgcolor={colors[Math.floor(Math.random()*colors.length)]} className={classes.box}>
              </Box>
            <CardContent>
              <Typography className={classes.title}>
                {name}
              </Typography>
              <Typography className={classes.pos}>
                {id}
              </Typography>
            </CardContent>
            </Link> 
          </Card>
     );
}
 
export default CourseCard;