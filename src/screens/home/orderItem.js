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

export default OrderItem = ({item, index}) => {
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
    <View
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
            {index}
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
              {item.receiverphone}
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
          {item?.sendername}
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
            {item?.senderaddress}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor:
              item?.order_status == 'pickup'
                ? '#31D0AA'
                : item?.order_status == 'Accepted'
                ? '#A10F7E'
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
            {item?.order_status.charAt(0).toUpperCase() +
              item?.order_status.slice(1).toLowerCase()}
          </Text>
        </TouchableOpacity>
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
            {item?.receivername}
          </Text>
          <Text
            style={{
              color: '#868686',
              fontFamily: 'Inter-Regular',
              fontSize: 13,
            }}>
            {item?.receiveraddress}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 12,
        }}>
        {getVehicleIcon(item?.vehicle_type)}

        <View
          style={{
            height: 2,
            width: '75%',
            backgroundColor: item?.order_status == 'pickup'
            ? '#31D0AA'
            : item?.order_status == 'Accepted'
            ? '#A10F7E'
            : '#868686',
            marginHorizontal: 10,
          }}></View>

        <Image
          tintColor={'#A10F7E'}
          style={{height: 30, width: 30}}
          source={require('../../../assets/images/delivery.png')}
        />
      </View>
    </View>
  );
};
