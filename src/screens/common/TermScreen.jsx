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

export default function TermScreen() {

  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >

      <AppHeader title="Terms & Conditions" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Acceptance of Terms
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          By using our property marketplace application, you agree
          to comply with and be bound by these Terms and
          Conditions.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          User Responsibilities
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          • Provide accurate property information.
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          • Do not upload misleading or fraudulent listings.
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          • Follow local property laws and regulations.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Platform Usage
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          The platform acts as an intermediary between buyers and
          sellers. We do not guarantee the accuracy of listings
          provided by users.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Limitation of Liability
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          We are not responsible for disputes, damages, or losses
          resulting from property transactions conducted through
          the platform.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Changes to Terms
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          We reserve the right to update or modify these Terms at
          any time. Continued use of the app constitutes acceptance
          of the updated terms.
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