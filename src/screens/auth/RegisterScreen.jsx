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
  ScrollView,
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

import { Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react-native";
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {

  const { colors } = useTheme();
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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

  /* ================= REGISTER ================= */

  const handleRegister = () => {

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OtpScreen');
    }, 1500);

  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <StatusBar barStyle={"light-content"} />

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

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* LOGO */}

            <View style={styles.heroTop}>

              <Image
                source={require("../../../assets/images/logo.png")}
                style={styles.logo}
              />

              <Text style={styles.heroSubtitle}>
                Create your property account
              </Text>

            </View>

            {/* REGISTER CARD */}

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
                Create Account
              </Text>

              <Text
                style={[
                  styles.subtitle,
                  { color: colors.textSecondary },
                ]}
              >
                Register to start exploring properties
              </Text>

              <InputAuthField
                label="Full Name"
                placeholder="Enter name"
                icon={<User size={18} color={colors.textSecondary} />}
                value={name}
                onChangeText={setName}
              />

              <InputAuthField
                label="Phone Number"
                placeholder="Enter phone"
                icon={<Phone size={18} color={colors.textSecondary} />}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />

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
              <View style={{ marginTop: Spacing.sm }}>
                <ButtonWithLoader
                  text="Register"
                  isLoading={loading}
                  onPress={handleRegister}
                />
              </View>


              <View style={styles.bottomRow}>
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontFamily: Fonts.quicksand.medium,
                    fontSize: FontSizes.small,
                  }}
                >
                  Already have an account?
                </Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate('LoginScreen')}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: Fonts.quicksand.bold,
                      marginLeft: 6,
                      fontSize: FontSizes.small,
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>

            </View>

          </ScrollView>

        </KeyboardAvoidingView>

      </LinearGradient>

    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({

  hero: {
    flex: 1,
    justifyContent: "center",
  },

  heroTop: {
    alignItems: "center",
    marginTop: 40,
  },

  logo: {
    width: 150,
    height: 110,
  },

  heroSubtitle: {
    color: "#fff",
    fontFamily: Fonts.quicksand.medium,
    fontSize: FontSizes.small,
  },

  card: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    padding: Spacing.lg,
    borderTopRightRadius: BorderRadius.fty,
    borderWidth: 1,
    ...Shadows.medium,
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