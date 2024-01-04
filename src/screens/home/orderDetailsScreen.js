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
import ArrowBack from '../../../assets/icons/backIcon.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import Time from '../../../assets/icons/time.svg';
import Wallet from '../../../assets/icons/wallet.svg';
import Chart from '../../../assets/icons/cart.svg';
import Scotter from '../../../assets/icons/scooter.svg';
import LocationIcon from '../../../assets/icons/loaction.svg';

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
            backgroundColor: colors[appearance].primary,
            height: 150,
            paddingTop: 10,
            width: '100%',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowBack fill={'#fff'} />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 24,
                color: colors.light.white,
                textAlign: 'center',
                paddingStart: 20,
              }}>
              Dispatch Details
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 15,
                  backgroundColor: '#31D0AA',
                  marginEnd: 5,
                }}
              />

              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: 17,
                  color: colors.light.white,
                }}>
                ONLINE
              </Text>
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 30,
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                fontSize: 24,
                color: colors.light.black,
              }}>
              status:
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: '#31D0AA',

                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 15,
                marginStart: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 15,

                  color: colors.light.white,
                }}>
                Picked-up
                {/* {item?.order_status.charAt(0).toUpperCase() +
              item?.order_status.slice(1).toLowerCase()} */}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#E6CEF2',
            paddingVertical: 10,
            marginHorizontal: 5,
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Image
              style={{height: 39, width: 39, borderRadius: 20}}
              source={require('../../../assets/images/images.png')}
            />
            <View style={{paddingStart: 10}}>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 18,
                  color: colors.dark.black,
                }}>
                James Tarver
              </Text>

              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 14,
                  color: colors.dark.subText,
                }}>
                jamestarver@gmail.com
              </Text>

              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 14,
                  color: colors.dark.subText,
                }}>
                09073552620
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: 20,
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
            }}>
            <Scotter />
            <View style={{paddingHorizontal: 10}}>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 10,
                  color: colors.dark.black,
                }}>
                Enroute Pickup
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '95%',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 10,
                    color: colors.dark.black,
                  }}>
                  Parcel ID:
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 11,
                    color: colors.dark.black,
                  }}>
                  #A1287845
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: 24,
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
              marginTop: 26,
            }}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: colors.dark.primary,
                borderRadius: 15,
              }}
            />
            <Text
              style={{
                fontFamily: 'Inter-Medium',
                fontSize: 16,
                color: colors.dark.subText,
                paddingStart: 15,
              }}>
              25, Ogeretedo Street Dopemu, Agege
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 24,
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
              marginTop: 26,
            }}>
            <LocationIcon />
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                color: colors.dark.subText,
                paddingStart: 16,
              }}>
              Kilometre 55, Lekki - Epe
            </Text>
          </View>

          <View
            style={{
              borderRadius: 30,
              borderWidth: 1,
              borderColor: '#A10F7E',
              paddingHorizontal: 10,
              paddingVertical: 13,
              width: 200,
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Medium',
                fontSize: 24,
                color: colors.dark.primary,
              }}>
              47RJ4O4UR
            </Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
          <Text
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: 18,
              color: colors.dark.black,
            }}>
            Order Details
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <EditIcon />
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: 18,
                  color: colors.dark.subText,
                  paddingStart: 10,
                }}>
                Order ID:
              </Text>
            </View>

            <Text
              style={{
                fontFamily: 'Inter-Medium',
                fontSize: 14,
                color: colors.dark.subText,
              }}>
              #A1287845
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Time />
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: 18,
                  color: colors.dark.subText,
                  paddingStart: 10,
                }}>
                Pick Up Time
              </Text>
            </View>

            <Text
              style={{
                fontFamily: 'Inter-Medium',
                fontSize: 14,
                color: colors.dark.subText,
              }}>
              02:56AM
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Wallet />
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: 18,
                  color: colors.dark.subText,
                  paddingStart: 10,
                }}>
                Payment Type
              </Text>
            </View>

            <Text
              style={{
                fontFamily: 'Inter-Medium',
                fontSize: 14,
                color: colors.dark.subText,
              }}>
              PAID Cash
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Chart />
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: 18,
                  color: colors.dark.subText,
                  paddingStart: 10,
                }}>
                Items Ordered
              </Text>
            </View>

            <Text
              style={{
                fontFamily: 'Inter-Medium',
                fontSize: 14,
                color: colors.dark.subText,
              }}>
              Iphone 14 pro max
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
