import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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

export default function InspectionReportScreen() {

  const { colors } = useTheme();

  const checklist = [
    "Structure Condition",
    "Water Supply",
    "Electrical System",
    "Parking Area",
    "Security System",
    "Nearby Amenities",
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >

      <AppHeader title="Inspection Report" />

      <ScrollView
        contentContainerStyle={{ padding: Spacing.md }}
      >

        {checklist.map((item, index) => (

          <View
            key={index}
            style={[
              styles.item,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >

            <Text
              style={[
                styles.text,
                { color: colors.textPrimary },
              ]}
            >
              {item}
            </Text>

            <Text style={{ color: "#2ECC71" }}>
              Passed
            </Text>

          </View>

        ))}

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  item: {
    borderWidth: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.large,
    marginBottom: Spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    ...Shadows.small,
  },

  text: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.small,
  },

});