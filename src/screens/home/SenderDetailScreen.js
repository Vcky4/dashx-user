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
  KeyboardAvoidingView,
  FlatList,
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
import getPlaceDetails from '../../../utils/getPlaceDetails';
import getStateAndCity from '../../../utils/getStateAndCity';
import getCurrentPosition from '../../../utils/getCurrentPosition';
import SearchAddress from '../../../utils/SearchAddress';

var Sound = require('react-native-sound');

export default SnderDetails = ({
  goBack,
  requestData,
  setRequestData,
  setName,
}) => {
  const {saveToken, saveUser, colorScheme, login, user,saveLatAndLong,loaction} =
    useContext(AuthContext);
  const appearance = colorScheme;
  const [processing, setProcessing] = useState(false);

  //   const canProceed =
  //     requestData.fullname.length > 2 &&
  //     requestData.phone.length == 11 &&
  //     requestData.address.length > 2 &&
  //     requestData.state.length > 1 &&
  //     requestData.ProductName > 1
  // requestData.ProductName.length > 1;
  //check if ready
  // const ready = variableUser?.data?.longitude != 0 && variableUser?.data?.is_online == 1;

  const bottomSheetRef = useRef();
  const [loading, setLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [listofLocation, setListofLocation] = useState([]);

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
              flex: 0.9,
              textAlign: 'center',
            }}>
            Sender
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
              Sender’s Name
            </Text>
            <InputField
              theme={appearance}
              value={requestData.fullname}
              onChangeText={text =>
                setRequestData(prevState => ({...prevState, fullname: text}))
              }
              placeholder="Full Name"
              containerStyle={styles.input}
              leftComponet={<PersonIcon fill={colors[appearance].textDark} />}
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
              onChangeText={text =>
                setRequestData(prevState => ({...prevState, Phone: text}))
              }
              maxLength={11}
              keyboardType="numeric"
              placeholder="Phone Number"
              containerStyle={styles.input}
              leftComponet={<PhoneIcon fill={colors[appearance].textDark} />}
            />

            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                color: colors[appearance].subText,
                paddingTop: 20,
              }}>
              Product Name
            </Text>
            <InputField
              theme={appearance}
              value={requestData.ProductName}
              onChangeText={text =>
                setRequestData(prevState => ({...prevState, ProductName: text}))
              }
              placeholder=" Product Name"
              containerStyle={styles.input}
              leftComponet={<PhoneIcon fill={colors[appearance].textDark} />}
            />
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                color: colors[appearance].subText,
                paddingTop: 20,
              }}>
              Sender Address
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
              <AddressIcon fill={colors[appearance].textDark} />
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 16,
                  paddingStart: 10,
                  color: colors[appearance].textDark,
                }}>
                {requestData.address.length > 0
                  ? requestData.address
                  : 'Sender Address'}
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
              <AddressIcon fill={colors[appearance].textDark} />
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
              value={requestData.LandMark}
              onChangeText={text =>
                setRequestData(prevState => ({...prevState, LandMark: text}))
              }
              placeholder="Landmark"
              containerStyle={styles.input}
              leftComponet={<PersonIcon fill={colors[appearance].textDark} />}
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
                        const formattedAddress =
                          data[0]?.formatted_address.split(/,(.*)/s)[0] +
                          data[0]?.formatted_address.split(/,(.*)/s)[1];

                        setRequestData(prevState => ({
                          ...prevState,
                          address: formattedAddress,
                          // Update latitude and longitude here if needed
                          senderlat: data[0]?.geometry?.location?.lat,
                          senderlong: data[0]?.geometry?.location?.lng,
                        }));
                      });

                      getStateAndCity(item.place_id, data => {
                        setRequestData(prevState => ({
                          ...prevState,
                          state: data.state,
                          city: data.city,
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
