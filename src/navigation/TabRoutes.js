import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, DeviceSize } from '../theme/theme';
import CustomBottomTabBar from '../components/CustomBottomTabBar';

import {
  AddPropertyScreen,
  HomeScreen,
  ProfileScreen,
  PropertyDetails,
} from './index';

const Tab = createBottomTabNavigator();

// -------------------- Bottom Tabs --------------------
export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomBottomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/tab/home.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddPropertyScreen"
        component={AddPropertyScreen}
        options={{
          tabBarLabel: 'Add Property',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/tab/home.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />

      

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/tab/profile.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// -------------------- Styles --------------------
const styles = StyleSheet.create({
  icon: {
    width: DeviceSize.wp(4),
    height: DeviceSize.wp(4),
    resizeMode: 'contain',
  },
});
