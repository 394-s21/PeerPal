import React, { useState, useEffect } from 'react'
import fire from './config/fire'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import Signin from './screens/Signin'; 
import Signup from './screens/Signup'
import Home from './screens/Home';
import Settings from './screens/Settings'



function App() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
            // use firebase err code to determine kind of error
            // and handle it accordingly
            switch(err.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(err.message);
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message);
                    break;
            }
        })
  }

  const handleSignup = () => {
    clearErrors();
    fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => {
            // use firebase err code to determine kind of error
            // and handle it accordingly
            switch(err.code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.message);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message);
                    break;
            }
        })
  }

  const handleLogout = () => {
    fire.auth().signOut();
    window.location.href = '/'
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
        if (user) {
            clearInputs();
            setUser(user);
        } else {
            setUser('');
        }
    })
  }

  useEffect(() => {
    authListener();
  }, [])

  return (
    <Router>
      <div className = "App">
        <Switch>
          { (user === '') ? (
            <>
              <Route exact path = "/">
                <Signin
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  handleLogin={handleLogin}
                  handleSignup={handleSignup}
                  hasAccount={hasAccount}
                  setHasAccount={setHasAccount}
                  emailError={emailError}
                  passwordError={passwordError}
                />
              </Route>
              <Route exact path = "/signup">
                <Signup
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  handleLogin={handleLogin}
                  handleSignup={handleSignup}
                  hasAccount={hasAccount}
                  setHasAccount={setHasAccount}
                  emailError={emailError}
                  passwordError={passwordError}
                />
              </Route>
            </>
          ) : (
            <Route exact path = "/">
              <Home/>
            </Route>
          )}
          
          <Route path="/home">
            <Home /> 
          </Route>
          <Route path="/settings">
            <Settings handleLogout={handleLogout}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
