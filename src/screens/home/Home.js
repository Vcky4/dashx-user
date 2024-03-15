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
  RefreshControl,
  Modal,
} from 'react-native';
import io from 'socket.io-client';
import colors from '../../../assets/colors/colors';
import TrackOrder from '../../../assets/icons/trackOrder.svg';
import { useFocusEffect } from '@react-navigation/native';
import endpoints from '../../../assets/endpoints/endpoints';
// import dings from '../../../assets/sounds/trilla.mp3'
import mainRouts from '../../navigation/routs/mainRouts';
import {AuthContext} from '../../../context/AuthContext';
import {counterEvent} from 'react-native/Libraries/Performance/Systrace';
import Button from '../../component/Button';
import OrderItem from './orderItem';
import getCurrentPosition from '../../../utils/getCurrentPosition';
import getAddress from '../../../utils/getAddress';
import Toast from 'react-native-toast-message';
var Sound = require('react-native-sound');

export default Home = ({navigation}) => {
  const {saveToken, saveUser, colorScheme, token, login, user, saveLatAndLong} =
    useContext(AuthContext);
  const appearance = colorScheme;
  const [order, setOrder] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // const ready = variableUser?.data?.longitude != 0 && variableUser?.data?.is_online == 1;\

  const retrieveOrder = async () => {
    setRefreshing(true);
    const response = await fetch(endpoints.baseUrl + endpoints.retrieveOrder, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        userid: user._id,
      }), // body data type must match "Content-Type" header
    });
    response
      .json()
      .then(data => {
        // console.log(data); // JSON data parsed by `data.json()` call

        if (response.ok) {
          setRefreshing(false);
          setOrder(data.data);
        } else {
          console.log('response: ', response);
          console.log('retrieveOrder error:', data.message);
        }
      })
      .catch(error => {
        setRefreshing(false);
        Toast.show({
          type: 'error',
          text1: 'retrieveOrder failed',
          text2: error.message,
        });
        console.log('retrieveOrder error:', error);
      });
  };




  const [currentAddress, setCurrentAddress] = useState('');
  useEffect(() => {
    retrieveOrder();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Fetch data whenever the screen gains focus
      retrieveOrder();
    }, [])
  );


  useEffect(() => {
    getCurrentPosition(callback => {
      if (callback?.position?.coords) {
        saveLatAndLong(
          callback.position.coords.latitude,
          callback.position.coords.longitude,
        );
        getAddress(
          callback.position.coords.latitude,
          callback.position.coords.longitude,
          results => {
            setCurrentAddress(
              results[0]?.formatted_address || 'Address not found',
            );
            // console.log('results', results[0])
          },
        );
      }
    });
  }, []);


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
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              position: 'absolute',
              top: 5,
              left: 20,
              zIndex: 100,
              backgroundColor: colors[colorScheme].white,
              borderRadius: 40,
              padding: 6,
              elevation: 10,
            }}>
            <Image
              source={require('../../../assets/images/menu.png')}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                borderRadius: 40,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 24,
              color: colors.light.white,
            }}>
            {user?.name}
          </Text>
        </View>
        <FlatList
          data={order && [...order].reverse()}
          contentContainerStyle={{paddingBottom: 30}}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 300,
              }}>
              <Text
                style={{
                  color: colors[appearance].textDark,
                  fontFamily: 'Inter-Medium',
                  fontSize: 25,
                }}>
                no order yet{' '}
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={retrieveOrder} />
          }
          renderItem={({item, index}) => (
            <OrderItem
              item={item}
              index={index + 1}
              onPress={() => {
                // if (
                //   item &&
                //   item?.order_status !== 'accpected' &&
                //   item?.order_status !== 'pending'
                // ) {
                  navigation.navigate(mainRouts.dispatchDetails, {
                    item: item,
                  });
                // }
              }}
              disabled={
                item?.order_status === 'accpected' ||
                item?.order_status === 'pending'
              }
              // cancel={() => {
              //   setIsVisible(true);
              //   setId(item?._id);

              // }}
            />
          )}
        />

      <View
        style={{
          width: '100%',
          borderRadius: 15,
          borderWidth: 1,
          borderColor: colors.light.white,
          backgroundColor: '#E6CEF2',
          paddingTop: 20,
          paddingBottom:Platform.OS=='ios'?20:0,
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
                paddingVertical: 5,
              }}>
              My Location:{' '}
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 16,
                  color: colors.light.black,
                }}>
                {currentAddress}
              </Text>
            </Text>
          </View>
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
