import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

const HomeScreen = (route, navigation) => {
    const [courses, setCourses] = useState({})

    useEffect(() => {
        fetch()
    }, [])

    return (
        <Typography>Hello World!</Typography>
    )
}

export default HomeScreen;