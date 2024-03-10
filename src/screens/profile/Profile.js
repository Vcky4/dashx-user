import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  AppRegistry,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import colors from '../../../assets/colors/colors';
import { AuthContext } from '../../../context/AuthContext';
import Back from '../../../assets/icons/backIcon.svg';
import InputField from '../../component/InputField';
import Button from '../../component/Button';
import endpoints from '../../../assets/endpoints/endpoints';
import Toast from 'react-native-toast-message';
import mainRouts from '../../navigation/routs/mainRouts';
import BackArrow from '../../../assets/icons/backIcon.svg';
import { Formik } from 'formik';
import * as yup from 'yup';


export default Profile = ({ navigation }) => {
  const { colorScheme, user, token, saveUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [processing, setProcessing] = useState(false);
  const appearance = colorScheme;
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    name: user?.name || '',
    Phone: user?.phone || '',
    email: user?.email || '',
  });

  const ProfileSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    Phone: yup.string().required('Phone number is required'),
  });

 
  const getProfile = async () => {
    setLoading(true);
    const response = await fetch(endpoints.baseUrl + endpoints.getProfile, {
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
        // console.log('item', data.data); // JSON data parsed by `data.json()` call

        if (response.ok) {
          setLoading(false);
          //   setProfile(data.data);
          saveUser(data.data);
          
        } else {
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: ' Profile successfully',
            text2: data.message,
          });
          console.log('response: ', response);
          console.log(' profile error:', data.message);
        }
      })

      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'profile failed',
          text2: error.message,
        });
        console.log('updateprofile error:', error);
      });
  };

  const handleSubmit = async (values, actions) => {
    const { name, email, Phone } = values;

    try {
      const response = await fetch(endpoints.baseUrl + endpoints.profile, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          userid: user?._id,
          email,
          phone: Phone,
          name,
          address: user.address,
          longitude: user.longitude,
          latitude: user.latitude,
          state: user.state,
          city:user.city
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // saveUser(data.data);
        getProfile()
        Toast.show({
          type: 'success',
          text1: 'Profile updated successfully',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to update profile',
          text2: data.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Update profile failed',
        text2: error.message,
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

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
                padding: 20
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
            {user?.name}
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
        <Formik
          initialValues={{ name: user?.name || '', email: user?.email || '', Phone: user?.phone || '' }}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (


            <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
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
                  value={values.name}
                  onChangeText={handleChange('name')}
                  style={{
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                    // color: colors[theme].textDark,
                    width: '100%',
                  }}
                  onBlur={handleBlur('name')}
                //   cursorColor={colors[theme].primary}
                />

              </View>
              {touched.name && errors.name && <Text style={{
                color: 'red',
                fontWeight: 'normal',
                fontSize: 12,
                fontFamily: 'Inter-Regular',
                marginStart: 20
              }}>{errors.name}</Text>}

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
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  style={{
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                    // color: colors[theme].textDark,
                    width: '100%',
                  }}
                //   cursorColor={colors[theme].primary}
                />

              </View>
              {touched.email && errors.email && <Text style={{
                color: 'red',
                fontWeight: 'normal',
                fontSize: 12,
                marginStart: 20,
                fontFamily: 'Inter-Regular',
              }}>{errors.email}</Text>}

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
                  value={values.Phone}
                  onChangeText={handleChange('Phone')}
                  onBlur={handleBlur('phone')}
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
              {touched.Phone && errors.Phone && <Text style={{
                color: 'red',
                fontWeight: 'normal',
                fontSize: 12,
                marginStart: 20,
                fontFamily: 'Inter-Regular',
              }}>{errors.Phone}</Text>}

              <Button
                title="Save"
                buttonStyle={{
                  marginTop: 30,
                  marginHorizontal: 20,
                  borderRadius: 30,
                }}
                loading={isSubmitting}
                enabled={true}
                textColor={colors[appearance].textDark}
                buttonColor={colors[appearance].primary}
                onPress={() => {
                  handleSubmit()
                  // navigation.navigate(authRouts.otpVerification)
                }}
              />
            </View>
          )}

        </Formik>


      </ScrollView>
      <ActivityIndicator animating={loading} size={'large'} style={{ position: 'absolute', bottom: 0, left: 0, top: 0, right: 0 }} />
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
