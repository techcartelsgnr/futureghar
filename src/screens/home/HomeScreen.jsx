import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import PropertySlider from './PropertySlider'
import PropertyList from '../property/PropertyList'

import {
  useTheme,
} from '../../theme/theme';
import ScreenWrapper from "../../components/ScreenWrapper";


export default function HomeScreen() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  return (
    <ScreenWrapper style={{ flex: 1, backgroundColor: colors.background, }}>
      {/* ✅ STATUS BAR */}
      <StatusBar
        translucent={false}
        backgroundColor={colors.background}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />
      <Header />
      <PropertySlider />
      <PropertyList />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({})