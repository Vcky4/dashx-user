import React, {useContext, useEffect, useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import HomeIcon from '../../../assets/icons/homeIcon.svg';
import HomeIconFilled from '../../../assets/icons/homeIconFileed.svg';
import WalletFilled from '../../../assets/icons/walletFilled.svg';
import Wallet from '../../../assets/icons/walletFilled.svg';
import Chat from '../../../assets/icons/chats.svg';
import ChatFilled from '../../../assets/icons/chatFilled.svg';
import Profile from '../../../assets/icons/profile.svg';
import ProfileFilled from '../../../assets/icons/profileIconFilled.svg';
import {createDrawerNavigator} from '@react-navigation/drawer';
import mainRouts from '../routs/mainRouts';
import Home from '../../screens/home/Home';
import colors from '../../../assets/colors/colors';
import ChatScren from '../../screens/home/ChatScren';
import ProfileScreen from '../../screens/home/Profile';
import WalletScreen from '../../screens/home/Wallet';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {AuthContext} from '../../../context/AuthContext';
import {Image, Keyboard, Text, TouchableOpacity, View} from 'react-native';
import AddDispatch from '../../screens/home/AddDispatch';
import RecieverScreen from '../../screens/home/RecieverScreen';
import SenderDetailScreen from '../../screens/home/SenderDetailScreen';
import DrawerContent from './DrawerContent';
import orderDetailsScreen from '../../screens/home/orderDetailsScreen';

const Tab = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  const {colorScheme} = useContext(AuthContext);
  const panelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPanel = () => {
    panelRef.current?.togglePanel();
  };
  return (
    <>
      <Drawer.Navigator
        drawerContent={props =>
          DrawerContent(props, () => {
            openPanel();
          })
        }>
        <Drawer.Screen
          name="Main"
          component={AuthPassed}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
      {/* <BottomSheet
        isOpen={false}
        wrapperStyle={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          elevation: 10,
          backgroundColor: colors[colorScheme].background,
          flex: 1,
        }}
        sliderMaxHeight={height * 0.8}
        outerContentStyle={{
          width: width,
          left: -20.5,
        }}
        lineContainerStyle={
          {
            // display: 'none'
          }
        }
        sliderMinHeight={0}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        ref={ref => (panelRef.current = ref)}>
        <View
          style={{
            backgroundColor: '#E6CEF2',
            top: -95,
            alignSelf: 'center',
            borderRadius: 30,
            position: 'absolute',
            paddingHorizontal: 20,
            paddingVertical: 6,
            display: isOpen ? 'flex' : 'none',
          }}>
          <Text
            style={{
              color: colors[colorScheme].black,
              fontSize: 16,
              fontFamily: 'Inter-SemiBold',
            }}>
            Pending Orders
          </Text>
        </View>
        <PendingOrder />
      </BottomSheet> */}
    </>
  );
};

export default AuthPassed = () => {
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
    </Stack.Navigator>
  );
};
