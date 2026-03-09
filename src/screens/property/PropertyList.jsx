import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  useTheme,
  FontSizes,
  Fonts,
  Spacing,
  BorderRadius,
  TextStyles,
  Shadows,
} from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';

const PropertyList = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  /* ---------------- Dummy Data ---------------- */

  const propertyData = [
    {
      id: '1',
      title: 'Riverview Estate',
      subtitle: '4BHK - Luxury Villa',
      price: '$2.8M',
      loan: '90% Loan Avl.',
      image:
        'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198',
    },
    {
      id: '2',
      title: 'Sunnydale Cottage',
      subtitle: '2BHK - Cozy Retreat',
      price: '$1.2M',
      loan: '75% Loan Avl.',
      image:
        'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198',
    },
    {
      id: '3',
      title: 'Modern Sky Villa',
      subtitle: '5BHK - Smart Home',
      price: '$3.5M',
      loan: '80% Loan Avl.',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    },
    {
      id: '4',
      title: 'Greenwood House',
      subtitle: '3BHK - Garden Villa',
      price: '$2.1M',
      loan: '85% Loan Avl.',
      image:
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
    },
  ];

  /* ---------------- Property Card ---------------- */

  const renderProperty = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.card,
          { backgroundColor: colors.cardBackground },
        ]}
        onPress={() => navigation.navigate('PropertyDetails')}
      >
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.cardContent}>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              { color: colors.textPrimary },
            ]}
          >
            {item.title}
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.textSecondary },
            ]}
          >
            {item.subtitle}
          </Text>

          <View style={styles.priceRow}>
            <Text
              style={[
                styles.price,
                { color: colors.textPrimary },
              ]}
            >
              {item.price}
            </Text>

            <Text
              style={[
                styles.loan,
                { color: colors.primary },
              ]}
            >
              {item.loan}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        
      ]}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textPrimary },
          ]}
        >
          Popular Residentials
        </Text>

        <TouchableOpacity>
          <Text
            style={{
              color: colors.primary,
              fontSize: FontSizes.small,
              fontFamily: Fonts.quicksand.bold,
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {/* PROPERTY GRID */}

      <FlatList
        data={propertyData}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{
          paddingBottom: Spacing.xl,
        }}
      />
    </View>
  );
};

export default PropertyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },

  sectionTitle: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.medium,
  },

  card: {
    width: '48%',
    borderRadius: BorderRadius.large,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Shadows.small,
  },

  image: {
    width: '100%',
    height: 120,
  },

  cardContent: {
    padding: Spacing.sm,
  },

  title: {
   fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.small,
    fontWeight: '600',
  },

  subtitle: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.xsmall,
    marginTop: 2,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },

  price: {
   fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.small,
  },

  loan: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.xsmall,
  },
});