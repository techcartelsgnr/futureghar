import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  StatusBar
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  useTheme,
  FontSizes,
  Spacing,
  BorderRadius,
  TextStyles,
  Shadows,
  Fonts,
} from '../../theme/theme';

import {
  User,
  Crown,
  Home,
  Bookmark,
  Star,
  HelpCircle,
  Shield,
  FileText,
  ChevronRight,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const { colors, isDarkMode, toggleTheme } = useTheme();

  const [switchAnim] = useState(new Animated.Value(isDarkMode ? 1 : 0));

  const toggleDarkMode = () => {
    Animated.timing(switchAnim, {
      toValue: isDarkMode ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();

    toggleTheme();
  };

  const translateX = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const MenuItem = ({ icon: Icon, title, rightText, isSwitch }) => {
    return (
      <TouchableOpacity
        style={[
          styles.menuRow,
          { borderBottomColor: colors.divider },
        ]}
      >
        <View
          style={[
            styles.menuIcon,
            { backgroundColor: colors.surface },
          ]}
        >
          <Icon size={18} color={colors.textPrimary} />
        </View>

        <Text
          style={[
            styles.menuText,
            { color: colors.textPrimary },
          ]}
        >
          {title}
        </Text>

        <View style={styles.menuRight}>
          {rightText && (
            <Text style={styles.activeText}>
              {rightText}
            </Text>
          )}

          {isSwitch ? (
            <TouchableOpacity
              onPress={toggleDarkMode}
              activeOpacity={0.9}
              style={[
                styles.switchTrack,
                {
                  backgroundColor: isDarkMode
                    ? colors.primary
                    : colors.border,
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.switchThumb,
                  { transform: [{ translateX }] },
                ]}
              />
            </TouchableOpacity>
          ) : (
            <ChevronRight
              size={18}
              color={colors.textSecondary}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, paddingBottom: 60, }}>
      {/* ✅ STATUS BAR */}
      <StatusBar
        translucent={false}
        backgroundColor={colors.background}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: Spacing.sm }}
      >
        {/* PROFILE HEADER */}

        <View style={styles.header}>
          <View style={styles.profileLeft}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: colors.surface },
              ]}
            >
              <User size={22} color={colors.primary} />
            </View>

            <View>
              <Text
                style={[
                  styles.name,
                  { color: colors.textPrimary },
                ]}
              >
                Elio Strom
              </Text>

              <Text
                style={{
                  color: colors.textSecondary,
                  fontFamily: Fonts.quicksand.medium,
                  fontSize: FontSizes.small,
                }}
              >
                iamelio25@gmail.com
              </Text>
            </View>
          </View>

          <TouchableOpacity>
            <Text
              style={{
                color: colors.primary,
                fontFamily: Fonts.quicksand.medium,
                fontSize: FontSizes.small,
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>

        {/* GLASS PREMIUM CARD */}

        <View
          style={[
            styles.premiumCard,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.premiumTop}>
            <View
              style={[
                styles.premiumIcon,
                { backgroundColor: colors.surface },
              ]}
            >
              <Crown size={20} color={colors.primary} />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.premiumTitle,
                  { color: colors.textPrimary },
                ]}
              >
                Upgrade to Premium
              </Text>

              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: FontSizes.small,
                  fontFamily: Fonts.quicksand.bold,
                  fontSize: FontSizes.nine,
                }}
              >
                Access unlimited properties enquiries and chats
              </Text>
            </View>
          </View>

          {/* GRADIENT BUTTON */}

          <TouchableOpacity activeOpacity={0.85}>
            <LinearGradient
              colors={[
                colors.primary,
                '#ff6b6b',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.premiumButton}
            >
              <Text style={styles.buttonText}>
                $29.00 / Month
              </Text>

              <ChevronRight size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* MENU LIST */}

        <View
          style={[
            styles.menuContainer,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <MenuItem
            icon={Home}
            title="My Property"
            rightText="Active"
          />

          <MenuItem
            icon={Bookmark}
            title="Saved Properties"
          />

          <MenuItem
            icon={Crown}
            title="Dark Mode"
            isSwitch
          />

          <MenuItem
            icon={Star}
            title="Rate Our App"
          />

          <MenuItem
            icon={HelpCircle}
            title="Help & Contact"
          />

          <MenuItem
            icon={Shield}
            title="Privacy Policy"
          />

          <MenuItem
            icon={FileText}
            title="Terms & Conditions"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },

  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },

  name: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.normal,
  },

  premiumCard: {
    marginHorizontal: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.large,
    borderWidth: 1,
    marginBottom: Spacing.lg,
    ...Shadows.medium,
  },

  premiumTop: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    alignItems: 'center',
  },

  premiumIcon: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },

  premiumTitle: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.normal,
  },

  premiumButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.medium,
  },

  buttonText: {
    color: '#fff',
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.medium,
  },

  menuContainer: {
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.large,
    overflow: 'hidden',
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
  },

  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },

  menuText: {
    flex: 1,
    fontFamily: Fonts.quicksand.bold,
    fontSize: FontSizes.small,
  },

  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  activeText: {
    color: '#22c55e',
    marginRight: 8,
    fontSize: FontSizes.small,
  },

  switchTrack: {
    width: 44,
    height: 24,
    borderRadius: 20,
    justifyContent: 'center',
  },

  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
});