import React, {useContext, useEffect, useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import mainRouts from '../routs/mainRouts';
import Home from '../../screens/home/Home';
import AddDispatch from '../../screens/home/AddDispatch';
import RecieverScreen from '../../screens/home/RecieverScreen';
import SenderDetailScreen from '../../screens/home/SenderDetailScreen';
import DrawerContent from './DrawerContent';
import orderDetailsScreen from '../../screens/home/orderDetailsScreen';
import Profile from '../../screens/profile/Profile';

const Tab = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

export default DrawerStack = () => {
  return (
    <>
      <Drawer.Navigator drawerContent={props => DrawerContent(props, () => {})}>
        <Drawer.Screen
          name="Main"
          component={AuthPassed}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </>
  );
};

const AuthPassed = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name={'bottomNav'}
        component={BottomNavStack}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name={mainRouts.home}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={mainRouts.AddDispatch}
        component={AddDispatch}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={mainRouts.reciever}
        component={RecieverScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={mainRouts.senderDetails}
        component={SenderDetailScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={mainRouts.dispatchDetails}
        component={orderDetailsScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={mainRouts.profile}
        component={Profile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
