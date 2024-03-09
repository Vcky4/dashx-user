import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Animated,
  FlatList,
} from 'react-native';
import Toast from 'react-native-toast-message';

import colors from '../../../assets/colors/colors';
import {AuthContext} from '../../../context/AuthContext';
import endpoints from '../../../assets/endpoints/endpoints';
import InputField from '../../component/InputField';
import PasswordInput from '../../component/PasswordInput';
import Button from '../../component/Button';
import authRouts from '../../navigation/routs/authRouts';
import Bottomsheet from 'react-native-raw-bottom-sheet';
import SearchAddress from '../../../utils/SearchAddress';
import getCurrentPosition from '../../../utils/getCurrentPosition';
import getPlaceDetails from '../../../utils/getPlaceDetails';
import getStateAndCity from '../../../utils/getStateAndCity';
import getAddress from '../../../utils/getAddress';
import getCity from '../../../utils/getCity';

export default SignUp = ({navigation}) => {
  const {saveToken, saveUser, colorScheme} = useContext(AuthContext);
  const appearance = colorScheme;
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [listofLocation, setListofLocation] = useState([]);
  const bottomSheetRef = useRef();

  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const canProceed =
     phone.length > 9 &&
    // password.length > 0 &&
    // firstName.split(' ').length > 1 &&
    emailRegex.test(email);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [requestData, setRequestData] = useState({
    lat: '',
    long: '',
    state: '',
    city: '',
  });

  console.log(password)

  const [locationData, setLocationData] = useState({
    lat: 5.01,
    lng: 7.9,
  });

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

  useEffect(() => {
    setLoading(true);

    SearchAddress(searchLocation, locationData.lat, locationData.lng, data => {
      setListofLocation(data);
    });

    setLoading(false);
  }, [searchLocation]);

  const signUpUser = async () => {
    setProcessing(true);
    const response = await fetch(endpoints.baseUrl + endpoints.signup, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: email.trim(),
        name: firstName,
        password: password,
        phone: phone,
        longitude: requestData.long.toString(),
        latitude: requestData.lat.toString(),
        address: address,
        state: requestData.state,
        city: requestData.city,
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
            text1: 'SignUp successful',
            text2: data.message,
          });
          //   saveUser(data.user);
          navigation.navigate(authRouts.otpVerification);
        } else {
          setProcessing(false);
          Toast.show({
            type: 'error',
            text1: 'SignUp failed',
            text2: data.message,
          });
          // navigation.navigate(authRouts.otpVerification, { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE4MDczOWY3NGE2NDdmM2Q5N2YyYmYiLCJyb2xlIjoiUklERVIiLCJnZW5lcmF0b3IiOiIyMDIzMDcwNzEzMzgxN09BQkpNTlBWIiwiaWF0IjoxNjg4NzMzNDk3LCJleHAiOjE2ODg4MTk4OTd9.quJHfi-_YMVGrvc7e40ycvHLuB_wynf1LBxPxaIlvGk' })
          console.log('response: ', response);
          console.log('SignUp error:', data);
        }
      })
      .catch(error => {
        setProcessing(false);
        Toast.show({
          type: 'error',
          text1: 'SignUp failed',
          text2: error.message,
        });
        console.log('response: ', response);
        console.log('SignUp error:', error);
      });
  };
  return (
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
          paddingHorizontal: 20,
        }}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={{
            width: 70,
            resizeMode: 'contain',
          }}
        />
      </View>

      <ScrollView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 16,
        }}>
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            fontSize: 32,
            color: colors[appearance].textDark,
          }}>
          Welcome
        </Text>

        <InputField
          theme={appearance}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Full Name"
          containerStyle={styles.input}
        />
        <InputField
          theme={appearance}
          value={email}
          onChangeText={(text)=>setEmail(text.trim())}
          placeholder="Enter e-mail"
          containerStyle={styles.input}
        />

        <InputField
          theme={appearance}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          keyboardType="numeric"
          maxLength={11}
          containerStyle={styles.input}
        />

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 30,
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginTop: 20,
            borderColor:
              address.length > 2
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
            {address.length > 0 ? address : 'Sender Address'}
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
        <PasswordInput
          theme={appearance}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          containerStyle={styles.input}
        />

        <Button
          title="Sign Up"
          buttonStyle={{
            marginTop: 30,
            marginHorizontal: 20,
            borderRadius: 30,
          }}
          loading={processing}
          enabled={canProceed && !processing}
          textColor={colors[appearance].textDark}
          buttonColor={colors[appearance].primary}
          onPress={() => {
            signUpUser();
            // navigation.navigate(authRouts.otpVerification)
          }}
        />

        <Text
          style={{
            fontFamily: 'Inter-Regular',
            fontSize: 14,
            color: colors[appearance].textDark,
            textAlign: 'center',
            marginTop: 20,
            fontStyle: 'italic',
          }}>
          Already have an account?
          <Text
            onPress={() => {
              navigation.navigate(authRouts.login);
            }}
            style={{
              color: colors[appearance].primary,
              fontWeight: 'bold',
              fontSize: 18,
              fontFamily: 'Inter-Regular',
            }}>
            {' '}
            Sign in
          </Text>
        </Text>

        <Text
          style={{
            fontFamily: 'Inter-Regular',
            fontSize: 14,
            color: colors[appearance].textDark,
            textAlign: 'center',
            marginTop: 30,
            fontStyle: 'italic',
            paddingHorizontal: 20,
          }}>
          By continuing, you agree to Dash X
          <Text
            style={{
              color: colors[appearance].primary,
              fontWeight: 'bold',
            }}>
            {' '}
            Conditions of use{' '}
          </Text>{' '}
          and
          <Text
            style={{
              color: colors[appearance].primary,
              fontWeight: 'bold',
            }}>
            {' '}
            Privacy Notice
          </Text>
        </Text>
      </ScrollView>

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
                        // receiverlong: data[0]?.geometry?.location?.lng,
                        // receiverlat: data[0]?.geometry?.location?.lat,
                        setAddress(
                          data[0]?.formatted_address.split(/,(.*)/s)[0] +
                            data[0]?.formatted_address.split(/,(.*)/s)[1],
                        );
                        setRequestData(prevState => ({
                          ...prevState,
                          lat: data[0]?.geometry?.location?.lat,
                          long: data[0]?.geometry?.location?.lng,
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
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
  },
});
