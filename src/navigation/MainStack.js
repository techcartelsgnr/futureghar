import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from '../navigation/TabRoutes';
import {
  AddPropertyScreen,
  EditProfile,
  Feedback,
  HelpContactScreen,
  InspectionRequestsScreen,
  MyListingsScreen,
  NotificationScreen,
  PrivacyScreen,
  PropertyDetails,
  PropertyList,
  RefundScreen,
  TermScreen,
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
      <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
      <Stack.Screen name="RefundScreen" component={RefundScreen} />
      <Stack.Screen name="TermScreen" component={TermScreen} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="HelpContactScreen" component={HelpContactScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />

      {/* seller screens */}
      <Stack.Screen name="InspectionRequestsScreen" component={InspectionRequestsScreen} />
      <Stack.Screen name="MyListingsScreen" component={MyListingsScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
