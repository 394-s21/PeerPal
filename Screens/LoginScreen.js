import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

const Login = (props) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
    } = props;

    return (
        <Grid>
            <Grid>
                <TextField
                variant="filled"
                placeholder="example@example.com"
                color="primary"
                label="Email"
                value={email}
                multiline={false}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}/>
            </Grid>
            <Grid>
                <Typography>{emailError}</Typography>
            </Grid>
            <Grid>
                <TextField
                variant="filled"
                placeholder=""
                color="primary"
                label="Password"
                value={password}
                multiline={false}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
            </Grid>
            <Grid>
                <Typography>{passwordError}</Typography>
            </Grid>
            <Grid>
                { hasAccount ? (
                    <>
                    <Grid>
                        <Button variant="contained" color="primary" onClick={() =>  {
                            handleLogin();
                            // navigation.navigate('Home');
                        }}>Sign In</Button>
                    </Grid>
                    <Grid>
                        <Typography>Don't have an account?</Typography><Button variant="contained" color="primary" onClick={() => setHasAccount(!hasAccount)}>Sign up</Button>
                    </Grid>
                    </>
                ) : (
                    <>
                    <Grid>
                        {/* <Button onClick={navigation.navigate('home')}>HOME</Button> */}
                        <Button variant="contained" color="primary" onClick={() =>  {
                            handleSignup();
                            // navigation.navigate('Home');
                        }}>Sign Up</Button>
                    </Grid>
                    <Grid>
                        <Typography>Already have an account?</Typography><Button variant="contained" color="primary" onClick={() => setHasAccount(!hasAccount)}>Sign in</Button>
                    </Grid>
                    </>
                )}
            </Grid>
        </Grid>
    )

    // return (
    //     <section>
    //         <div>
    //             <label>Username</label>
    //             <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)}/>
    //             <p>{emailError}</p>
    //             <label>Password</label>
    //             <input type="text" required value={password} onChange={e => setPassword(e.target.value)}/>
    //             <p>{passwordError}</p>
    //             <div>
    //                 { hasAccount ? (
    //                     <>
    //                     <button onClick={handleLogin()}>Sign In</button>
    //                     <p>Don't have an account? <span onClick={setHasAccount(!hasAccount)}>Sign up</span></p>
    //                     </>
    //                 ) : (
    //                     <>
    //                     <button onClick={handleSignup()}>Sign Up</button>
    //                     <p>Already have an account? <span onClick={setHasAccount(!hasAccount)}>Sign in</span></p>
    //                     </>
    //                 )}
    //             </div>
    //         </div>
    //     </section>
    // )
}

export default Login;