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
  FlatList,
} from 'react-native';
import colors from '../../../assets/colors/colors';
import {AuthContext} from '../../../context/AuthContext';
import Bike from '../../../assets/icons/scooter.svg';
import Car from '../../../assets/icons/sedan.svg';
import Van from '../../../assets/icons/containertruck.svg';
import Truck from '../../../assets/icons/truck.svg';
import {ProgressBar, MD3Colors} from 'react-native-paper';
const {width} = Dimensions.get('window');
export default OrderItem = ({item, index, onPress, cancel}) => {
  const {saveToken, saveUser, colorScheme, token, login, user} =
    useContext(AuthContext);
  const appearance = colorScheme;

  const data = [
    {name: 'Bike', id: 1, icon: <Bike />},
    {name: 'Car', id: 2, icon: <Car />},
    {name: 'Van', id: 3, icon: <Van />},
    {name: 'Truck', id: 4, icon: <Truck />},
  ];

  const getVehicleIcon = vehicleType => {
    const vehicle = data.find(v => v.name === vehicleType);
    return vehicle ? vehicle.icon : null;
  };

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      activeOpacity={item && item?.order_status == 'pickup' ? 0.5 : 1}
      style={{
        paddingVertical: 6,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#A10F7E',
        paddingHorizontal: 10,
        marginHorizontal: 20,
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
            parcel#:{item && item?._id && item?._id?.substr(-6)}
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
              {item && item?.receiverphone}
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
          {item && item?.sendername}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', width: '65%'}}>
          <View
            style={{
              height: 40,
              width: 4,
              backgroundColor: '#000',
              marginStart: 7,

              marginTop: 7,
            }}></View>

          <Text
            style={{
              paddingStart: 10,
              maxWidth: '100%',
              color: '#868686',
              fontFamily: 'Inter-Regular',
              fontSize: 13,
            }}>
            {item && item?.senderaddress}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor:
              item?.order_status == 'pickup'
                ? '#31D0AA'
                : item?.order_status === 'accepted'
                ? '#A10F7E'
                : item?.order_status === 'shipping'
                ? '#31D0AA'
                : '#868686',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 15,
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 15,

              color: colors.light.white,
            }}>
            {item && item?.order_status === 'pickup'
              ? 'Picked up'
              : item?.order_status?.charAt(0).toUpperCase() +
                item?.order_status?.slice(1).toLowerCase()}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              {item && item?.receivername}
            </Text>
            <Text
              style={{
                color: '#868686',
                fontFamily: 'Inter-Regular',
                fontSize: 13,
                maxWidth: 200,
              }}>
              {item && item?.receiveraddress}
            </Text>
          </View>
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            cancel();
          }}
          style={{
            backgroundColor: 'red',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 15,
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 15,

              color: colors.light.white,
            }}>
            Cancel
          </Text>
        </TouchableOpacity> */}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 12,
        }}>
        {getVehicleIcon(item?.vehicle_type) || <Truck />}

        {/* <View
          style={{
            height: 2,
            width: '75%',
            backgroundColor:
              item?.order_status == 'pickup'
                ? '#31D0AA'
                : item?.order_status === 'delivered'
                ? '#A10F7E'
                : '#868686',
            marginHorizontal: 10,
          }}></View> */}

        <ProgressBar
          progress={
            item && item?.order_status === 'pending'
              ? 0
              : item && item?.order_status === 'pickup'
              ? 0.5
              : item && item?.order_status === 'accepted'
              ? 0.2
              : item && item?.order_status === 'shipping'
              ? 0.8
              : 1
          }
          style={{width: width * 0.56, marginHorizontal: 10}}
          color={
            item && item?.order_status == 'pickup'
              ? '#31D0AA'
              : item && item?.order_status === 'accepted'
              ? '#A10F7E'
              : item && item?.order_status === 'shipping'
              ? '#31D0AA'
              : '#868686'
          }
        />

        <Image
          tintColor={'#A10F7E'}
          style={{height: 30, width: 30}}
          source={require('../../../assets/images/delivery.png')}
        />
      </View>
    </TouchableOpacity>
  );
};
