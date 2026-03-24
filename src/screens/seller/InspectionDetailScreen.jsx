import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import AppHeader from "../../components/AppHeader";

import {
  useTheme,
  FontSizes,
  Spacing,
  BorderRadius,
  Fonts,
  Shadows,
} from "../../theme/theme";

export default function InspectionDetailScreen({ route, navigation }) {

  const { colors } = useTheme();

  const { item } = route.params;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >

      <AppHeader title="Inspection Detail" />

      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          },
        ]}
      >

        <Text style={[styles.title, { color: colors.textPrimary }]}>
          {item.property}
        </Text>

        <Text style={{ color: colors.textSecondary }}>
          Location: {item.location}
        </Text>

        <Text style={{ color: colors.textSecondary }}>
          Inspection Date: {item.date}
        </Text>

        <Text style={{ color: colors.textSecondary }}>
          Inspector: John Smith
        </Text>

        <Text style={{ color: colors.textSecondary }}>
          Status: {item.status}
        </Text>

      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: colors.primary },
        ]}
        onPress={() =>
          navigation.navigate("InspectionReport")
        }
      >

        <Text style={styles.btnText}>
          View Inspection Report
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: Spacing.md,
  },

  card: {
    borderWidth: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.large,
    ...Shadows.small,
  },

  title: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.medium,
    marginBottom: 10,
  },

  button: {
    marginTop: 20,
    padding: 14,
    borderRadius: BorderRadius.large,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontFamily: Fonts.quicksand.bold,
  },

});