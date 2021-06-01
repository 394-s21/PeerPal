import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import fire from '../config/fire';

const CryptoJS = require("crypto-js");


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const encryptToken = (key,encrypt) => {
   
}


const updateToken = (key,encrypt) =>{
    
}

const Settings = (props) => {
    const classes = useStyles();
    const[key,setKey] = useState("")
    const[encrypt,setEncrypt] = useState("")

    return (
        <div>
            <h1>Settings</h1>

            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Canvas API Token" onChange = {e => setKey(e.target.value)}/>
                <TextField id="standard-basic" label="Encryption Password" onChange = {e => setEncrypt(e.target.value)} />
            </form>

            <Button onClick={() => {updateToken(key, encrypt)}}> Update API Token</Button>


            <Button onClick={() => {props.handleLogout()}}>Log out</Button>
        </div>
    )
}

export default Settings;