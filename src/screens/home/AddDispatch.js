import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  BackHandler
} from 'react-native';
import colors from '../../../assets/colors/colors';
import endpoints from '../../../assets/endpoints/endpoints';
import { AuthContext } from '../../../context/AuthContext';
import Bike from '../../../assets/icons/scooter.svg';
import Car from '../../../assets/icons/sedan.svg';
import Van from '../../../assets/icons/containertruck.svg';
import Truck from '../../../assets/icons/truck.svg';
import Info from '../../../assets/icons/infoIcon.svg';
import Button from '../../component/Button';
import SenderDetailScreen from './SenderDetailScreen';
import RecieverScreen from './RecieverScreen';
import Toast from 'react-native-toast-message';
import distance from '../../../utils/getDistance';
import getCurrentPosition from '../../../utils/getCurrentPosition';
import formatNumber from '../../../utils/formatNumber';
import Order_summary from './order_summary';


export default AddDispatch = ({ navigation }) => {
  //check if ready
  // const ready = variableUser?.data?.longitude != 0 && variableUser?.data?.is_online == 1;

  const data = [
    { name: 'Bike', id: 1, icon: <Bike /> },
    { name: 'Car', id: 2, icon: <Car /> },
    { name: 'Van', id: 3, icon: <Van /> },
    { name: 'Truck', id: 4, icon: <Truck /> },
  ];

  const data2 = [
    { name: 'Small_truck', id: 5, icon: <Bike /> },
    { name: 'Medium_truck', id: 6, icon: <Car /> },
    { name: 'Big_truck', id: 7, icon: <Van /> },
  ];
  const { token, colorScheme, loaction, saveLatAndLong, user } =
    useContext(AuthContext);

  const [selectedItem, setSelectedItem] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const [truck, SetTruckType] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(false);
  const appearance = colorScheme;
  const [step, setStep] = useState(1);

  const [requestData, setRequestData] = useState({
    fullname: user?.name || '',
    Phone: user?.phone || '',
    address: user?.address || '',
    state: user?.state || '',
    LandMark: '',
    ProductName: '',
    city: user.city || '',
    senderlong: user.longitude || '',
    senderlat: user.latitude || '',
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
    selectedItem?.name?.length > 2 &&
    requestData.fullname.length > 2 &&
    requestData.Phone.length === 11 &&
    requestData.address.length > 2 &&
    // requestData.state.length > 2 &&
    requestData2.Phone.length === 11 &&
    requestData2.address.length > 2 &&
    requestData2.fullname.length > 2
  // requestData2.state.length > 2;

  const setName = text => {
    setRequestData({ ...requestData, fullname: text });
  };


  const [price, setPrice] = useState([]);

  useEffect(() => {
    getCurrentPosition(callback => {
      if (callback?.position?.coords) {
        saveLatAndLong(
          callback.position.coords.latitude,
          callback.position.coords.longitude,
        );
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
        console.log("price", data); // JSON data parsed by `data.json()` call

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
  console.log()

  const getdistance = distance(
    loaction.lat || requestData.senderlat,
    loaction.lng || requestData.senderlong,
    requestData2.receiverlat,
    requestData2.receiverlong,
    'km',
  );
  console.log("getdistance",selectedItem?.price)
  const total_fee = getdistance * selectedItem?.price;

  const handleItemPress = item => {
    setSelectedItem({
      ...item,
      price: price[0][item?.name?.toLowerCase()],
    });

    if (item.name === 'Truck') {
      setSelectedTruck(true);
      SetTruckType(true);
    } else {
      setSelectedTruck(false);
      SetTruckType(false);
    }

    if (data2.map(it => it.name).includes(item.name)) {
      setSelectedTruck(true);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors[appearance].background,
      }}>
      {refreshing && step !== 2 && step !== 3 ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          animating={refreshing}
          size="large"
          color={colors[colorScheme].primary}
        />
      ) : (
        <View style={{ flex: 1 }}>
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
                  width: '100%',
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 20,
                    maxWidth: 150,
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
              }}
              contentContainerStyle={{ paddingBottom: 50 }}>
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
                    paddingStart: 10,
                    fontFamily: 'Inter-SmeiBold',
                    fontSize: 20,
                    color: '#565656',
                  }}>
                  Select Pick-up Vehicle
                </Text>
              </View>

              <View
                // onPress={() => {
                //   SetInfo(true);
                // }}
                style={{
                  paddingStart: 10,
                  marginTop: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Info fill={colors[appearance].primary} />
                <Text
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 13,
                    color: colors[appearance].textDark,
                    alignSelf: 'center',
                    paddingStart: 10,
                  }}>
                  Please make sure to choose a vehicle suitable for your item.
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                  alignSelf: 'center',
                }}>
                {data.map(item => (
                  <TouchableOpacity
                    onPress={() => handleItemPress(item)}
                    key={item.id}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      backgroundColor:
                        selectedItem?.id === item.id ||
                          (item.name === 'Truck' && selectedTruck)
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
                      {/* Assuming your icons are part of your data */}
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
                  </TouchableOpacity>
                ))}
              </View>
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 13,
                  color: colors[appearance].textDark,
                  paddingStart: 10,
                  marginTop: 61,
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 18,
                    color: colors[appearance].textDark,
                    paddingStart: 10,
                  }}>
                  Description:
                </Text>{' '}
                {requestData2.ProductName}
              </Text>
              <View
                style={{
                  marginTop: 10,
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

              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 18,
                  color: colors[appearance].textDark,
                  paddingStart: 10,
                  display: canProceed ? 'flex' : 'none',
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 18,
                    color: colors[appearance].textDark,
                    paddingStart: 10,
                  }}>
                  Total Price:
                </Text>{' '}
                ₦ {isNaN(total_fee) ? '0' : formatNumber(total_fee)}
              </Text>

              <Button
                title="Confirm"
                buttonStyle={{
                  marginTop: 60,
                  marginHorizontal: 20,
                  borderRadius: 30,
                }}
                loading={false}
                enabled={canProceed}
                textColor={colors[appearance].textDark}
                buttonColor={colors[appearance].primary}
                onPress={() => {
                  // setOrderConfirm(true);
                  // AddDispatch();
                  setStep(4);
                  // navigation.navigate(mainRouts.orderSummary);
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

          <View
            style={{
              display: step === 4 ? 'flex' : 'none',
              flex: 1,
            }}>
            <Order_summary
              requestData={requestData}
              requestData2={requestData2}
              setRequestData={setRequestData}
              selectedItem={selectedItem?.name}
              setRequestData2={setRequestData2}
              setSelectedItem={setSelectedItem}
              total_fee={total_fee}
              navigation={navigation}
              goBack={() => setStep(1)}
            />
          </View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={truck}
        onRequestClose={() => {
          SetTruckType(!truck);
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
              width: '100%',
              borderRadius: 20,
              paddingVertical: 20,
            }}>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                fontSize: 20,
                color: colors[appearance].textDark,
                alignSelf: 'center',
              }}>
              Truck Type
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
                  alignSelf: 'center',
                }}>
                {data2.map(item => (
                  <TouchableOpacity
                    onPress={() => handleItemPress(item)}
                    key={item.id}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      backgroundColor:
                        selectedItem?.id === item.id ||
                          (item.name === 'Truck' && selectedTruck)
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
                      {/* Assuming your icons are part of your data */}
                      <Truck />
                    </View>
                    <Text
                      style={{
                        fontFamily: 'Inter-Medium',
                        fontSize: 16,
                        color: colors.light.white,
                        marginTop: 10,
                      }}>
                      {item?.name.replace('_', ' ')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/* {data2.map(item => (
                <TouchableOpacity
                  onPress={() => handleItemPress(item)}
                  key={item.id}
                  style={{
                    paddingVertical: 10,
                    backgroundColor:
                      selectedItem?.id === item.id ||
                      (item.name === 'Truck' && selectedTruck)
                        ? colors[appearance].black
                        : colors[appearance].background,
                    paddingHorizontal: 20,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter-Regular',
                      fontSize: 19,
                      color: colors[appearance].textDark,
                    }}>
                    {item?.name.replace('_', ' ')}
                  </Text>
                </TouchableOpacity>
              ))} */}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};
