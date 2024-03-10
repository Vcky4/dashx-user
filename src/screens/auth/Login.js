import React, { useState, useEffect, useContext } from 'react';
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
} from 'react-native';
import Toast from 'react-native-toast-message';

import colors from '../../../assets/colors/colors';
import authRouts from '../../navigation/routs/authRouts';
import Button from '../../component/Button';
import PasswordInput from '../../component/PasswordInput';
import { AuthContext } from '../../../context/AuthContext';
import endpoints from '../../../assets/endpoints/endpoints';
import InputField from '../../component/InputField';
import mainRouts from '../../navigation/routs/mainRouts';
import * as Yup from 'yup';
import { Formik, validateYupSchema } from 'formik';

export default Login = ({ navigation }) => {
  const { saveToken, saveUser, colorScheme, login } = useContext(AuthContext);
  const appearance = colorScheme;
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [fadeIn] = useState(new Animated.Value(0));
  const [fade, setFade] = useState(0);
  useEffect(() => {
    message != '' && setFade(1);
    setTimeout(() => {
      setFade(0);
      setMessage('');
    }, 2500);
  }, [message]);

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: fade,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  const loginUser = async ({ email, password }) => {
    setProcessing(true);
    const response = await fetch(endpoints.baseUrl + endpoints.login, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
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
            text1: 'Login successful',
            text2: data.message,
          });
          saveUser(data.data.userDetails);
          saveToken(data.data.token);
        } else {
          setProcessing(false);
          // if (data.error == 'user email is not veirified'){
          //   navigation.navigate(authRouts.otpVerification,{email:email})
          // }
          Toast.show({
            type: 'error',
            text1: 'Login failed',
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

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string().min(4, 'Password is too short').required('Password Required'),
  });
  return (
    <>
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

          <View
            style={{
              marginTop: 30,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 15,
            }}>
            <View
              style={{
                height: 25,
                width: 25,
                borderRadius: 15,
                borderWidth: 5,
                borderColor: colors[appearance].primary,
              }}
            />
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                fontSize: 16,
                color: colors[appearance].textDark,
                marginLeft: 15,
              }}>
              Sign in.
            </Text>
          </View>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={loginUser}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors,
              touched, isValid, dirty }) => (

              <View>
                <InputField
                  theme={appearance}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Enter e-mail"
                  containerStyle={styles.input}
                  onBlur={handleBlur('email')}
                />
                {touched.email && errors.email && <Text style={{
                  color: 'red',
                  fontWeight: 'normal',
                  fontSize: 12,
                  fontFamily: 'Inter-Regular',
                }}>{errors.email}</Text>}
                <PasswordInput
                  theme={appearance}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Password"
                  containerStyle={styles.input}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                />
                {touched.password && errors.password &&
                  <Text style={{
                    color: 'red',
                    fontWeight: 'normal',
                    fontSize: 12,
                    fontFamily: 'Inter-Regular',
                  }}>{errors.password}</Text>}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(authRouts.forgotPassword);
                  }}
                  style={{alignSelf:'flex-end'}}
                  >
                  <Text
                    style={{
                      fontFamily: 'Inter-SemiBold',
                      fontSize: 14,
                      color: colors[appearance].primary,
                      
                      textAlign: 'right',
                      paddingVertical:16
                    }}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>

                <Button
                  title="Sign In"
                  buttonStyle={{
                    marginTop: 30,
                    marginHorizontal: 20,
                    borderRadius: 30,
                  }}
                  loading={processing}
                  enabled={isValid && dirty && !processing}
                  textColor={colors[appearance].textDark}
                  buttonColor={colors[appearance].primary}
                  onPress={() => {
                    handleSubmit()
                  }}
                />
              </View>
            )}


          </Formik>


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
                navigation.navigate(authRouts.signUp);
              }}
              style={{
                color: colors[appearance].primary,
                fontWeight: 'bold',
                fontSize: 18,
                fontFamily: 'Inter-Regular',
              }}>
              {' '}
              Sign Up
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
      </View>
    </>
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
    marginTop: 20,
  },
});
