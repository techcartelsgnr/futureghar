import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Animated,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import Clipboard from "@react-native-clipboard/clipboard";

import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Copy,
} from "lucide-react-native";

import AppHeader from "../../components/AppHeader";

import {
  useTheme,
  FontSizes,
  Spacing,
  BorderRadius,
  Fonts,
  Shadows,
  DeviceSize,
} from "../../theme/theme";

/* ================= CONTACT DATA ================= */

const CONTACTS = [
  {
    title: "Phone Number",
    value: "+91 9876543210",
    icon: Phone,
    action: () => Linking.openURL("tel:+919876543210"),
  },
  {
    title: "WhatsApp",
    value: "+91 9876543210",
    icon: MessageCircle,
    action: () => Linking.openURL("https://wa.me/919876543210"),
  },
  {
    title: "Email",
    value: "support@futureghar.com",
    icon: Mail,
    action: () => Linking.openURL("mailto:support@futureghar.com"),
  },
  {
    title: "Address",
    value: "10-721 66th Street, Saskatoon, Saskatchewan, S7P 0E4",
    icon: MapPin,
    action: () =>
      Linking.openURL(
        "https://www.google.com/maps/search/?api=1&query=Sri+Ganganagar"
      ),
  },
];

/* ================= COMPONENT ================= */

export default function HelpContactScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Help & Contact" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}

        <Text style={[styles.heading, { color: colors.textPrimary }]}>
          Get in touch
        </Text>

        <Text style={[styles.subText, { color: colors.textSecondary }]}>
          We’re here to help you anytime 🚀
        </Text>

        {/* MAP PREVIEW */}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            Linking.openURL(
              "https://www.google.com/maps/search/?api=1&query=Sri+Ganganagar"
            )
          }
        >
          <LinearGradient
            colors={[colors.primaryGradientStart, colors.primaryDark]}
            style={styles.mapCard}
          >
            <MapPin size={26} color="#fff" />
            <Text style={styles.mapText}>Open Location in Maps</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* CONTACT CARDS */}

        {CONTACTS.map((item, index) => {
          const scaleAnim = useRef(new Animated.Value(1)).current;
          const Icon = item.icon;

          const handlePressIn = () => {
            Animated.spring(scaleAnim, {
              toValue: 0.96,
              useNativeDriver: true,
            }).start();
          };

          const handlePressOut = () => {
            Animated.spring(scaleAnim, {
              toValue: 1,
              useNativeDriver: true,
            }).start();
          };

          return (
            <Animated.View
              key={index}
              style={{ transform: [{ scale: scaleAnim }] }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={item.action}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
              >
                <LinearGradient
                  colors={[colors.primaryGradientStart, colors.primaryDark]}
                  style={styles.card}
                >
                  {/* ICON */}
                  <View style={styles.iconBox}>
                    <Icon size={22} color="#fff" />
                  </View>

                  {/* TEXT */}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardValue}>{item.value}</Text>
                  </View>

                  {/* COPY */}
                  <TouchableOpacity
                    onPress={() => {
                      Clipboard.setString(item.value);
                      alert("Copied!");
                    }}
                  >
                    <Copy size={18} color="#fff" />
                  </TouchableOpacity>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>

      {/* FLOATING WHATSAPP BUTTON */}

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          Linking.openURL("https://wa.me/919876543210")
        }
      >
        <MessageCircle size={26} color="#fff" />
      </TouchableOpacity>
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
    paddingBottom: DeviceSize.hp(10),
  },

  heading: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.large,
  },

  subText: {
    fontFamily: Fonts.quicksand.medium,
    fontSize: FontSizes.small,
    marginBottom: Spacing.lg,
  },

  mapCard: {
    height: 80,
    borderRadius: BorderRadius.large,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  mapText: {
    color: "#fff",
    marginTop: 6,
    fontFamily: Fonts.quicksand.bold,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.large,
    marginBottom: Spacing.md,
  },

  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },

  cardTitle: {
    color: "#fff",
    fontFamily: Fonts.quicksand.medium,
    fontSize: FontSizes.small,
  },

  cardValue: {
    color: "#fff",
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.normal,
  },

  fab: {
    position: "absolute",
    bottom: 25,
    right: 20,
    backgroundColor: "#25D366",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});