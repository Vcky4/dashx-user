import React, {useContext, useEffect, useState} from 'react';
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

const Tab = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

function bottomData2(currentRoute) {
  const {colorScheme} = useContext(AuthContext);
  return [
    {
      icon: (
        <Image
          style={{width: 40, height: 40}}
          tintColor={colors[colorScheme].textDark}
          source={require('../../../assets/images/home.png')}
        />
      ),
      iconFilled: (
        <Image
          style={{width: 40, height: 40}}
          tintColor={colors[colorScheme].primary}
          source={require('../../../assets/images/home.png')}
        />
      ),
      route: mainRouts.home,
    },
    {
      icon: (
        <Image
          style={{width: 40, height: 40}}
          tintColor={colors[colorScheme].textDark}
          source={require('../../../assets/images/wallet.png')}
        />
      ),

      iconFilled: (
        <Image
          style={{width: 40, height: 40}}
          tintColor={colors[colorScheme].primary}
          source={require('../../../assets/images/wallet.png')}
        />
      ),
      route: mainRouts.wallet,
    },

    {
      icon: (
        <Image
          style={{width: 40, height: 40}}
          tintColor={colors[colorScheme].textDark}
          source={require('../../../assets/images/chat.png')}
        />
      ),
      iconFilled: (
        <Image
          style={{width: 40, height: 40}}
          tintColor={colors[colorScheme].primary}
          source={require('../../../assets/images/chat.png')}
        />
      ),
      route: mainRouts.chat,
    },
    {
      icon: (
        <Image
          style={{width: 40, height: 40}}
          tintColor={colors[colorScheme].textDark}
          source={require('../../../assets/images/profile.png')}
        />
      ),
      iconFilled: (
        <Image
          style={{width: 40, height: 40}}
          tintColor={colors[colorScheme].primary}
          source={require('../../../assets/images/profile.png')}
        />
      ),
      route: mainRouts.profile,
    },
  ];
}
const BottomNavStack = ({route, navigation}) => {
  const currentRoute = getFocusedRouteNameFromRoute(route) ?? mainRouts.home;
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const {saveToken, saveUser, colorScheme, login} = useContext(AuthContext);
  const appearance = colorScheme;
  return (
    <>
      <View
        style={{
          flex: 1,
          // paddingBottom: keyboardStatus ? 0 : 50,

          width: '100%',
        }}>
        <Tab.Navigator
          screenOptions={{
            contentStyle: {backgroundColor: colors[appearance].background},
          }}
          initialRouteName={mainRouts.home}>
          <Tab.Screen
            name={mainRouts.home}
            component={Home}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name={mainRouts.wallet}
            component={WalletScreen}
            options={{headerShown: false}}
          />

          <Tab.Screen
            name={mainRouts.chat}
            component={ChatScren}
            options={{headerShown: false}}
          />

          <Tab.Screen
            name={mainRouts.profile}
            component={ProfileScreen}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      </View>

      {!keyboardStatus && (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 24,
            paddingVertical: 16,
            backgroundColor: colors[appearance].background,
            justifyContent: 'space-between',
            width: '100%',
          }}>
          {bottomData2(currentRoute).map(data => (
            <TouchableOpacity
              onPress={() => {
                if (data.route == 'More') {
                  setModalVisible(true);
                } else {
                  navigation.navigate(data.route);
                }
              }}
              key={data.route}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {data.route === currentRoute ? data.iconFilled : data.icon}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

export default AuthPassed = () => {
  // const { user } = useContext(AuthContext);
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //     setTimeout(() => {
  //         if (user?.vehicle?.carModel) {
  //             if (user?.kyc?.type) {
  //                 if (user?.account?.accountNumber) {
  //                     navigation.navigate(mainRouts.home)
  //                     setIsLoading(false)
  //                 } else {
  //                     navigation.navigate(profileRouts.setBank)
  //                     setIsLoading(false)
  //                 }
  //             } else {
  //                 navigation.navigate(profileRouts.welcome)
  //                 setIsLoading(false)
  //             }
  //         } else {
  //             navigation.navigate(mainRouts.updateVehicle)
  //             setIsLoading(false)
  //         }
  //     }, 300);
  // }, [user]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'bottomNav'}
        component={BottomNavStack}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name={mainRouts.home}
        component={Home}
        options={{headerShown: false}}
      /> */}
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
    </Stack.Navigator>
  );
};
