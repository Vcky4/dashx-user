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
import { AuthContext } from '../../../context/AuthContext';
import endpoints from '../../../assets/endpoints/endpoints';
import InputField from '../../component/InputField';
import PasswordInput from '../../component/PasswordInput';
import Button from '../../component/Button';
import authRouts from '../../navigation/routs/authRouts';
import * as Yup from 'yup';
import { Formik, validateYupSchema } from 'formik';


export default ForgetPassword = ({ navigation }) => {
  const { saveToken, saveUser, colorScheme } = useContext(AuthContext);
  const appearance = colorScheme;
  const [processing, setProcessing] = useState(false);
  const forgetPassword = async ({email}) => {
    setProcessing(true);
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
        setProcessing(false);
        if (response.ok) {
          Toast.show({
            type: 'success',
            text1: 'forgot passsword successful',
            text2: data.message,
          });
          navigation.navigate(authRouts.resetPassword,{email:email});
          // saveUser(data.user)
          // navigation.navigate(authRouts.otpVerification, { token: data.data.accessToken })
        } else {
          Toast.show({
            type: 'error',
            text1: 'forgot passsword failed',
            text2: data.message,
          });

          console.log('response: ', response);
          console.log('forgot passsword error:', data);
        }
      })
      .catch(error => {
        setProcessing(false);
        Toast.show({
          type: 'error',
          text1: 'Login failed',
          text2: error.message,
        });
        console.log('response: ', response);
        console.log('Login error:', error);
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

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
          Forget Password
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
            Recovery.
          </Text>
        </View>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values) => forgetPassword(values)}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (

            <View>
              <InputField
                theme={appearance}
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="Enter e-mail"
                containerStyle={styles.input}
                onBlur={handleBlur('email')}
              />
              {touched.email && errors.email && <Text  style={{
            fontFamily: 'Inter-Regular',
            fontSize: 14,
            color: 'red',
        
           
          }}>{errors.email}</Text>}
              <Button
                title="Send Code"
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
          Don’t have a DashX Account?
          <Text
            onPress={() => {
              navigation.navigate(authRouts.signUp);
            }}
            style={{
              color: colors[appearance].primary,
              fontFamily: 'Inter-SemiBold',
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
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
  },
  errorText: {
    color: colors, // Adjust error color as needed
    fontSize: 14,
    marginTop: 5,
    paddingStart:5
  },
});
