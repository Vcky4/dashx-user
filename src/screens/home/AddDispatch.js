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
  ActivityIndicator,
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
import SenderDetailScreen from './SenderDetailScreen';
import RecieverScreen from './RecieverScreen';
import Toast from 'react-native-toast-message';
import distance from '../../../utils/getDistance';
import getCurrentPosition from '../../../utils/getCurrentPosition';

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
  const {saveToken, saveUser, token, colorScheme, login, user} =
    useContext(AuthContext);

  const [selectedItem, setSelectedItem] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const appearance = colorScheme;
  const [step, setStep] = useState(1);

  const [requestData, setRequestData] = useState({
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

  const [requestData2, setRequestData2] = useState({
    fullname: '',
    Phone: '',
    address: '',
    state: '',
    LandMark: '',
    ProductName: '',
    city: '',
    receiverlong: '',
    receiverlat: '',
  });

  const canProceed =
    selectedItem?.name?.length > 2 


  const setName = text => {
    setRequestData({...requestData, fullname: text});
  };

  const [locationData, setLocationData] = useState({
    lat: 5.01,
    lng: 7.9,
  });

  const [price, setPrice] = useState([]);

  useEffect(() => {
    getCurrentPosition(callback => {
      if (callback?.position?.coords) {
        setLocationData(prevState => ({
          ...prevState,
          lat: callback.position.coords.latitude,
          lng: callback.position.coords.longitude,
        }));
      }
    });
  }, []);

  const retreivePrice = async () => {
    setRefreshing(true);
    const response = await fetch(endpoints.baseUrl + endpoints.retrievePrice, {
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
        console.log(data); // JSON data parsed by `data.json()` call

        if (response.ok) {
          setRefreshing(false);
          setPrice(data.data);
        } else {
          // Toast.show({
          //   type: 'error',
          //   text1: 'Login failed',
          //   text2: data.message,
          // });
          console.log('response: ', response);
          console.log('Login error:', data.message);
        }
      })
      .catch(error => {
        setRefreshing(false);
        Toast.show({
          type: 'error',
          text1: 'Login failed',
          text2: error.message,
        });
        console.log('Login error:', error);
      });
  };

  useEffect(() => {
    retreivePrice();
  }, []);

  const getdistance = distance(
    locationData.lat,
    locationData.lng,
    requestData2.receiverlat,
    requestData2.receiverlong,
    'km',
  );
  const delivery_fee =
    getdistance * price[0]?.price_per_km &&
    price[0].price_per_km + selectedItem?.price;
  //   console.log("test",delivery_fee);
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
        vehicle_type: selectedItem?.name,
        delivery_fee: delivery_fee,
        sendername: requestData.fullname,
        productname: requestData.ProductName,
        senderaddress: requestData.address,
        sendercity: requestData.city,
        senderphone: requestData.Phone,
        senderlandmark: requestData.LandMark,
        receivername: requestData2.fullname,
        receiverphone: requestData2.Phone,
        receiveraddress: requestData2.address,
        receivercity: requestData2.city,
        receiverlandmark: requestData2.LandMark,
        senderlong: requestData.senderlong.toString(),
        senderlat: requestData.senderlat.toString(),
        receiverlat: requestData2.receiverlat.toString(),
        receiverlong: requestData2.receiverlong.toString(),
      }), // body data type must match "Content-Type" header
    });
    response
      .json()
      .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
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
          navigation.goBack();
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors[appearance].background,
      }}>
      {refreshing && step !== 2 && step !== 3 ? (
        <ActivityIndicator
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          animating={refreshing}
          size="large"
          color={colors[colorScheme].primary}
        />
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors[appearance].background,
              display: step === 1 ? 'flex' : 'none',
            }}>
            <View
              style={{
                backgroundColor: colors[appearance].primary,
                borderBottomEndRadius: 15,
                borderBottomLeftRadius: 15,
                paddingTop: 20,
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
                    color: colors[appearance].white,
                  }}>
                  {user.name}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setStep(2);
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
                    marginTop: 15,
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
                    color: colors[appearance].white,
                  }}>
                  {requestData.address ? requestData.address : user.address}
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
                      setSelectedItem({
                        ...item,
                        price: price[0][item.name.toLowerCase()],
                      });
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
                      margin: 5,
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
                        color: colors.light.white,
                        marginTop: 10,
                      }}>
                      {item?.name}
                    </Text>

                    <Text
                      style={{
                        fontFamily: 'Inter-Medium',
                        fontSize: 16,
                        color: colors.light.white,
                      }}>
                      ₦{price[0] && price[0][item.name.toLowerCase()]}
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
                    setStep(3);
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
                    {requestData2.address.length > 1
                      ? requestData2.address
                      : 'select Receiver address'}
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
                  AddDispatch();
                  // navigation.navigate(authRouts.otpVerification)
                }}
              />
            </ScrollView>
          </View>

          <View
            style={{
              display: step === 2 ? 'flex' : 'none',
              flex: 1,
            }}>
            <SenderDetailScreen
              goBack={() => setStep(1)}
              requestData={requestData}
              setName={setName}
              setRequestData={setRequestData}
            />
          </View>

          <View
            style={{
              display: step === 3 ? 'flex' : 'none',
              flex: 1,
            }}>
            <RecieverScreen
              requestData={requestData2}
              setRequestData={setRequestData2}
              goBack={() => setStep(1)}
            />
          </View>
        </View>
      )}
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
