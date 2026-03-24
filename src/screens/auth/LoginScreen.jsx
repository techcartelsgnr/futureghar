import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
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

import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen({ setToken }) {

  const { colors } = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
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

  const handleLogin = () => {

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setToken("dummy-token"); // redirect to MainStack
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

          {/* CENTER CONTENT */}

          <View style={styles.centerWrapper}>

            {/* LOGO */}

            <Image
              source={require("../../../assets/images/logo.png")}
              style={styles.logo}
            />

            <Text style={styles.heroSubtitle}>
              Find your dream property easily
            </Text>

            {/* LOGIN CARD */}

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
                  styles.loginTitle,
                  { color: colors.textPrimary },
                ]}
              >
                Welcome Back
              </Text>

              <Text
                style={[
                  styles.loginSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                Login to continue
              </Text>

              <InputAuthField
                label="Email"
                placeholder="Enter email"
                icon={<Mail size={18} color={colors.textSecondary} />}
                value={email}
                onChangeText={setEmail}
              />

              <InputAuthField
                label="Password"
                placeholder="Enter password"
                icon={<Lock size={18} color={colors.textSecondary} />}
                isSecure={secure}
                value={password}
                onChangeText={setPassword}
                rightIcon={
                  secure
                    ? <Eye size={18} color={colors.textSecondary} />
                    : <EyeOff size={18} color={colors.textSecondary} />
                }
                onRightIconPress={() => setSecure(!secure)}
              />

              <TouchableOpacity style={styles.forgot}
                onPress={() => navigation.navigate("ForgotScreen")}
              >
                <Text
                  style={{
                    color: colors.primaryDark,
                    fontFamily: Fonts.quicksand.medium,
                    fontSize: FontSizes.small,
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <ButtonWithLoader
                text="Login"
                isLoading={loading}
                onPress={handleLogin}
              />

              <View style={styles.bottomRow}>
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontFamily: Fonts.quicksand.medium,
                    fontSize: FontSizes.small,
                  }}
                >
                  Don't have an account?
                </Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate("RegisterScreen")}
                >
                  <Text
                    style={{
                      color: colors.primaryDark,
                      fontFamily: Fonts.quicksand.bold,
                      marginLeft: 6,
                      fontSize: FontSizes.small,
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

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

  loginTitle: {
    fontFamily: Fonts.inter.bold,
    fontSize: FontSizes.large,
    textAlign: "center",
  },

  loginSubtitle: {
    fontFamily: Fonts.quicksand.medium,
    fontSize: FontSizes.small,
    marginBottom: Spacing.lg,
    textAlign: "center",
  },

  forgot: {
    alignSelf: "flex-end",
    marginBottom: Spacing.md,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.lg,
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