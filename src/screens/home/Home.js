import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Dimensions,
  TextInput,
  Animated,
  ScrollView,
} from 'react-native';
import io from 'socket.io-client';
import colors from '../../../assets/colors/colors';
import TrackOrder from '../../../assets/icons/trackOrder.svg';

import endpoints from '../../../assets/endpoints/endpoints';
// import dings from '../../../assets/sounds/trilla.mp3'
import mainRouts from '../../navigation/routs/mainRouts';
import {AuthContext} from '../../../context/AuthContext';
import {counterEvent} from 'react-native/Libraries/Performance/Systrace';
import Button from '../../component/Button';
var Sound = require('react-native-sound');

export default Home = ({navigation}) => {
  const {saveToken, saveUser, colorScheme, login, user} =
    useContext(AuthContext);
  const appearance = colorScheme;

  //check if ready
  // const ready = variableUser?.data?.longitude != 0 && variableUser?.data?.is_online == 1;
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors[appearance].background,
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors[appearance].primary,
            height: 50,
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 24,
              color: colors.light.white,
            }}>
            {user.name}
          </Text>
        </View>
        <ScrollView
          style={{
            paddingHorizontal: 18,
            paddingVertical: 16,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                fontSize: 24,
                color: colors[appearance].textDark,
              }}>
              Wallet: {'  '}
              <Text>₦ 4,589.55</Text>
            </Text>
          </View>

          <View
            style={{
              paddingVertical: 20,
              borderWidth: 1,
              borderRadius: 15,
              borderColor: '#A10F7E',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              marginTop: 10,
            }}>
            <TrackOrder fill={colors[appearance].textDark} />
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 20,
                paddingStart: 25,
                color: colors[appearance].textDark,
              }}>
              Track orders
            </Text>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          width: '100%',
          borderRadius: 15,
          borderWidth: 1,
          borderColor: colors.light.white,
          backgroundColor: '#E6CEF2',
          paddingTop: 20,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(mainRouts.AddDispatch);
          }}
          style={{
            backgroundColor: colors[appearance].primary,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 15,
            width: 180,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 15,

              color: colors.light.white,
            }}>
            Add Dispatch
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            marginTop: 21,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              height: 10,
              width: 10,
              backgroundColor: '#21EB00',
              marginEnd: 5,
              borderRadius: 10,
            }}></View>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: 'Inter-Medium',
              fontSize: 16,
              color: colors.dark.black,
              maxWidth: '80%',
            }}>
            My Location:{' '}
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                color: colors.dark.black,
              }}>
              25, Ogeretedo Street, Dopemu,Agege
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
});
