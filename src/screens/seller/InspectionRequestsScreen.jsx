import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
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
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  MapPin,
} from "lucide-react-native";

export default function InspectionRequestsScreen() {
  const { colors } = useTheme();

  const [activeTab, setActiveTab] = useState("Pending");
  const [refreshing, setRefreshing] = useState(false);

  const [requests, setRequests] = useState([
    {
      id: "1",
      property: "Luxury 3BHK Apartment",
      location: "Jaipur, Rajasthan",
      date: "12 Apr 2026",
      status: "Pending",
    },
    {
      id: "2",
      property: "Modern Villa",
      location: "Delhi",
      date: "15 Apr 2026",
      status: "Scheduled",
    },
    {
      id: "3",
      property: "2BHK Apartment",
      location: "Chandigarh",
      date: "01 Apr 2026",
      status: "Completed",
    },
  ]);

  const filtered = useMemo(
    () => requests.filter((r) => r.status === activeTab),
    [requests, activeTab]
  );

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  const renderCard = ({ item }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.rowTop}>
        <Text style={[styles.property, { color: colors.textPrimary }]}>
          {item.property}
        </Text>

        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                item.status === "Completed"
                  ? "#2ECC71"
                  : item.status === "Scheduled"
                  ? "#3498DB"
                  : "#F39C12",
            },
          ]}
        >
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <MapPin size={16} color={colors.textSecondary} />
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          {item.location}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Calendar size={16} color={colors.textSecondary} />
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          {item.date}
        </Text>
      </View>

      {/* ACTION BUTTONS */}

      <View style={styles.actions}>

        {item.status === "Pending" && (
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.primary }]}
          >
            <CheckCircle size={16} color="#fff" />
            <Text style={styles.btnText}>Approve</Text>
          </TouchableOpacity>
        )}

        {item.status === "Scheduled" && (
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#3498DB" }]}
          >
            <Clock size={16} color="#fff" />
            <Text style={styles.btnText}>Reschedule</Text>
          </TouchableOpacity>
        )}

        {item.status === "Completed" && (
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#2ECC71" }]}
          >
            <FileText size={16} color="#fff" />
            <Text style={styles.btnText}>View Report</Text>
          </TouchableOpacity>
        )}

      </View>
    </View>
  );

  const Tab = ({ label }) => {
    const active = activeTab === label;

    return (
      <TouchableOpacity
        onPress={() => setActiveTab(label)}
        style={[
          styles.tab,
          {
            backgroundColor: active
              ? colors.primary
              : colors.surface,
          },
        ]}
      >
        <Text
          style={{
            color: active ? "#fff" : colors.textSecondary,
            fontFamily: Fonts.quicksand.bold,
            fontSize: FontSizes.small,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <AppHeader title="Inspection Requests" />

      {/* FILTER TABS */}

      <View style={styles.tabs}>
        <Tab label="Pending" />
        <Tab label="Scheduled" />
        <Tab label="Completed" />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: Spacing.md }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={{ color: colors.textSecondary }}>
              No inspection requests found
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.sm,
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  card: {
    borderWidth: 1,
    borderRadius: BorderRadius.large,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.small,
  },

  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  property: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.normal,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontSize: FontSizes.xsmall,
    fontFamily: Fonts.quicksand.bold,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  infoText: {
    marginLeft: 6,
    fontFamily: Fonts.quicksand.medium,
    fontSize: FontSizes.small,
  },

  actions: {
    flexDirection: "row",
    marginTop: Spacing.sm,
  },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.medium,
    marginRight: 10,
  },

  btnText: {
    color: "#fff",
    marginLeft: 6,
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.small,
  },

  empty: {
    alignItems: "center",
    marginTop: 80,
  },
});