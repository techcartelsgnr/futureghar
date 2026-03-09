import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from '../navigation/TabRoutes';
import {
  AddPropertyScreen,
  NotificationScreen,
  PropertyDetails,
  PropertyList,
} from './index';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabRoutes" component={TabRoutes} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="PropertyList" component={PropertyList} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
      <Stack.Screen name="AddPropertyScreen" component={AddPropertyScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
