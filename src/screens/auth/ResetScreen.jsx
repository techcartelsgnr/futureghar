import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useTheme,
  FontSizes,
  Spacing,
  BorderRadius,
  Fonts,
  Shadows,
  DeviceSize,
} from "../../theme/theme";

import InputAuthField from "../../components/InputAuthField";
import ButtonWithLoader from "../../components/ButtonWithLoader";

import { Lock, Eye, EyeOff } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function ResetScreen() {

  const { colors } = useTheme();
  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);

  const [loading, setLoading] = useState(false);

  /* ================= SKYLINE ================= */

  const skyline1 = useRef(new Animated.Value(0)).current;
  const skyline2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.loop(
      Animated.timing(skyline1, {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(skyline2, {
        toValue: 1,
        duration: 22000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

  }, []);

  const skylineMove1 = skyline1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -DeviceSize.width],
  });

  const skylineMove2 = skyline2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -DeviceSize.width / 2],
  });

  /* ================= PARTICLES ================= */

  const particles = Array.from({ length: 10 }).map(() => ({
    y: useRef(new Animated.Value(DeviceSize.height)).current,
    x: Math.random() * DeviceSize.width,
    size: 4 + Math.random() * 6,
    duration: 6000 + Math.random() * 4000,
  }));

  useEffect(() => {

    particles.forEach(p => {

      Animated.loop(
        Animated.timing(p.y, {
          toValue: -100,
          duration: p.duration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

    });

  }, []);

  /* ================= RESET ================= */

  const handleReset = () => {

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("LoginScreen");
    }, 1500);

  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <StatusBar
        backgroundColor={colors.primaryDark}
        barStyle={"light-content"}
      />

      <LinearGradient
        colors={[
          colors.primaryDark,
          colors.primaryGradientStart,
        ]}
        style={styles.hero}
      >

        {/* PARTICLES */}

        {particles.map((p, i) => (
          <Animated.View
            key={i}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              borderRadius: p.size,
              backgroundColor: "rgba(255,255,255,0.6)",
              left: p.x,
              transform: [{ translateY: p.y }],
            }}
          />
        ))}

        {/* SKYLINE */}

        <Animated.View
          style={[
            styles.skyline,
            { transform: [{ translateX: skylineMove1 }] },
          ]}
        />

        <Animated.View
          style={[
            styles.skylineTwo,
            { transform: [{ translateX: skylineMove2 }] },
          ]}
        />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >

          <View style={styles.centerWrapper}>

            {/* LOGO */}

            <Image
              source={require("../../../assets/images/logo.png")}
              style={styles.logo}
            />

            <Text style={styles.heroSubtitle}>
              Create a new secure password
            </Text>

            {/* CARD */}

            <View
              style={[
                styles.card,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >

              <Text
                style={[
                  styles.title,
                  { color: colors.textPrimary },
                ]}
              >
                Reset Password
              </Text>

              <InputAuthField
                label="New Password"
                placeholder="Enter new password"
                icon={<Lock size={18} color={colors.textSecondary} />}
                isSecure={secure1}
                value={password}
                onChangeText={setPassword}
                rightIcon={
                  secure1
                    ? <Eye size={18} color={colors.textSecondary} />
                    : <EyeOff size={18} color={colors.textSecondary} />
                }
                onRightIconPress={() => setSecure1(!secure1)}
              />

              <InputAuthField
                label="Confirm Password"
                placeholder="Enter confirm password"
                icon={<Lock size={18} color={colors.textSecondary} />}
                isSecure={secure2}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                rightIcon={
                  secure2
                    ? <Eye size={18} color={colors.textSecondary} />
                    : <EyeOff size={18} color={colors.textSecondary} />
                }
                onRightIconPress={() => setSecure2(!secure2)}
              />

              <ButtonWithLoader
                text="Reset Password"
                isLoading={loading}
                onPress={handleReset}
              />

            </View>

          </View>

        </KeyboardAvoidingView>

      </LinearGradient>

    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({

  hero: {
    flex: 1,
  },

  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
  },

  logo: {
    width: 150,
    height: 110,
    marginBottom: 10,
  },

  heroSubtitle: {
    color: "#fff",
    fontFamily: Fonts.quicksand.medium,
    fontSize: FontSizes.small,
    marginBottom: 25,
  },

  card: {
    width: "100%",
    padding: Spacing.lg,
    borderTopRightRadius: 40,
    borderWidth: 1,
    ...Shadows.small,
  },

  title: {
    fontFamily: Fonts.inter.bold,
    fontSize: FontSizes.large,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },

  skyline: {
    position: "absolute",
    bottom: 0,
    width: DeviceSize.width * 2,
    height: 90,
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  skylineTwo: {
    position: "absolute",
    bottom: 0,
    width: DeviceSize.width * 2,
    height: 60,
    backgroundColor: "rgba(255,255,255,0.15)",
  },

});