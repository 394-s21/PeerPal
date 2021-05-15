import React, {useState} from 'react';
import {View} from 'react-native'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import RankCard from '../components/RankCard';
import AssignmentCard from '../components/AssignmentCard'
import Table from '@material-ui/core/Table'
import { DataGrid } from '@material-ui/data-grid'
import TextField from '@material-ui/core/TextField'

const UserScreen = ({route, navigation}) => {
    return(
        
        <TextField
            variant="filled"
            placeholder="1234~8IcdyEzRB4ioXqmoXotJb8jc7djVDTWujhGUf03KOalUGMzePweQZkA13Omu3eHJ"
            color="primary"
            label="Canvas Access Token">

        </TextField>

    );
}

export default UserScreen;