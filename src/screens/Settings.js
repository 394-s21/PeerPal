import React from 'react'
import Button from '@material-ui/core/Button';

const Settings = (props) => {
    return (
        <div>
            <h1>Settings</h1>
            <Button onClick={() => {props.handleLogout()}}>Log out</Button>
        </div>
    )
}

export default Settings