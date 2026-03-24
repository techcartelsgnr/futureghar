import React from "react";
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "../../theme/theme";

export default function SplashScreen() {

  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.primaryDark },
      ]}
    >

      <StatusBar
        backgroundColor={colors.primaryDark}
        barStyle="light-content"
      />

      <View style={styles.centerWrapper}>

        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
        />

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 200,
    height: 140,
    resizeMode: "contain",
  },

});