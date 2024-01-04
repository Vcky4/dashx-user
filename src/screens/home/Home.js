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
import OrderItem from './orderItem';
var Sound = require('react-native-sound');

export default Home = ({navigation}) => {
  const {saveToken, saveUser, colorScheme, token, login, user} =
    useContext(AuthContext);
  const appearance = colorScheme;
  const [order, setOrder] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  //check if ready
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
        userid: user.userDetails._id,
      }), // body data type must match "Content-Type" header
    });
    response
      .json()
      .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call

        if (response.ok) {
           setRefreshing(false);
          setOrder(data.data);
        } else {
          // Toast.show({
          //   type: 'error',
          //   text1: 'Login failed',
          //   text2: data.message,
          // });
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

  useEffect(() => {
    retrieveOrder();
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
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 24,
              color: colors.light.white,
            }}>
            {user.userDetails.name}
          </Text>
        </View>
        <FlatList
          data={order}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 100,
              }}>
              <Text
                style={{
                  color: colors.Brand,
                  fontFamily: 'Jost-Medium',
                  fontSize: 16,
                }}>
                no order yet{' '}
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={retrieveOrder}
            />
          }
          renderItem={({item, index}) => (
            <OrderItem item={item} index={index + 1} />
          )}
        />
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
              {user.userDetails.address}
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
