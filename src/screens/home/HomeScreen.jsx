import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import PropertySlider from './PropertySlider'
import PropertyList from '../property/PropertyList'

import {
  useTheme,
} from '../../theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context'


export default function HomeScreen() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, paddingBottom: 60, }}>
      {/* ✅ STATUS BAR */}
      <StatusBar
        translucent={false}
        backgroundColor={colors.background}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />
      <Header />
      <PropertySlider />
      <PropertyList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})