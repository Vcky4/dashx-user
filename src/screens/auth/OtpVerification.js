import React, {useState, useContext, useEffect} from 'react';
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
import OtpFields from '../../component/OtpFields';
import Button from '../../component/Button';
import authRouts from '../../navigation/routs/authRouts';
import {AuthContext} from '../../../context/AuthContext';
import mainRouts from '../../navigation/routs/mainRouts';
import endpoints from '../../../assets/endpoints/endpoints';

export default OtpVerification = ({navigation,route}) => {
  const {saveToken, saveUser, user, colorScheme} = useContext(AuthContext);
  const appearance = colorScheme;
  const {email} = route.params
  const [otp, setOtp] = useState('');
  const [processing, setProcessing] = useState(false);
  const [timerCount, setTimer] = useState(0);
  const [activator, setActivator] = useState(Math.random());

  useEffect(() => {
    let interval;
    // if (text.length == 4) {
    //   // verify(text);
    // }
    interval = setInterval(() => {
      if (timerCount > 0) {
        setTimer(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [activator]);

  const forgetPassword = async () => {

    const response = await fetch(endpoints.baseUrl + endpoints.forgotPassword, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }), // body data type must match "Content-Type" header
    });
    response
      .json()
      .then(data => {
        // console.log(data); // JSON data parsed by `data.json()` call
       
        if (response.ok) {
          Toast.show({
            type: 'success',
            text1: 'Resend otp successful',
            text2: data.message,
          });
          
          // saveUser(data.user)
          // navigation.navigate(authRouts.otpVerification, { token: data.data.accessToken })
        } else {
          Toast.show({
            type: 'error',
            text1: 'Resend otp failed',
            text2: data.message,
          });

          console.log('response: ', response);
          console.log('Resend otp error:', data);
        }
      })
      .catch(error => {
      
        Toast.show({
          type: 'error',
          text1: 'otp failed',
          text2: error.message,
        });
        console.log('response: ', response);
        console.log('otp error:', error);
      });
  };

  const verify = async () => {
    setProcessing(true);
    const response = await fetch(
      endpoints.baseUrl + endpoints.otpverification,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
          code: otp,
        }), // body data type must match "Content-Type" header
      },
    );
    response
      .json()
      .then(data => {
        // console.log(data); // JSON data parsed by `data.json()` call

        if (response.ok) {
          setProcessing(false);
          Toast.show({
            type: 'success',
            text1: 'Verification successful',
            text2: data.message,
          });

          navigation.navigate(authRouts.login);
        } else {
          setProcessing(false);
          Toast.show({
            type: 'error',
            text1: 'Verification failed',
            text2: data.message,
          });
          console.log('response: ', response);
          console.log('Verification error:', data);
        }
      })
      .catch(error => {
        setProcessing(false);
        Toast.show({
          type: 'error',
          text1: 'Verification failed',
          text2: error.message,
        });
        console.log('response: ', response);
        console.log('Verification error:', error);
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
          Verify Account
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
              height: 22,
              width: 22,
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
            Verification.
          </Text>
        </View>
        <View style={styles.container}>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Inter-Reular',
                color: colors[appearance].textDark,
                width: '90%',
                marginTop: 20,
              }}>
              An OTP has been sent to your registered email.
            </Text>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.inputWrapper}>
              <OtpFields
                style={styles.otp}
                nuberOfFields={5}
                value={otp}
                isSecured={true}
                onChangeText={text => {
                  setOtp(text);
                  if (text.length == 5) {
                    // verify(text);
                  }
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  timerCount > 0 ? {} : forgetPassword();
                }}
                style={{
                  fontSize: 15,
                  // textAlign: 'center',
                  color: colors[appearance].primary,
                  alignSelf: 'center',
                  marginBottom: 10,
                  fontFamily: 'Inter-Semibold',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    // textAlign: 'center',
                    color: colors[appearance].primary,
                    // alignSelf: 'center',
                    marginBottom: 10,
                    fontFamily: 'Inter-Semibold',
                  }}>
                  {timerCount > 0 ? '0:' + timerCount : 'Resend'}
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
          <Button
            title={'Submit'}
            onPress={() => {
              verify();
            }}
            textColor={colors[appearance].white}
            buttonColor={colors[appearance].primary}
            buttonStyle={{
              borderRadius: 30,
            }}
            loading={processing}
            enabled={otp.length == 5}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  inputWrapper: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  createAccountButton: {
    borderRadius: 8,
    height: 55,
    marginBottom: 40,
  },
});
