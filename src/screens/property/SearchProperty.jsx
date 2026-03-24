import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
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

import { Search, SlidersHorizontal } from "lucide-react-native";
import PropertyCard from "../../screens/property/PropertyCard";
import ScreenWrapper from "../../components/ScreenWrapper";

export default function SearchProperty({ navigation }) {

  const { colors } = useTheme();

  const [search, setSearch] = useState("");

  const properties = [
    {
      id: "1",
      image: "https://picsum.photos/500/300",
      price: "75,00,000",
      title: "Luxury 3BHK Apartment",
      location: "Jaipur, Rajasthan",
      bedrooms: 3,
      bathrooms: 2,
      area: 1450,
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
    },
    {
      id: "3",
      image: "https://picsum.photos/500/302",
      price: "45,00,000",
      title: "2BHK Apartment",
      location: "Chandigarh",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
    },
  ];

  return (
    <ScreenWrapper
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >

      {/* HEADER */}

      <Text
        style={[
          styles.title,
          { color: colors.textPrimary },
        ]}
      >
        Search Property
      </Text>

      {/* SEARCH BAR */}

      <View
        style={[
          styles.searchBox,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          },
        ]}
      >

        <Search size={20} color={colors.textSecondary} />

        <TextInput
          placeholder="Search by location, property..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
          style={[
            styles.searchInput,
            { color: colors.textPrimary },
          ]}
        />

        <TouchableOpacity>
          <SlidersHorizontal
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>

      </View>

      {/* FILTER CHIPS */}

      <View style={styles.filterRow}>

        <TouchableOpacity
          style={[
            styles.filterChip,
            { backgroundColor: colors.surface },
          ]}
        >
          <Text style={{ color: colors.textSecondary }}>
            Price
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterChip,
            { backgroundColor: colors.surface },
          ]}
        >
          <Text style={{ color: colors.textSecondary }}>
            Beds
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterChip,
            { backgroundColor: colors.surface },
          ]}
        >
          <Text style={{ color: colors.textSecondary }}>
            Type
          </Text>
        </TouchableOpacity>

      </View>

      {/* PROPERTY LIST */}

      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (

          <PropertyCard
            item={item}
            onPress={() =>
              navigation.navigate("PropertyDetail", {
                item,
              })
            }
          />

        )}
      />

    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: Spacing.md,
  },

  title: {
    fontFamily: Fonts.inter.bold,
    fontSize: FontSizes.large,
    marginBottom: Spacing.sm,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: BorderRadius.large,
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.md,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 8,
    fontFamily: Fonts.quicksand.medium,
  },

  filterRow: {
    flexDirection: "row",
    marginBottom: Spacing.md,
  },

  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },

});