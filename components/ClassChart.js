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
    console.log('props.course', props.course)
    let assignments = props.course ? Object.entries(props.course.assignments) : ''
    console.log('assignments', assignments)

    return (
        <Chart
        style={{ height: 400, width: 800 }}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: 1, max: 4 }}
        yDomain={{ min: 50, max: 110 }}
        >
        <VerticalAxis tickCount={10} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
        <HorizontalAxis tickCount={3} />
        <Area theme={{ gradient: { from: { color: '#44bd32', opacity: 0.4 }, to: { color: '#44bd32', opacity: 0.2 } }}} data={
            [
                // a1: 100, a2: 95, a3: 85, a4: 70
                { x: 1, y: 100 },
                { x: 2, y: 95 },
                { x: 3, y: 85 },
                { x: 4, y: 70 }
            ]} />
        <Line theme={{ stroke: { color: '#40a992', width: 2 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#40a992' }, selected: { color: 'red' } } }}  data={
            [
                // a1: 100, a2: 100, a3: 100, a4: 88 
                { x: 1, y: 100 },
                { x: 2, y: 100 },
                { x: 3, y: 100 },
                { x: 4, y: 88 }
            ]
        }/>
        <Line theme={{ stroke: { color: '#40a992', width: 2 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#40a992' }, selected: { color: 'red' } } }}  data={
            [
                // a1: 95, a2: 85, a3: 95, a4: 90
                { x: 1, y: 95 },
                { x: 2, y: 85 },
                { x: 3, y: 95 },
                { x: 4, y: 90 }
            ]
        }/>
        <Line theme={{ stroke: { color: '#40a992', width: 2 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#40a992' }, selected: { color: 'red' } } }}  data={
            [
                // a1: 65, a2: 75, a3: 95, a4: 72
                // a1: 75, a2: 75, a3: 75, a4: 62 
                // a1: 75, a2: 85, a3: 85, a4: 76 
                { x: 1, y: 65 },
                { x: 2, y: 75 },
                { x: 3, y: 95 },
                { x: 4, y: 72 }
            ]
        }/>
        
        <Line theme={{ stroke: { color: '#54bd42', width: 5 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#54bd42' }, selected: { color: 'red' } } }}  data={
            [
                // a1: 100, a2: 95, a3: 85, a4: 70
                { x: 1, y: 100 },
                { x: 2, y: 95 },
                { x: 3, y: 85 },
                { x: 4, y: 70 }
            ]
        }/>
        </Chart>
    )
}

export default ClassChart