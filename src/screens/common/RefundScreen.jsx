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

export default function RefundScreen() {

  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >

      <AppHeader title="Refund Policy" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Overview
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          Our refund policy explains the conditions under which
          refunds may be issued for services provided on our
          property marketplace platform.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Eligibility for Refunds
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          • Payments made for listing promotions may be refundable
          if the service was not delivered.
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          • Refund requests must be submitted within 7 days of
          purchase.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Non-Refundable Services
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          • Completed inspection services.
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          • Successful property transactions.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Processing Time
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          Approved refunds are processed within 5-10 business days
          depending on the payment provider.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Contact
        </Text>

        <Text style={[styles.text, { color: colors.textSecondary }]}>
          For refund requests please contact our support team
          through the app.
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