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
  TextInput,
  TouchableOpacity,
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

import ButtonWithLoader from "../../components/ButtonWithLoader";

export default function OtpScreen() {

  const { colors } = useTheme();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const inputs = useRef([]);

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

  /* ================= TIMER ================= */

  useEffect(() => {

    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  /* ================= OTP INPUT ================= */

  const handleChange = (text, index) => {

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }

  };

  /* ================= VERIFY ================= */

  const handleVerify = () => {

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      
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

          {/* CENTER WRAPPER */}

          <View style={styles.centerWrapper}>

            {/* LOGO */}

            <Image
              source={require("../../../assets/images/logo.png")}
              style={styles.logo}
            />

            <Text style={styles.heroSubtitle}>
              Verify your mobile number
            </Text>

            {/* OTP CARD */}

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
                Enter OTP
              </Text>

              <Text
                style={[
                  styles.subtitle,
                  { color: colors.textSecondary },
                ]}
              >
                We have sent a verification code
              </Text>

              {/* OTP BOXES */}

              <View style={styles.otpRow}>

                {otp.map((digit, index) => (

                  <TextInput
                    key={index}
                    ref={(ref) => (inputs.current[index] = ref)}
                    value={digit}
                    onChangeText={(text) =>
                      handleChange(text, index)
                    }
                    keyboardType="number-pad"
                    maxLength={1}
                    style={[
                      styles.otpInput,
                      {
                        borderColor: colors.border,
                        color: colors.textPrimary,
                      },
                    ]}
                  />

                ))}

              </View>

              <ButtonWithLoader
                text="Verify OTP"
                isLoading={loading}
                onPress={handleVerify}
              />

              <TouchableOpacity
                disabled={timer !== 0}
                onPress={() => setTimer(30)}
              >

                <Text
                  style={[
                    styles.resend,
                    {
                      color:
                        timer === 0
                          ? colors.primary
                          : colors.textSecondary,
                    },
                  ]}
                >
                  {timer === 0
                    ? "Resend OTP"
                    : `Resend in ${timer}s`}
                </Text>

              </TouchableOpacity>

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
    marginBottom: 20,
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
  },

  subtitle: {
    fontFamily: Fonts.quicksand.medium,
    fontSize: FontSizes.small,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },

  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: BorderRadius.medium,
    textAlign: "center",
    fontSize: FontSizes.large,
    fontFamily: Fonts.quicksand.bold,
  },

  resend: {
    marginTop: Spacing.md,
    textAlign: "center",
    fontFamily: Fonts.quicksand.medium,
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