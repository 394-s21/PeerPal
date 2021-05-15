import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CourseScreen from './screens/CourseScreen'
import UserScreen from './Screens/UserScreen'

export default function App() {
  return (
    <View style={styles.container}>
      {/* <CourseScreen/> */}
      <UserScreen/>
      <StatusBar style="auto" />
    </View>
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
