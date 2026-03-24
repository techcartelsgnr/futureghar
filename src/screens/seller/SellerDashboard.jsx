import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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

import {
  Home,
  PlusCircle,
  ClipboardList,
  IndianRupee,
  TrendingUp,
} from "lucide-react-native";

import ScreenWrapper from "../../components/ScreenWrapper";

export default function SellerDashboard({ navigation }) {

  const { colors } = useTheme();

  const StatCard = ({ icon: Icon, title, value }) => (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
    >
      <Icon size={24} color={colors.primary} />

      <Text
        style={[
          styles.statValue,
          { color: colors.textPrimary },
        ]}
      >
        {value}
      </Text>

      <Text
        style={[
          styles.statTitle,
          { color: colors.textSecondary },
        ]}
      >
        {title}
      </Text>
    </View>
  );

  const ActionCard = ({ icon: Icon, title, onPress }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.actionCard,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
    >
      <Icon size={24} color={colors.primary} />

      <Text
        style={[
          styles.actionText,
          { color: colors.textPrimary },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >

      <AppHeader title="Seller Dashboard" showBack={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* DASHBOARD TITLE */}

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textPrimary },
          ]}
        >
          Overview
        </Text>

        {/* STATS */}

        <View style={styles.statsRow}>

          <StatCard
            icon={Home}
            title="Total Listings"
            value="12"
          />

          <StatCard
            icon={TrendingUp}
            title="Active Listings"
            value="8"
          />

        </View>

        <View style={styles.statsRow}>

          <StatCard
            icon={ClipboardList}
            title="Sold Properties"
            value="4"
          />

          <StatCard
            icon={IndianRupee}
            title="Total Earnings"
            value="₹45L"
          />

        </View>

        {/* QUICK ACTIONS */}

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textPrimary },
          ]}
        >
          Quick Actions
        </Text>

        <View style={styles.actionGrid}>

          <ActionCard
            icon={PlusCircle}
            title="Add Property"
            onPress={() =>
              navigation.navigate("AddPropertyScreen")
            }
          />

          <ActionCard
            icon={Home}
            title="My Listings"
            onPress={() =>
              navigation.navigate("MyListingsScreen")
            }
          />

          <ActionCard
            icon={ClipboardList}
            title="Inspections"
            onPress={() =>
              navigation.navigate("InspectionRequestsScreen")
            }
          />

        </View>

      </ScrollView>

    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  content: {
    padding: Spacing.md,
  },

  sectionTitle: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.medium,
    marginBottom: Spacing.sm,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },

  statCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.large,
    borderWidth: 1,
    marginRight: 10,
    alignItems: "center",
    ...Shadows.small,
  },

  statValue: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.large,
    marginTop: 8,
  },

  statTitle: {
    fontFamily: Fonts.quicksand.medium,
    fontSize: FontSizes.small,
    marginTop: 4,
  },

  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: Spacing.sm,
  },

  actionCard: {
    width: "48%",
    padding: Spacing.md,
    borderRadius: BorderRadius.large,
    borderWidth: 1,
    marginBottom: Spacing.md,
    marginRight: "4%",
    alignItems: "center",
    ...Shadows.small,
  },

  actionText: {
    marginTop: 6,
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.small,
  },

});