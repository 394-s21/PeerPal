import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import fire from './fire'
import LoginScreen from './Screens/LoginScreen'
import HomeScreen from './Screens/HomeScreen'
import CourseScreen from './Screens/CourseScreen'

const Stack = createStackNavigator();

export default function App() {
  // authentication states
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

  console.log('user', user)

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={ user ? "Course" : "Course" /* Should be "Home" : "Login" but I can't figure out how to navigate. */ } screenOptions={{headerShown: false}}>

      <Stack.Screen name="Login">{props => 
        <LoginScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError} />}
       </Stack.Screen>

      <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>

      <Stack.Screen name="Course" component={CourseScreen}></Stack.Screen>

    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
