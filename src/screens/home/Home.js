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
          paddingHorizontal: 33,
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
              fontSize: 24,
              paddingStart: 25,
              color: colors[appearance].textDark,
            }}>
            Track orders
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 6,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: '#A10F7E',
            paddingHorizontal: 10,
            marginTop: 31,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 16,

                  color: colors[appearance].textDark,
                }}>
                1
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  tintColor={colors[appearance].textDark}
                  style={{height: 20, width: 20}}
                  source={require('../../../assets/images/call.png')}
                />
                <Text
                  style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 16,

                    color: colors[appearance].textDark,
                  }}>
                  08166565462
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                height: 18,
                width: 18,
                backgroundColor: '#A10F7E',
                borderRadius: 20,
                marginEnd: 7,
                marginTop: 10,
              }}></View>

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 15,

                color: colors[appearance].textDark,
              }}>
              {user.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', width: '100%'}}>

            <View
              style={{
                height: 60,
                width: 4,
                backgroundColor: '#000',
                marginStart: 7,

                marginTop: 7,
              }}></View>

            <Text style={{paddingStart: 10, maxWidth: '70%', color: '#868686'}}>
              kilometre 55, Lekki - Epe Expressway Sangotedo Ibeju-Lekki
            </Text>
        
          </View>

          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: 18,
                width: 18,
                backgroundColor: '#31D0AA',
                borderRadius: 20,
                marginEnd: 7,
                marginTop: 7,
              }}></View>

            <View style={{}}>
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 15,
                  color: colors[appearance].textDark,
                }}>
                Frank Bambi
              </Text>
              <Text style={{paddingStart: 4, color: '#868686'}}>
                kilometre 55, Lekki - Epe Expressway Sangotedo Ibeju-Lekki
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
