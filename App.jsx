import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {HomeScreen} from './src/navigation/index'
import { NavigationContainer } from '@react-navigation/native'
import MainStack from './src/navigation/MainStack'


export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})