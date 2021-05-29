import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ClassChart from '../components/ClassChart'

const CourseScreen = () => {
    // Hardcoded for right now for CS 394
    const [course, setCourse] = useState()

    useEffect(() => {
        fetch('https://peerpal-a286b-default-rtdb.firebaseio.com/course/137508.json')
        .then(res => res.json())
        .then(json => setCourse(json))
    }, [])

    return (
        <ClassChart course={course}/>
    )
}

export default CourseScreen