import { Typography } from '@material-ui/core';
import React, {useState} from 'react';
// import {View} from 'react-native'
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import Grid from '@material-ui/core/Grid'
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography'
// import RankCard from '../components/RankCard';
// import AssignmentCard from '../components/AssignmentCard'
// import Table from '@material-ui/core/Table'
import { Chart, VerticalAxis, HorizontalAxis, Line, Area } from 'react-native-responsive-linechart'


const ClassChart = (props) => {

    if (props.course) {
        const num_assignments = Object.keys(props.course.assignments).length

        let user_assignments = []

        Object.entries(props.course.assignments).map((assignment, idx) => {
            if (assignment[1].users["114588"].score !== "no_score") {
                user_assignments.push({x: (idx+1), y: ( 100 * assignment[1].users["114588"].score / assignment[1].points_possible)})
            }
        })

        let other_users = [[], [], [], [], [], []]

        Object.entries(props.course.assignments).map((assignment, idx) => {
            Object.entries(assignment[1].users).map((user, idxx) => {
                if (user[1].score !== "no_score") {
                    other_users[idxx].push({x: idx, y: ( 100 * user[1].score / assignment[1].points_possible)})
                }
            })
        })

        console.log('user_assignments', user_assignments)
        return (
            <Chart
        style={{ height: 400, width: 800 }}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: 1, max: (num_assignments + 1) }}
        yDomain={{ min: 0, max: 110 }}
        >
        <VerticalAxis tickCount={10} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
        <HorizontalAxis tickCount={num_assignments + 1} />
        <Area theme={{ gradient: { from: { color: '#44bd32', opacity: 0.4 }, to: { color: '#44bd32', opacity: 0.2 } }}} data={user_assignments} />
        {
            other_users.map((user, idx) => {
                <Line theme={{ stroke: { color: '#40a992', width: 2 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#40a992' }, selected: { color: 'red' } } }}  data={user} />
            })
        }
        
        
        <Line theme={{ stroke: { color: '#54bd42', width: 5 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#54bd42' }, selected: { color: 'red' } } }}  data={
            user_assignments
        }/>
        </Chart>
        )
    }
    return (
        <Typography>Loading...</Typography>
    )
}

export default ClassChart