import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import PropertyCard from "../../screens/property/PropertyCard";

import {
  useTheme,
  FontSizes,
  Spacing,
  Fonts,
} from "../../theme/theme";

export default function MyListingsScreen({ navigation }) {

  const { colors } = useTheme();

  const [listings] = useState([
    {
      id: "1",
      image: "https://picsum.photos/500/300",
      price: "75,00,000",
      title: "Luxury 3BHK Apartment",
      location: "Jaipur, Rajasthan",
      bedrooms: 3,
      bathrooms: 2,
      area: 1450,
      status: "Active",
    },
    {
      id: "2",
      image: "https://picsum.photos/500/301",
      price: "55,00,000",
      title: "Modern Villa",
      location: "Delhi",
      bedrooms: 4,
      bathrooms: 3,
      area: 2100,
      status: "Sold",
    },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>

      <PropertyCard
        item={item}
        onPress={() =>
          navigation.navigate("PropertyDetail", { item })
        }
      />

      <Text
        style={[
          styles.status,
          {
            color:
              item.status === "Active"
                ? "#2ECC71"
                : "#E74C3C",
          },
        ]}
      >
        {item.status}
      </Text>

    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >

      <AppHeader title="My Listings" />

      {listings.length === 0 ? (

        <View style={styles.emptyContainer}>

          <Text
            style={[
              styles.emptyText,
              { color: colors.textSecondary },
            ]}
          >
            You haven't listed any properties yet.
          </Text>

        </View>

      ) : (

        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: Spacing.md,
          }}
        />

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  cardWrapper: {
    marginBottom: Spacing.md,
  },

  status: {
    position: "absolute",
    top: 10,
    right: 10,
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.small,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontFamily: Fonts.quicksand.medium,
    fontSize: FontSizes.normal,
  },

});