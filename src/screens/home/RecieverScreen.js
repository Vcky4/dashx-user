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
  ActivityIndicator,
  KeyboardAvoidingView,
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
import BackArrow from '../../../assets/icons/backIcon.svg';
import PersonIcon from '../../../assets/icons/Person.svg';
import PhoneIcon from '../../../assets/icons/Mobile.svg';
import AddressIcon from '../../../assets/icons/Address.svg';
import InputField from '../../component/InputField';
import Bottomsheet from 'react-native-raw-bottom-sheet';
import getCurrentPosition from '../../../utils/getCurrentPosition';
import SearchAddress from '../../../utils/SearchAddress';
import getPlaceDetails from '../../../utils/getPlaceDetails';
import getStateAndCity from '../../../utils/getStateAndCity';
import getAddress from '../../../utils/getAddress';
import getCity from '../../../utils/getCity';

var Sound = require('react-native-sound');

export default Home = ({goBack, requestData, setRequestData}) => {
  const {
    saveToken,
    saveUser,
    colorScheme,
    login,
    user,
    loaction,
    saveLatAndLong,
  } = useContext(AuthContext);
  const appearance = colorScheme;
  const bottomSheetRef = useRef();
  const [loading, setLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [listofLocation, setListofLocation] = useState([]);
  const [processing, setProcessing] = useState(false);


  const [locationData, setLocationData] = useState({
    lat: 5.01,
    lng: 7.9,
  });

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

  useEffect(() => {
    setLoading(true);

    SearchAddress(searchLocation, loaction.lat, loaction.lng, data => {
      setListofLocation(data);
    });

    setLoading(false);
  }, [searchLocation]);
  //check if ready
  // const ready = variableUser?.data?.longitude != 0 && variableUser?.data?.is_online == 1;
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors[appearance].background,
        }}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
          style={{padding:20}}
            onPress={() => {
              goBack();
            }}>
            <BackArrow fill={'#000'} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Inter-SemiBold',
              fontSize: 20,
              color: colors[appearance].textDark,
              flex: 0.8,
              textAlign: 'center',
            }}>
            Receiver
          </Text>
        </View>

        <ScrollView
          style={{
            paddingHorizontal: 18,
            paddingVertical: 16,
          }}>
          <View style={{paddingBottom: 50}}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                color: colors[appearance].subText,
                paddingTop: 34,
              }}>
              Receiver Name
            </Text>
            <InputField
              theme={appearance}
              value={requestData.fullname}
              onChangeText={text =>
                setRequestData(prevState => ({...prevState, fullname: text}))
              }
              placeholder="Full Name"
              containerStyle={styles.input}
            />

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                color: colors[appearance].subText,
                paddingTop: 20,
              }}>
              Pickup Phone Number
            </Text>
            <InputField
              theme={appearance}
              value={requestData.Phone}
              maxLength={11}
              keyboardType="numeric"
              onChangeText={text =>
                setRequestData(prevState => ({...prevState, Phone: text}))
              }
              placeholder="Phone Number"
              containerStyle={styles.input}
            />

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                color: colors[appearance].subText,
                paddingTop: 20,
              }}>
              description
            </Text>

            <View
              style={{
                borderColor:
                  requestData.ProductName.length > 0
                    ? colors[appearance].primary
                    : colors[appearance].subText,
                borderRadius: 50,
                borderWidth: 1,
                paddingHorizontal: 18,
                height: 50,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TextInput
                value={requestData.ProductName}
                onChangeText={text =>
                  setRequestData(prevState => ({
                    ...prevState,
                    ProductName: text,
                  }))
                }
                placeholder="Description"
                style={{
                  fontSize: 16,
                  fontFamily: 'Inter-Medium',
                  // color: colors[theme].textDark,
                  width: '100%',
                }}
                //   cursorColor={colors[theme].primary}
              />
            </View>

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                color: colors[appearance].subText,
                paddingTop: 20,
              }}>
              Receiver Address
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 30,
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderColor:
                  requestData.address.length > 2
                    ? colors[appearance].primary
                    : colors[appearance].subText,
              }}
              onPress={() => {
                bottomSheetRef.current.open();
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 16,
                  paddingStart: 10,
                  color: colors[appearance].textDark,
                }}>
                {requestData.address.length > 0
                  ? requestData.address
                  : 'Receiver Address'}
              </Text>
              {/* <InputField
                theme={appearance}
                value={requestData.address}
                // onChangeText={text =>
                //   setRequestData(prevState => ({
                //     ...prevState,
                //     address: text,
                //   }))
                // }
                placeholder="Sender Address"
                containerStyle={styles.input}
                editable={false}
                leftComponet={
                  <AddressIcon fill={colors[appearance].textDark} />
                }
              /> */}
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                color: colors[appearance].subText,
                paddingTop: 20,
              }}>
              State
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 30,
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderColor:
                  requestData.state.length > 2
                    ? colors[appearance].primary
                    : colors[appearance].subText,
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 16,
                  paddingStart: 10,
                  color: colors[appearance].textDark,
                }}>
                {requestData.state.length > 0 ? requestData.state : 'State'}
              </Text>
              {/* <InputField
                theme={appearance}
                value={requestData.address}
                // onChangeText={text =>
                //   setRequestData(prevState => ({
                //     ...prevState,
                //     address: text,
                //   }))
                // }
                placeholder="Sender Address"
                containerStyle={styles.input}
                editable={false}
                leftComponet={
                  <AddressIcon fill={colors[appearance].textDark} />
                }
              /> */}
            </View>

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                color: colors[appearance].subText,
                paddingTop: 20,
              }}>
              Landmark (optional)
            </Text>

            <InputField
              theme={appearance}
              value={requestData.landMark}
              onChangeText={text =>
                setRequestData(prevState => ({...prevState, landMark: text}))
              }
              placeholder="Landmark"
              containerStyle={styles.input}
            />

            <Button
              title="save"
              buttonStyle={{
                marginTop: 60,
                marginHorizontal: 20,
                borderRadius: 30,
              }}
              loading={false}
              enabled={true}
              textColor={colors[appearance].textDark}
              buttonColor={colors[appearance].primary}
              onPress={() => {
                goBack();
                // signUpUser();
                // navigation.navigate(authRouts.otpVerification)
              }}
            />
          </View>
        </ScrollView>
      </View>

      <Bottomsheet
        height={400}
        animationType="fade"
        ref={bottomSheetRef}
        closeOnDragDown={false}
        closeOnPressMask={true}
        closeOnPressBack={true}
        onClose={() => {}}
        customStyles={{
          wrapper: {},
          draggableIcon: {
            backgroundColor: colors.primary,
            width: 50,
            height: 5,
          },
          container: {
            // backgroundColor: 'rgba(158, 176, 162, 0.5)',
            backgroundColor: colors[appearance].background,
            alignItems: 'center',
            paddingBottom: 50,
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
          },
        }}>
        <>
          <KeyboardAvoidingView
            style={{paddingHorizontal: 16, width: '100%', flex: 1}}>
            <Text
              style={{
                fontFamily: 'Jost-Medium',
                fontSize: 18,
                paddingTop: 20,
                color: colors.black,
              }}>
              Search Location
            </Text>
            <InputField
              theme={appearance}
              value={searchLocation}
              onChangeText={setSearchLocation}
              placeholder="Search"
              containerStyle={styles.input}
            />

            {loading ? (
              <ActivityIndicator
                animating={loading}
                hidesWhenStopped={true}
                size={'large'}
              />
            ) : (
              <FlatList
                data={listofLocation}
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
                      Search your location{' '}
                    </Text>
                  </View>
                }
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      getPlaceDetails(item.description, data => {
                        setRequestData(prevState => ({
                          ...prevState,
                          address:
                            data[0]?.formatted_address.split(/,(.*)/s)[0] +
                            data[0]?.formatted_address.split(/,(.*)/s)[1],
                          receiverlong: data[0]?.geometry?.location?.lng,
                          receiverlat: data[0]?.geometry?.location?.lat,
                        }));
                        getAddress(
                          data[0]?.geometry?.location?.lat,
                          data[0]?.geometry?.location?.lng,
                          result => {
                            setRequestData(prevState => ({
                              ...prevState,
                              city: getCity(result[0].formatted_address),
                            }));
                          },
                        );
                      });

                      getStateAndCity(item.place_id, data => {
                        setRequestData(prevState => ({
                          ...prevState,
                          state: data.state,
                        }));
                      });

                      setSearchLocation('');
                      bottomSheetRef.current.close();
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 16,
                        color: colors[appearance].textDark,
                        flex: 0.9,
                        marginTop: 12,
                      }}>
                      {item?.description.split(/,(.*)/s)[0]}{' '}
                      {item?.description.split(/,(.*)/s)[1]?.trim()}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </KeyboardAvoidingView>
        </>
      </Bottomsheet>
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
  input: {
    marginTop: 8,
  },
});
