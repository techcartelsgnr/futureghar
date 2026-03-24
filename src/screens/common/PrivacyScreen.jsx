import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

import AppHeader from "../../components/AppHeader";

import {
  useTheme,
  FontSizes,
  Spacing,
  Fonts,
} from "../../theme/theme";

export default function PrivacyScreen() {

  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >

      <AppHeader title="Privacy Policy" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* INTRO */}

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textPrimary },
          ]}
        >
          Introduction
        </Text>

        <Text
          style={[
            styles.text,
            { color: colors.textSecondary },
          ]}
        >
          We respect your privacy and are committed to protecting
          your personal information. This Privacy Policy explains
          how we collect, use, and protect your information when
          you use our property marketplace application.
        </Text>


        {/* INFORMATION WE COLLECT */}

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textPrimary },
          ]}
        >
          Information We Collect
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          • Personal information such as name, email address, and
          phone number.
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          • Property listing information uploaded by sellers.
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          • Device information and usage analytics.
        </Text>


        {/* HOW WE USE INFORMATION */}

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textPrimary },
          ]}
        >
          How We Use Your Information
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          • To provide property listing and search services.
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          • To connect buyers with sellers.
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          • To improve user experience and platform performance.
        </Text>


        {/* DATA SECURITY */}

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textPrimary },
          ]}
        >
          Data Security
        </Text>

        <Text
          style={[
            styles.text,
            { color: colors.textSecondary },
          ]}
        >
          We implement appropriate security measures to protect
          your personal information from unauthorized access,
          alteration, or disclosure.
        </Text>


        {/* CONTACT */}

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textPrimary },
          ]}
        >
          Contact Us
        </Text>

        <Text
          style={[
            styles.text,
            { color: colors.textSecondary },
          ]}
        >
          If you have any questions about this Privacy Policy,
          please contact our support team through the app.
        </Text>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  content: {
    padding: Spacing.md,
    paddingBottom: 60,
  },

  sectionTitle: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.medium,
    marginBottom: 8,
    marginTop: Spacing.md,
  },

  text: {
    fontFamily: Fonts.quicksand.medium,
    fontSize: FontSizes.small,
    lineHeight: 22,
    marginBottom: 6,
  },

});