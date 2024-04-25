import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from 'react';
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
import CheckIcon from '../../../assets/icons/check.svg';

import OrderItem from './orderItem';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';
import formatNumber from '../../../utils/formatNumber';
var Sound = require('react-native-sound');

export default Home = ({
  navigation,
  goBack,
  requestData,
  requestData2,
  setRequestData2,
  setRequestData,
  total_fee,
  selectedItem,
  setSelectedItem,
}) => {
  const {saveToken, saveUser, colorScheme, token, login, user} =
    useContext(AuthContext);

  const appearance = colorScheme;
  const [order, setOrder] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selected, setSelected] = useState('Wallet');
  const [payment_method, setPaymementMethod] = useState(true);

  const data = [
    {anme: 'Wallet', id: 1},
    {anme: 'Pay on Delivery', id: 2},
  ];
  // console.log(user);
  const handleBackPress = () => {
    if (step > 1) {
      // Decrease the step to go back in the component's "flow"
      setStep(prevStep => prevStep - 1);
      return true; // Prevent the default back behavior
    }
    // Allow the default back action to occur
    return false;
  };

  const AddDispatch = async () => {
    setProcessing(true);
    const response = await fetch(endpoints.baseUrl + endpoints.addDispatch, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        userid: user._id,
        vehicle_type: selectedItem,
        total_fee: total_fee,
        payment_method: payment_method,
        sendername: requestData.fullname,
        productname: requestData2.ProductName,
        senderaddress: requestData.address,
        sendercity: user.city || requestData.city,
        senderphone: requestData.Phone,
        senderlandmark: requestData.LandMark,
        receivername: requestData2.fullname,
        receiverphone: requestData2.Phone,
        receiveraddress: requestData2.address,
        receivercity: requestData2.city,
        receiverlandmark: requestData2.LandMark,
        senderlong: user.longitude || requestData.senderlong.toString(),
        senderlat: user.latitude || requestData.senderlat.toString(),
        receiverlat: requestData2.receiverlat.toString(),
        receiverlong: requestData2.receiverlong.toString(),
        trackingid: 0,
      }), // body data type must match "Content-Type" header
    });
    response
      .json()
      .then(data => {
        // console.log(data); // JSON data parsed by `data.json()` call
        setProcessing(false);
        if (response.ok) {
          Toast.show({
            type: 'success',
            text1: 'DisPatch successful',
            text2: data.message,
          });
          setRequestData({
            fullname: '',
            Phone: '',
            address: '',
            state: '',
            LandMark: '',
            ProductName: '',
            city: '',
            senderlong: '',
            senderlat: '',
          });
          setRequestData2({
            fullname: '',
            Phone: '',
            address: '',
            state: '',
            LandMark: '',
            ProductName: '',
            city: '',
            receiverlat: '',
            receiverlong: '',
          });
          setSelectedItem(null);
          navigation.navigate(mainRouts.home);
        } else {
          setProcessing(false);
          Toast.show({
            type: 'error',
            text1: 'DisPatch failed',
            text2: data.message,
          });

          console.log('response: ', response);
          console.log('Login error:', data.message);
        }
      })
      .catch(error => {
        setProcessing(false);
        Toast.show({
          type: 'error',
          text1: 'Login failed',
          text2: error.message,
        });
        console.log('Login error:', error);
      });
  };

  const [wallet, setWallet] = useState({});
  const getBalance = () => {
    fetch(endpoints.baseUrl + endpoints.retreive, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        userid: user?._id,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        console.log('resJson', resJson);
        if (resJson.status) {
          setWallet(resJson.data);
        }
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, []),
  );

  const onRefresh = () => {
    getBalance();
  };

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
                height: 60,
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
                <TouchableOpacity
                  onPress={() => {
                    goBack();
                  }}>
                  <ArrowBack fill={'#fff'} />
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 24,
                    color: colors.light.white,
                    textAlign: 'center',
                    flex: 1,
                  }}>
                  Dispatch Summary
                </Text>
              </View>
            </View>
            <ScrollView>
              <View
                style={{
                  paddingVertical: 10,
                  marginHorizontal: 5,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontSize: 18,
                      color: colors[appearance].textDark,
                    }}>
                    Sender Name:
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter-Regular',
                      fontSize: 16,
                      color: colors[appearance].textDark,
                      paddingStart: 16,
                    }}>
                    {requestData?.fullname}
                  </Text>
                </View>

                <View
                  style={{
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontSize: 18,
                      color: colors[appearance].textDark,
                    }}>
                    Receiver Name:
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter-Regular',
                      fontSize: 16,
                      color: colors[appearance].textDark,
                      paddingStart: 16,
                    }}>
                    {requestData2?.fullname}
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontSize: 18,
                      color: colors[appearance].textDark,
                    }}>
                    Sender Number:
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter-Regular',
                      fontSize: 16,
                      color: colors[appearance].textDark,
                      paddingStart: 16,
                    }}>
                    {requestData?.Phone}
                  </Text>
                </View>

                <View
                  style={{
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontSize: 18,
                      color: colors[appearance].textDark,
                    }}>
                    Receiver Number:
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter-Regular',
                      fontSize: 16,
                      color: colors[appearance].textDark,
                      paddingStart: 16,
                    }}>
                    {requestData2?.Phone}
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontSize: 18,
                      color: colors[appearance].textDark,
                    }}>
                    PickUp Location:{' '}
                    <Text
                      style={{
                        fontFamily: 'Inter-Medium',
                        fontSize: 16,
                        color: colors[appearance].textDark,
                        paddingStart: 15,
                        overflow: 'hidden',
                      }}>
                      {' '}
                      {requestData?.address}
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontSize: 18,
                      color: colors[appearance].textDark,
                    }}>
                    dropoff Location:
                    <Text
                      style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 16,
                        color: colors[appearance].textDark,
                        paddingStart: 16,
                        textAlign: 'right',
                      }}>
                      {' '}
                      {requestData2?.address}
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      fontSize: 18,
                      color: colors[appearance].textDark,
                    }}>
                    Description:
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter-Regular',
                      fontSize: 16,
                      color: colors[appearance].textDark,
                      paddingStart: 16,
                    }}>
                    {requestData2?.ProductName}
                  </Text>
                </View>

                {/* <TouchableOpacity
                  onPress={() => {}}
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
                    {order && order?.ordercode?.order_code}
                  </Text>
                </TouchableOpacity> */}
              </View>

              <View style={{paddingHorizontal: 20, paddingTop: 20}}>
                <Text
                  style={{
                    fontFamily: 'Inter-Bold',
                    fontSize: 18,
                    color: colors[appearance].textDark,
                  }}>
                  choose payment method
                </Text>

                {data.map(item => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected(item?.anme);
                      if (item?.anme === 'Pay on Delivery') {
                        setPaymementMethod(false);
                      } else {
                        setPaymementMethod(true);
                      }
                    }}
                    key={item.id}
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
                      <View
                        style={{
                          height: 20,
                          width: 20,
                          backgroundColor: colors[appearance].primary,
                          borderRadius: 15,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                        
                            display: selected == item.anme ? 'flex' : 'none',

                           
                          }}>
                          <CheckIcon />
                        </View>
                      </View>
                      <Text
                        style={{
                          fontFamily: 'Inter-Bold',
                          fontSize: 18,
                          color: colors[appearance].textDark,
                          paddingStart: 10,
                        }}>
                        {item?.anme}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: 14,
                          marginStart: 10,
                          display: item?.anme == 'Wallet' ? 'flex' : 'none',
                          color: colors[appearance].textDark,
                        }}>
                        ₦ ({formatNumber(wallet?.balance)})
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}

                <Button
                  title="Confirm"
                  buttonStyle={{
                    marginTop: 60,
                    marginHorizontal: 20,
                    borderRadius: 30,
                  }}
                  loading={processing}
                  enabled={true}
                  textColor={colors[appearance].textDark}
                  buttonColor={colors[appearance].primary}
                  onPress={() => {
                    // setOrderConfirm(true);
                    AddDispatch();
                    // navigation.navigate(authRouts.otpVerification)
                  }}
                />
              </View>
            </ScrollView>
          </View>
        )}
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
