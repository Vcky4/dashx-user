import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  AppRegistry,
  ScrollView,
} from 'react-native';
import colors from '../../../assets/colors/colors';
import {AuthContext} from '../../../context/AuthContext';
import Back from '../../../assets/icons/backIcon.svg';
import InputField from '../../component/InputField';
import Button from '../../component/Button';
import endpoints from '../../../assets/endpoints/endpoints';
import Toast from 'react-native-toast-message';
import mainRouts from '../../navigation/routs/mainRouts';
export default Profile = ({navigation}) => {
  const {colorScheme, user, token, saveUser} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [processing, setProcessing] = useState(false);
  const appearance = colorScheme;

  const [requestData, setRequestData] = useState({
    name: user?.userDetails?.name || '',
    Phone: user?.userDetails?.phone || '',
    email: user?.userDetails?.email || '',
  });

  const UpdateProfile = async () => {
    setProcessing(true);
    const response = await fetch(endpoints.baseUrl + endpoints.profile, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        userid: user?.userDetails?._id,
        email: requestData.email,
        phone: requestData.Phone,
        name: requestData.name,
      }), // body data type must match "Content-Type" header
    });
    response
      .json()
      .then(data => {
        console.log('profileupdate', data.data); // JSON data parsed by `data.json()` call

        if (response.ok) {
          setProcessing(false);
          // saveUser(data.data);
          navigation.goBack();
        } else {
          Toast.show({
            type: 'success',
            text1: 'updated Profile successfully',
            text2: data.message,
          });
          console.log('response: ', response);
          console.log('updateprofile error:', data.message);
        }
      })

      .catch(error => {
        setProcessing(false);
        Toast.show({
          type: 'error',
          text1: 'updateprofile failed',
          text2: error.message,
        });
        console.log('updateprofile error:', error);
      });
  };

  //   const getProfile = async () => {

  //     const response = await fetch(endpoints.baseUrl + endpoints.getProfile, {
  //       method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: 'Bearer ' + token,
  //       },
  //       body: JSON.stringify({
  //         userid: user.userDetails._id,
  //       }), // body data type must match "Content-Type" header
  //     });
  //     response
  //       .json()
  //       .then(data => {
  //         console.log('item', data.data); // JSON data parsed by `data.json()` call

  //         if (response.ok) {
  //           setProcessing(false);
  //           //   saveUser(data.data);

  //         } else {
  //           Toast.show({
  //             type: 'success',
  //             text1: ' Profile successfully',
  //             text2: data.message,
  //           });
  //           console.log('response: ', response);
  //           console.log(' profile error:', data.message);
  //         }
  //       })

  //       .catch(error => {

  //         Toast.show({
  //           type: 'error',
  //           text1: 'profile failed',
  //           text2: error.message,
  //         });
  //         console.log('updateprofile error:', error);
  //       });
  //   };

  //   useEffect(() => {
  //     getProfile();
  //   }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors[colorScheme].background,
      }}>
      <ScrollView>
        <View
          style={{
            backgroundColor: colors[colorScheme].primary,
            padding: 20,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 0,
              }}
              onPress={() => navigation.goBack()}>
              <Back fill={'#fff'} />
            </TouchableOpacity>
            <Text
              style={{
                color: colors[colorScheme].white,
                fontSize: 24,
                fontFamily: 'Inter-Bold',
              }}>
              Profile
            </Text>
          </View>

          <Text
            style={{
              color: colors[colorScheme].white,
              fontSize: 16,
              fontFamily: 'Inter-Bold',
              alignSelf: 'center',
            }}>
            {user?.userDetails?.name}
          </Text>
          <Text
            style={{
              color: colors[colorScheme].white,
              fontSize: 12,
              fontFamily: 'Inter-Regular',
              alignSelf: 'center',
            }}>
            {user.online_status ? 'Online' : 'Offline'}
          </Text>
        </View>

        <View style={{paddingHorizontal: 16, marginTop: 10}}>
          <Text
            style={{
              color: colors[colorScheme].textDark,
              fontSize: 20,
              fontFamily: 'Inter-Medium',
              paddingTop: 20,
            }}>
            Name
          </Text>
          <View
            style={{
              borderColor:
                requestData.name.length > 0
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
              value={requestData.name}
              onChangeText={text =>
                setRequestData(prevState => ({
                  ...prevState,
                  name: text,
                }))
              }
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
              color: colors[colorScheme].textDark,
              fontSize: 20,
              fontFamily: 'Inter-Medium',
              marginTop: 20,
            }}>
            Email
          </Text>
          <View
            style={{
              borderColor:
                requestData.name.length > 0
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
              value={requestData.email}
              onChangeText={text =>
                setRequestData(prevState => ({
                  ...prevState,
                  email: text,
                }))
              }
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
              color: colors[colorScheme].textDark,
              fontSize: 20,
              fontFamily: 'Inter-Medium',
              paddingTop: 20,
            }}>
            Phone
          </Text>
          <View
            style={{
              borderColor:
                requestData.name.length > 0
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
              value={requestData.Phone}
              onChangeText={text =>
                setRequestData(prevState => ({
                  ...prevState,
                  Phone: text,
                }))
              }
              keyboardType="numeric"
              maxLength={11}
              style={{
                fontSize: 16,
                fontFamily: 'Inter-Medium',
                // color: colors[theme].textDark,
                width: '100%',
              }}
              //   cursorColor={colors[theme].primary}
            />
          </View>

          <Button
            title="Save"
            buttonStyle={{
              marginTop: 30,
              marginHorizontal: 20,
              borderRadius: 30,
            }}
            loading={processing}
            enabled={true}
            textColor={colors[appearance].textDark}
            buttonColor={colors[appearance].primary}
            onPress={() => {
              UpdateProfile();
              // navigation.navigate(authRouts.otpVerification)
            }}
          />
        </View>
      </ScrollView>

      {/* <Text style={{
                color: colors[colorScheme].textGray,
                fontSize: 12,
                fontFamily: 'Inter-Bold',
                marginTop: 20,
                marginLeft: 32,
                marginBottom: 8,
            }}>Vehicle Type</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '85%',
                paddingHorizontal: 10,
                borderColor: colors[colorScheme].primary,
                borderWidth: 1,
                paddingVertical: 10,
                marginHorizontal: 20,
                alignSelf: 'center',
                borderRadius: 30,
            }}>
                <Image
                    source={require('../../../assets/images/car.png')}
                    style={{
                        width: 24,
                        height: 24,
                        resizeMode: "contain",
                        alignSelf: 'center',
                    }}
                />
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                    alignSelf: 'center',
                    marginLeft: 10,
                }}>{user.vehicle.vehicle_type}</Text>
            </View>

            <Text style={{
                color: colors[colorScheme].textGray,
                fontSize: 12,
                fontFamily: 'Inter-Bold',
                marginTop: 20,
                marginLeft: 32,
                marginBottom: 8,
            }}>Vehicle Number</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '85%',
                paddingHorizontal: 10,
                borderColor: colors[colorScheme].primary,
                borderWidth: 1,
                paddingVertical: 10,
                marginHorizontal: 20,
                alignSelf: 'center',
                borderRadius: 30,
            }}>
                <Image
                    source={require('../../../assets/images/car.png')}
                    style={{
                        width: 24,
                        height: 24,
                        resizeMode: "contain",
                        alignSelf: 'center',
                    }}
                />
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                    alignSelf: 'center',
                    marginLeft: 10,
                }}>{user.vehicle.vehicle_number}</Text>
            </View>


            <Text style={{
                color: colors[colorScheme].textGray,
                fontSize: 12,
                fontFamily: 'Inter-Bold',
                marginTop: 20,
                marginLeft: 32,
                marginBottom: 8,
            }}>Email</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '85%',
                paddingHorizontal: 10,
                borderColor: colors[colorScheme].primary,
                borderWidth: 1,
                paddingVertical: 10,
                marginHorizontal: 20,
                alignSelf: 'center',
                borderRadius: 30,
            }}>
                <Image
                    source={require('../../../assets/images/car.png')}
                    style={{
                        width: 24,
                        height: 24,
                        resizeMode: "contain",
                        alignSelf: 'center',
                    }}
                />
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                    alignSelf: 'center',
                    marginLeft: 10,
                }}>{user.email}</Text>
            </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 10,
    justifyContent: 'space-between',
  },

  greetings: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: colors.textDark,
    width: '80%',
  },
  inputWrapper: {
    marginTop: 20,
  },
  emailInput: {
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    fontSize: 14,
    color: colors.activeText,
    fontFamily: 'Poppins-Regular',
    height: 44,
    backgroundColor: colors.aliceBlue,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Popins-Regular',
    color: colors.textLight,
    marginBottom: 8,
  },
  passwordInput: {
    borderRadius: 8,
    color: colors.textDark,
    backgroundColor: colors.aliceBlue,
    fontFamily: 'Poppins-Regular',
  },
  forgotPassword: {
    flexDirection: 'row',
    marginTop: 4,
    width: '100%',
    justifyContent: 'flex-end',
  },

  forgotPasswordText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.primary,
  },
  createAccountButton: {
    borderRadius: 8,
    height: 55,
  },

  input: {
    marginTop: 5,
  },
});
