import React, {useState, useEffect, useContext} from 'react';
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
import {AuthContext} from '../../../context/AuthContext';
import endpoints from '../../../assets/endpoints/endpoints';
import InputField from '../../component/InputField';

export default Login = ({navigation}) => {
  const {saveToken, saveUser, colorScheme, login} = useContext(AuthContext);
  const appearance = colorScheme;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const canProceed = email.length > 5 && password.length > 0;
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
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

  const loginUser = async () => {
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
        console.log(data); // JSON data parsed by `data.json()` call
        setProcessing(false);
        if (response.ok) {
          Toast.show({
            type: 'success',
            text1: 'Login successful',
            text2: data.message,
          });
          login(data.data.accessToken, data.data.user);
        } else {
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

          <InputField
            theme={appearance}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter e-mail"
            containerStyle={styles.input}
          />
          <PasswordInput
            theme={appearance}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            containerStyle={styles.input}
          />

          <TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                fontSize: 14,
                color: colors[appearance].primary,
                marginTop: 16,
                marginLeft: 35,
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
            enabled={canProceed && !processing}
            textColor={colors[appearance].textDark}
            buttonColor={colors[appearance].primary}
            onPress={() => {
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
                navigation.navigate(authRouts.signUp);
              }}
              style={{
                color: colors[appearance].primary,
                fontWeight: 'bold',
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
    marginHorizontal: 20,
  },
});
