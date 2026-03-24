import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import {
  Home,
  Phone,
  MapPin,
  Image,
  AlertTriangle,
  HelpCircle,
} from "lucide-react-native";

import AppHeader from "../../components/AppHeader";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import InputAuthField from "../../components/InputAuthField";

import {
  useTheme,
  FontSizes,
  BorderRadius,
  Spacing,
  Fonts,
  DeviceSize,
} from "../../theme/theme";

/* ================= ISSUE DATA ================= */

const issues = [
  {
    label: "Property Sold / Rented Out",
    value: "1",
    icon: Home,
  },
  {
    label: "Advertiser Not Responding",
    value: "2",
    icon: Phone,
  },
  {
    label: "Incorrect Location / Address",
    value: "3",
    icon: MapPin,
  },
  {
    label: "Fake / Incorrect Images",
    value: "4",
    icon: Image,
  },
  {
    label: "Wrong Property Details",
    value: "5",
    icon: AlertTriangle,
  },
  {
    label: "Other",
    value: "6",
    icon: HelpCircle,
  },
];

/* ================= COMPONENT ================= */

export default function Feedback() {
  const { colors } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= ANIMATION ================= */

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onFocus = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start();
  };

  const onBlur = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  /* ================= SUBMIT ================= */

  const submitFeedback = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Feedback submitted successfully");
    }, 1000);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <AppHeader title="Report An Issue" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* NAME */}

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <InputAuthField
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </Animated.View>

        {/* EMAIL */}

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <InputAuthField
            label="Email ID"
            placeholder="Enter your email Id"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </Animated.View>

        {/* MOBILE */}

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <InputAuthField
            label="Mobile Number"
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />
        </Animated.View>

        {/* MESSAGE */}

        <Text
          style={[
            styles.label,
            { color: colors.textSecondary },
          ]}
        >
          Message
        </Text>

        <TextInput
          placeholder="Anything else to share, Share it here (optional)"
          placeholderTextColor={colors.textTertiary}
          multiline
          value={message}
          onChangeText={setMessage}
          onFocus={onFocus}
          onBlur={onBlur}
          style={[
            styles.textArea,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.divider,
              color: colors.textPrimary,
            },
          ]}
        />

        {/* ISSUE DROPDOWN */}

        <Text
          style={[
            styles.label,
            { color: colors.textSecondary },
          ]}
        >
          Select Issue
        </Text>

        <Dropdown
          style={[
            styles.dropdown,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.divider,
            },
          ]}
          placeholderStyle={[
            styles.placeholderStyle,
            { color: colors.textTertiary },
          ]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            { color: colors.textPrimary },
          ]}
          inputSearchStyle={[
            styles.inputSearchStyle,
            { color: colors.textPrimary },
          ]}
          data={issues}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Search or select issue"
          searchPlaceholder="Search issue..."
          value={issue}
          onChange={(item) => {
            setIssue(item.value);
          }}
          renderItem={(item) => {
            const Icon = item.icon;
            return (
              <View style={styles.item}>
                <Icon size={18} color="#888" />
                <Text style={styles.itemText}>{item.label}</Text>
              </View>
            );
          }}
        />

        {/* SUBMIT BUTTON */}

        <View style={{ marginTop: Spacing.xl }}>
          <ButtonWithLoader
            text="Submit"
            isLoading={loading}
            onPress={submitFeedback}
            bgColor="#FF6B00"
          />
        </View>
      </ScrollView>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: Spacing.lg,
    paddingBottom: DeviceSize.hp(4),
  },

  label: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.small,
    marginBottom: 6,
    marginTop: Spacing.sm,
  },

  textArea: {
    borderWidth: 1,
    borderRadius: BorderRadius.large,
    padding: Spacing.md,
    minHeight: DeviceSize.hp(12),
    textAlignVertical: "top",
    fontFamily: Fonts.quicksand.medium,
    fontSize: FontSizes.small,
  },

  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: BorderRadius.large,
    paddingHorizontal: Spacing.md,
  },

  placeholderStyle: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.quicksand.medium,
  },

  selectedTextStyle: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.quicksand.medium,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: FontSizes.small,
    fontFamily: Fonts.quicksand.medium,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },

  itemText: {
    marginLeft: 10,
    fontSize: FontSizes.small,
    fontFamily: Fonts.quicksand.medium,
  },
});