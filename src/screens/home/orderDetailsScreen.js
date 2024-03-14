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
  Linking,
  ActivityIndicator,
  Modal,
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
import Toast from 'react-native-toast-message';
var Sound = require('react-native-sound');

export default Home = ({navigation, route}) => {
  const {saveToken, saveUser, colorScheme, token, login, user} =
    useContext(AuthContext);
  const {item} = route.params;
  const appearance = colorScheme;
  const [order, setOrder] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isvisble, setIsVisible] = useState(false);

  //check if ready
  // const ready = variableUser?.data?.longitude != 0 && variableUser?.data?.is_online == 1;\

  const retreivesingleOder = async () => {
    setRefreshing(true);
    const response = await fetch(
      endpoints.baseUrl + endpoints.retriveSingleorder,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          userid: user?._id,
          orderid: item._id,
        }), // body data type must match "Content-Type" header
      },
    );
    response
      .json()
      .then(data => {
        console.log('item', data.data); // JSON data parsed by `data.json()` call

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
    retreivesingleOder();
  }, []);


  const CancelOrder = async id => {
    setLoading(true);

    // Remove the canceled order from the state
    // const updatedOrders = order && order?.filter(item => item._id !== id);
    // setOrder(updatedOrders);

    const response = await fetch(endpoints.baseUrl + endpoints.cancelOrder, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        userid: user._id,
        orderid: id,
      }),
    });

    response
      .json()
      .then(data => {
        // console.log(data);

        if (response.ok) {
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Cancel Successfully',
            text2: data.message,
          });
          navigation.navigate(mainRouts.home);
        } else {
          console.log('response: ', response);
          console.log('cancel error:', data.message);
          Toast.show({
            type: 'error',
            text1: 'Cancel failed',
            text2: data.message,
          });
        }
      })
      .catch(error => {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Cancel failed',
          text2: error.message,
        });
        console.log('cancel error:', error);
      });
  };
  //   useEffect(() => {
  //     setTimeout(() => {
  //         retreivesingleOder();
  //     }, 5000)
  // }, [])
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors[appearance].background,
        }}>
        {refreshing ? (
          <ActivityIndicator
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            animating={refreshing}
            size="large"
            color={colors[colorScheme].primary}
          />
        ) : (
          <View>
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
                  
                }}>
                <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                  <ArrowBack fill={'#fff'} />
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 24,
                    color: colors.light.white,
                    flex:0.9,
                    textAlign:'center'

                  
                  }}>
                  Dispatch Details
                </Text>
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
                    backgroundColor:
                      order && order?.order?.order_status == 'pickup'
                        ? '#31D0AA'
                        : order && order?.order?.order_status === 'accepted'
                        ? '#A10F7E'
                        : order && order?.order?.order_status === 'shipping'
                        ? '#31D0AA'
                        : '#868686',
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
                    {order && order?.order?.order_status}
                    {/* {item?.order_status.charAt(0).toUpperCase() +
              item?.order_status.slice(1).toLowerCase()} */}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView>
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
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{height: 39, width: 39, borderRadius: 20}}
                      source={
                        order
                          ? {uri: order && order?.order?.dispatchid?.photo}
                          : require('../../../assets/images/images.png')
                      }
                    />
                    <View style={{paddingStart: 10}}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: 18,
                          color: colors.dark.black,
                        }}>
                        {order?.order?.dispatchid?.name
                          ? order?.order?.dispatchid?.name
                          : 'not available'}
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Inter-Regular',
                          fontSize: 14,
                          color: colors.dark.subText,
                        }}>
                        {order?.order?.dispatchid?.email
                          ? order?.order?.dispatchid?.email
                          : 'not available'}
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Inter-Regular',
                          fontSize: 14,
                          color: colors.dark.subText,
                        }}>
                        {order?.order?.dispatchid?.phone
                          ? order?.order?.dispatchid?.phone
                          : 'not available'}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        marginEnd: 10,
                      }}
                      onPress={() => {
                        //navigate to whatsapp
                        //regex to replace first 0 with +234
                        const number = order?.order?.dispatchid?.phone
                          ? order?.order?.dispatchid?.phone.replace(
                              /^0/,
                              '+234',
                            )
                          : '00000000000';

                        Linking.openURL(`https://wa.me/${number}`);
                      }}>
                      <Image
                        source={require('../../../assets/images/whatsapp.png')}
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors[colorScheme].primary,
                        borderRadius: 20,
                        padding: 6,
                      }}
                      onPress={() => {
                        const number = order?.order?.dispatchid?.phone
                          ? order?.order?.dispatchid?.phone
                          : '00000000000';
                        // call
                        Linking.openURL(`tel:${number}`);
                      }}>
                      <Image
                        source={require('../../../assets/images/phone.png')}
                        style={{
                          width: 22,
                          height: 22,
                          resizeMode: 'contain',
                          tintColor: colors[colorScheme].white,
                        }}
                      />
                    </TouchableOpacity>
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
                        {order
                          ? order?.order?.dispatchid?._id &&
                            order?.order?.dispatchid?._id?.substr(-6)
                          : 'not available'}
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
                    {order ? order?.order?.senderaddress : 'not available'}
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
                    {order ? order?.order?.receiveraddress : 'not available'}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(true);
                  }}
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
                  {loading ? (
                    <ActivityIndicator
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      animating={loading}
                      size="small"
                      color={colors[colorScheme].primary}
                    />
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'Inter-Medium',
                        fontSize: 24,
                        color: colors.dark.primary,
                      }}>
                      cancel order
                    </Text>
                  )}
                </TouchableOpacity>
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
                    {order
                      ? order?.order?._id && order?.order?._id?.substr(-6)
                      : 'not available'}
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
                    {order && order?.pickuptime}
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
                    {order?.payment_method ? 'Wallet' : 'Cash'}
                  </Text>
                </View>

                {/* <View
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
                    {order && order.order.productname}
                  </Text>
                </View> */}
              </View>
            </ScrollView>
          </View>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isvisble}
        onRequestClose={() => {
          setIsVisible(!isvisble);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: colors[appearance].background,
              width: '85%',
              borderRadius: 20,
              paddingVertical: 20,
              paddingHorizontal:20
            }}>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                fontSize: 20,
                color: colors[appearance].textDark,
                alignSelf: 'center',
              }}>
              Are you sure u want to cancel this order
            </Text>
            <ScrollView
              style={{
                marginTop: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                  justifyContent: 'space-between',
                  paddingHorizontal: 16,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(false);
                  }}
                  style={{
                    backgroundColor: colors.dark.primary,
                    height: 40,
                    width: '40%',
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
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(false);
                    CancelOrder(order?.order?._id);
                  }}
                  style={{
                    backgroundColor: 'black',
                    height: 40,
                    width: '40%',
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
                    Proceed
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
