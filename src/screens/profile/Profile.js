import React, {useContext, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../../assets/colors/colors';
import {AuthContext} from '../../../context/AuthContext';
import Back from '../../../assets/icons/backIcon.svg';
import InputField from '../../component/InputField';
export default Profile = ({navigation}) => {
  const {colorScheme, user} = useContext(AuthContext);
  console.log(user);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const appearance = colorScheme;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors[colorScheme].background,
      }}>
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
          {user?.userDetails.name}
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
        <InputField
          theme={appearance}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          containerStyle={styles.input}
        />

        <Text
          style={{
            color: colors[colorScheme].textDark,
            fontSize: 20,
            fontFamily: 'Inter-Medium',
            marginTop:20
          }}>
          Email
        </Text>
        <InputField
          theme={appearance}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter e-mail"
          containerStyle={styles.input}
        />

        <Text
          style={{
            color: colors[colorScheme].textDark,
            fontSize: 20,
            fontFamily: 'Inter-Medium',
            paddingTop: 20,
          }}>
          Phone
        </Text>
        <InputField
          theme={appearance}
          value={Phone}
          onChangeText={setPhone}
          placeholder="Phone"
          containerStyle={styles.input}
        />


      </View>

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
