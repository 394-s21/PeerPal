import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CourseScreen from './screens/CourseScreen'
import UserScreen from './Screens/UserScreen'
import UserCourseScreen from './Screens/UserCourseScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  SignIn  from './Screens/SignIn'
const Stack = createStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <CourseScreen/> */}
    //   <UserScreen/>
    //   <StatusBar style="auto" />
    // </View>

    <NavigationContainer>
    {/* Hide navigator header */}
    <Stack.Navigator screenOptions={{headerShown: false}}> 
      {/* <Stack.Screen name="UserScreen"
        component={UserScreen}
      /> */}
      {/* <Stack.Screen name = "SignIn" component={SignIn} />
      <Stack.Screen name="UserCourseScreen"
        component={UserCourseScreen}
      /> */}
      <Stack.Screen name="CourseScreen"
        component={CourseScreen}
      />
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
