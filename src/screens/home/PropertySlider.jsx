import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { Phone } from 'lucide-react-native';

import {
  useTheme,
  FontSizes,
  Spacing,
  BorderRadius,
  DeviceSize,
  TextStyles,
  Shadows,
  Fonts,
} from '../../theme/theme';

const PropertySlider = () => {
  const { colors } = useTheme();

  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  /* ---------------- Dummy Data ---------------- */

  const sliderData = [
    {
      id: '1',
      title: 'The Ultimate Tower',
      subtitle: '5 Floor Residential Building',
      price: '$22.5L - 50.5L',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    },
    {
      id: '2',
      title: 'Sky Residency',
      subtitle: 'Luxury Apartment Complex',
      price: '$18.5L - 40.5L',
      image:
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
    },
    {
      id: '3',
      title: 'Sunset Villa',
      subtitle: 'Premium 4BHK Villa',
      price: '$35L - 70L',
      image:
        'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198',
    },
  ];

  /* ---------------- Auto Slider ---------------- */

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;

      if (nextIndex >= sliderData.length) {
        nextIndex = 0;
      }

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 3000); // change slide every 3 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

  /* ---------------- Track Visible Item ---------------- */

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  };

  /* ---------------- Slider Card ---------------- */

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardWrapper}>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={styles.content}>
            <Text
              style={[styles.title, { color: colors.textPrimary }]}
              numberOfLines={1}
            >
              {item.title}
            </Text>

            <Text
              style={[
                styles.subtitle,
                { color: colors.textSecondary },
              ]}
              numberOfLines={2}
            >
              {item.subtitle}
            </Text>

            <Text
              style={[styles.price, { color: colors.textPrimary }]}
            >
              {item.price}
            </Text>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: colors.primary },
              ]}
            >
              <Phone size={16} color="#fff" />

              <Text style={styles.buttonText}>
                Enquire Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>

      {/* SLIDER */}

      <FlatList
        ref={flatListRef}
        data={sliderData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      {/* PAGINATION */}

      <View style={styles.pagination}>
        {sliderData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === activeIndex
                    ? colors.primary
                    : colors.border,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default PropertySlider;

const styles = StyleSheet.create({
  cardWrapper: {
    width: DeviceSize.width,
    paddingHorizontal: Spacing.md,
  },

  card: {
    flexDirection: 'row',
    borderRadius: BorderRadius.large,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },

  image: {
    width: 110,
    height: 120,
    borderRadius: BorderRadius.medium,
    marginRight: Spacing.sm,
  },

  content: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: Spacing.smt,
  },

  title: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.inter.bold,
  },

  subtitle: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.quicksand.bold,
    marginTop: 0,
  },

  price: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.azeret.bold,
    marginTop: 4,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.medium,
    marginTop: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: FontSizes.small,
    marginLeft: 6,
    fontWeight: '600',
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },

  dot: {
    width: 16,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
});