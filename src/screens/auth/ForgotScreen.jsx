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

import InputAuthField from "../../components/InputAuthField";
import ButtonWithLoader from "../../components/ButtonWithLoader";

import { Phone, Key } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function ForgotScreen() {

  const { colors } = useTheme();
  const navigation = useNavigation();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

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

  /* ================= FLOATING PARTICLES ================= */

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

  /* ================= GET OTP ================= */

  const handleGetOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('ResetScreen');
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
              Reset your account password
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
                Forgot Password
              </Text>

              <InputAuthField
                label="Mobile Number"
                placeholder="Enter mobile number"
                keyboardType="phone-pad"
                icon={<Phone size={18} color={colors.textSecondary} />}
                value={phone}
                onChangeText={setPhone}
              />

              <InputAuthField
                label="Enter OTP"
                placeholder="Enter OTP"
                keyboardType="number-pad"
                icon={<Key size={18} color={colors.textSecondary} />}
                value={otp}
                onChangeText={setOtp}
                rightIcon={
                  <TouchableOpacity>
                    <Text style={{
                      fontFamily: Fonts.quicksand.bold,
                      fontSize: FontSizes.small,
                    }}>Get OTP</Text>
                  </TouchableOpacity>
                }
              />

              <ButtonWithLoader
                text="Submit"
                isLoading={loading}
                onPress={handleGetOtp}
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