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
import Button from '@material-ui/core/Button';
import { firebase } from '../components/firebase';
import base64 from 'react-native-base64'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

const UserScreen = ({route, navigation}) => {
    const [token, setToken] = useState("")
    const [name, setName] = useState("")
    
    const signup = () => {
        // var user = firebase.auth().currentUser;
        console.log("name + token", name, token)
        const orderRef = firebase.database().ref('/user/' + Math.floor(Math.random() * 10000000));
        // encrypt token
        let tokenEncrypt = base64.encode(token);
        orderRef.update({
            Name: name,
            Token: tokenEncrypt
        });
        navigation.navigate('UserCourseScreen')
        
    }

    return(
        <Grid container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}>
            <Grid item  xs={12}>
                <Typography variant="h3" gutterBottom>PeerPal</Typography>
            </Grid>
            <Grid item  xs={12}>
                <TextField
                    variant="filled"
                    placeholder="John"
                    color="primary"
                    label="Name"
                    value={name}
                    multiline={false}
                    onChange={(text) => {
                        // console.log(text, typeof(text),text.target.value)
                        setName(text.target.value)
                        // console.log(token)
                    }}>
                </TextField>
            </Grid>

            <Grid item  xs={12}>
                <TextField
                    variant="filled"
                    placeholder="1234~8IcdyEzRB4ioXqmoXotJb8jc7djVDTWujhGUf03KOalUGMzePweQZkA13Omu3eHJ"
                    color="primary"
                    label="Canvas Access Token"
                    value={token}
                    multiline={true}
                    onChange={(text) => {
                        // console.log(text, typeof(text),text.target.value)
                        setToken(text.target.value)
                        // console.log(token)
                    }}>
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() =>  signup()}>
                    SIGN UP
                </Button>
            </Grid>
        </Grid>

    );
}

export default UserScreen;