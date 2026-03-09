import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Share,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

// lucide icons
import { Menu, Bell, Share2 } from "lucide-react-native";

// ✅ THEME (ONLY FROM CONTEXT)

import { DeviceSize, Fonts, useTheme } from "../theme/theme";

import { useDispatch, useSelector } from "react-redux";


const { width: screenWidth } = DeviceSize;

const Header = () => {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();
  // const { name } = useSelector((state) => state.auth);

  return (
    <View
      style={[
        styles.headerbox,
        {
          backgroundColor: colors.cardBackground,
          borderBottomColor: colors.divider,
        },
      ]}
    >
      {/* ================= LEFT SECTION ================= */}
      <View style={styles.headerAlign}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              styles.headerTopText,
              { color: colors.textPrimary },
            ]}
          >
            Hye,👋
          </Text>
          <Text
            style={[
              styles.headerTopText,
              { color: colors.textPrimary, marginLeft: 10, },
            ]}
          >
            Sandeep Gahlot
          </Text>

        </View>

        <Text
          style={[
            styles.headerText,
            { color: colors.textSecondary },
          ]}
          numberOfLines={1}
        >
          Edmonton (AB), Canada</Text>
      </View>

    </View>
  );
};

export default Header;

/* =====================================================
   🔹 STYLES
===================================================== */
const styles = StyleSheet.create({
  headerbox: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    flexDirection: "row",
    
  },

  headerAlign: {
    flexDirection: "column",
    flex: 1,
  },
  menuImage: {
    height: 24,
    width: 24,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTopText: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: RFValue(12),
  },

  headerText: {
    fontFamily: Fonts.quicksand.bold,
    fontSize: RFValue(11),
    maxWidth: screenWidth * 1,
  },
});
