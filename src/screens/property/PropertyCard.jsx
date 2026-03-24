import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  useTheme,
  FontSizes,
  Spacing,
  BorderRadius,
  Fonts,
  Shadows,
} from "../../theme/theme";

import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
} from "lucide-react-native";

export default function PropertyCard({ item, onPress }) {

  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
    >

      {/* PROPERTY IMAGE */}

      <View style={styles.imageWrapper}>

        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />

        {/* FAVORITE */}

        <TouchableOpacity style={styles.favorite}>
          <Heart size={18} color="#fff" />
        </TouchableOpacity>

      </View>

      {/* PROPERTY INFO */}

      <View style={styles.content}>

        <Text
          style={[
            styles.price,
            { color: colors.primary },
          ]}
        >
          ₹ {item.price}
        </Text>

        <Text
          numberOfLines={1}
          style={[
            styles.title,
            { color: colors.textPrimary },
          ]}
        >
          {item.title}
        </Text>

        {/* LOCATION */}

        <View style={styles.locationRow}>

          <MapPin size={14} color={colors.textSecondary} />

          <Text
            numberOfLines={1}
            style={[
              styles.location,
              { color: colors.textSecondary },
            ]}
          >
            {item.location}
          </Text>

        </View>

        {/* PROPERTY FEATURES */}

        <View style={styles.featureRow}>

          <View style={styles.featureItem}>
            <Bed size={16} color={colors.textSecondary} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              {item.bedrooms}
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Bath size={16} color={colors.textSecondary} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              {item.bathrooms}
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Square size={16} color={colors.textSecondary} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>
              {item.area} sqft
            </Text>
          </View>

        </View>

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    borderRadius: BorderRadius.large,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: Spacing.md,
    ...Shadows.small,
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 180,
  },

  favorite: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 6,
    borderRadius: 20,
  },

  content: {
    padding: Spacing.md,
  },

  price: {
    fontFamily: Fonts.inter.bold,
    fontSize: FontSizes.medium,
    marginBottom: 2,
  },

  title: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.normal,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  location: {
    marginLeft: 4,
    fontFamily: Fonts.quicksand.medium,
    fontSize: FontSizes.small,
  },

  featureRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
  },

  featureText: {
    marginLeft: 4,
    fontFamily: Fonts.quicksand.medium,
    fontSize: FontSizes.small,
  },

});