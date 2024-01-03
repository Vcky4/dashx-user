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
import endpoints from '../../../assets/endpoints/endpoints';
// import dings from '../../../assets/sounds/trilla.mp3'
import mainRouts from '../../navigation/routs/mainRouts';
import {AuthContext} from '../../../context/AuthContext';
import Bike from '../../../assets/icons/scooter.svg';
import Car from '../../../assets/icons/sedan.svg';
import Van from '../../../assets/icons/containertruck.svg';
import Truck from '../../../assets/icons/truck.svg';
import Button from '../../component/Button';

var Sound = require('react-native-sound');

export default AddDispatch = ({navigation}) => {
  //check if ready
  // const ready = variableUser?.data?.longitude != 0 && variableUser?.data?.is_online == 1;

  const data = [
    {name: 'Bike', id: 1, icon: <Bike />},
    {name: 'Car', id: 2, icon: <Car />},
    {name: 'Van', id: 3, icon: <Van />},
    {name: 'Truck', id: 4, icon: <Truck />},
  ];
  const {saveToken, saveUser, colorScheme, login, user} =
    useContext(AuthContext);

  const [selectedItem, setSelectedItem] = useState(null);
  const [processing, setProcessing] = useState(false);
  const canProceed = selectedItem?.name?.length > 2;
  const appearance = colorScheme;
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors[appearance].background,
        }}>
        <View
          style={{
            backgroundColor: colors[appearance].primary,
            borderBottomEndRadius: 15,
            borderBottomLeftRadius: 15,
            paddingTop: 40,
            paddingBottom: 26,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingStart: 30,
              marginTop: 20,
              width: '100%',
              paddingRight: 16,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 20,
                color: colors[appearance].textDark,
              }}>
              {user.name}
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(mainRouts.senderDetails);
              }}
              style={{
                backgroundColor: colors[appearance].black,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 35,
                width: 180,
                marginTop: 10,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 15,

                  color: colors.light.white,
                }}>
                Change sender
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              marginTop: 7,
            }}>
            <Image source={require('../../../assets/images/Truck.png')} />
            <Text
              style={{
                maxWidth: '70%',
                paddingStart: 10,
                fontFamily: 'Inter-Regular',
                fontSize: 14,
                color: colors[appearance].textDark,
              }}>
              kilometre 55, Lekki - Epe Expressway Sangotedo Ibeju-Lekki
            </Text>
          </View>
        </View>

        <ScrollView
          style={{
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                fontSize: 20,
                color: colors[appearance].textDark,
              }}>
              Delivery Type
            </Text>
            <Text
              style={{
                marginTop: 36,
                paddingStart: 20,
                fontFamily: 'Inter-SmeiBold',
                fontSize: 20,
                color: '#565656',
              }}>
              Select Pick-up Vehicle
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              alignSelf: 'center',
            }}>
            {data.map(item => (
              <TouchableOpacity
                onPress={() => {
                  console.log('Item Pressed:', item);
                  setSelectedItem(item);
                }}
                key={item.id}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  backgroundColor:
                    selectedItem?.id === item.id
                      ? colors[appearance].black
                      : colors[appearance].primary,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginStart: 12,
                }}>
                <View
                  style={{
                    backgroundColor: colors[appearance].white,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}>
                  {item?.icon}
                </View>
                <Text
                  style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 16,
                    color: '#565656',
                  }}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{
              marginTop: 61,
              backgroundColor: '#EBEBEB',

              borderRadius: 10,
              width: '100%',
              paddingHorizontal: 10,
              paddingBottom: 33,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(mainRouts.reciever);
              }}
              style={{
                backgroundColor: colors[appearance].black,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 35,
                width: 104,
                marginTop: 10,
                alignSelf: 'flex-end',
                marginEnd: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 15,

                  color: colors.light.white,
                }}>
                Receiver
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                marginTop: 7,
              }}>
              <Image source={require('../../../assets/images/Truck.png')} />
              <Text
                style={{
                  maxWidth: '80%',
                  paddingStart: 10,
                  fontFamily: 'Inter-Regular',
                  fontSize: 14,
                  color: colors[appearance].black,
                }}>
                kilometre 55, Lekki - Epe Expressway Sangotedo Ibeju-Lekki
              </Text>
            </View>
          </View>
          <Button
            title="Confirm"
            buttonStyle={{
              marginTop: 60,
              marginHorizontal: 20,
              borderRadius: 30,
            }}
            loading={processing}
            enabled={canProceed && !processing}
            textColor={colors[appearance].textDark}
            buttonColor={colors[appearance].primary}
            onPress={() => {
              signUpUser();
              // navigation.navigate(authRouts.otpVerification)
            }}
          />
        </ScrollView>
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
