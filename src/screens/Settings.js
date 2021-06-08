import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import fire from '../config/fire';
import base64 from 'react-native-base64'

const db = fire.database()
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
  var cipherText = base64.encode(key)
  return cipherText
}


const updateToken = (key,encrypt) =>{
  const cipherText = encryptToken(key,encrypt) //JSON.stringify()
  var decryptedData = base64.decode(cipherText)
  var user = fire.auth().currentUser;
  const uid = user.uid
  const user_ref = db.ref('/user/' + uid);
  user_ref.update({
      Token: cipherText,
  })
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

            <Button onClick={() => {updateToken(key, encrypt)}}>Update API Token</Button>


            <Button onClick={() => {props.handleLogout()}}>Log out</Button>
        </div>
    )
}

export default Settings;