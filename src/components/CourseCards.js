import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActionArea, CardActions, CardContent, Button, Typography} from '@material-ui/core';
const useStyles = makeStyles({
    root: {
      minWidth: 275,
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

const CourseCards = ({current_courses}) => {
    const classes = useStyles();
    return ( 
        <div className="course_list">
            <h1>
                Current Courses
            </h1>
            {current_courses.map((course) => {
                <Card>
                    <CardActionArea>
                        <Typography className = {classes.title}>
                            {course.course_name}
                            {console.log(course)}
                        </Typography>
                    </CardActionArea>
                </Card>
            })}
        </div>
     );
}
 
export default CourseCards;