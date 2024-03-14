import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import colors from '../../../assets/colors/colors';
import {AuthContext} from '../../../context/AuthContext';
import mainRouts from '../../navigation/routs/mainRouts';
import endpoints from '../../../assets/endpoints/endpoints';
import formatNumber from '../../../utils/formatNumber';
import BottomSheet from 'react-native-raw-bottom-sheet';
import InputField from '../../component/InputField';
import Button from '../../component/Button';
import { useFocusEffect } from '@react-navigation/native';
export default Wallet = ({navigation}) => {
  const {colorScheme, user, token} = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const [wallet, setWallet] = useState({});
  const [history, setHistory] = useState([]);
  const panelRef = useRef();
  // console.log(user)
  const [isLoading, setIsLoading] = React.useState(false)
  const [amount, setAmount] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)
  const canproceed = amount.length >= 4 // Check if amount is greater than or equal to 4 digits

  const deposit = () => {
    setIsLoading(true)
    fetch(endpoints.baseUrl + endpoints.fundWallet, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
          userid: user?._id,
            amount: parseInt(amount),
            email: user?.email,
            usertype: "user"
        }),
    }).then(res => res.json())
        .then(resJson => {
            setIsLoading(false)
            console.log('resJson', resJson);
            if (resJson.status) {
                navigation.navigate(mainRouts.broswer, {
                    url: resJson.data,
                    title: 'Deposit'
                });
            }
        })
        .catch(err => {
            setIsLoading(false)
            console.log('err', err);
        });
};


  const getHistory = (id) => {
    setProcessing(true);
    fetch(endpoints.baseUrl + endpoints.history, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        userid: user?._id,
        walletid:id
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        setProcessing(false);
        if (Array.isArray(resJson.data)) {
          console.log('history', resJson);
          setHistory(resJson.data);
        }
      })
      .catch(err => {
        setProcessing(false);
        console.log('err', err);
      });
  };

  const getBalance = () => {
    setProcessing(true);
    fetch(endpoints.baseUrl + endpoints.retreive, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        userid: user?._id,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        setProcessing(false);
        console.log('resJson', resJson);
        if (resJson.status) {
          setWallet(resJson.data);
          getHistory(resJson.data._id);
        }
      })
      .catch(err => {
        setProcessing(false);
        console.log('error', err);
      });
  };


useFocusEffect(
  useCallback(() => {
      onRefresh()
  }, [])
)

const onRefresh = () => {
    getBalance()
    getHistory()
}

  return (
    <>
      <View
      style={{
        flex: 1,
        backgroundColor: colors[colorScheme].background,
      }}>
      <View
        style={{
          backgroundColor: colors[colorScheme].primary,
          padding: 20,
          paddingBottom: 30,
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
              padding:20
            }}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/images/back.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                tintColor: colors[colorScheme].white,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: colors[colorScheme].white,
              fontSize: 24,
              fontFamily: 'Inter-Bold',
            }}>
            Wallet
          </Text>
        </View>
      </View>

      <FlatList
        data={history}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        refreshControl={
          <RefreshControl
            refreshing={processing}
            onRefresh={onRefresh}
          />
        }
        ListHeaderComponent={
          <View>
            <View
              style={{
                backgroundColor: colors[colorScheme].black,
                padding: 20,
                borderRadius: 20,
                marginTop: 20,
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  color: colors[colorScheme].white,
                  fontSize: 16,
                  fontFamily: 'Inter-SemiBold',
                }}>
                Total Balance
              </Text>
              <Text
                style={{
                  color: colors[colorScheme].white,
                  fontSize: 24,
                  fontFamily: 'Inter-Bold',
                  marginVertical: 15,
                }}>
                ₦ {formatNumber(wallet.balance)}
              </Text>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {panelRef.current.open()}}
                  style={{
                    backgroundColor: colors[colorScheme].primary,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      color: colors[colorScheme].white,
                      fontSize: 16,
                      fontFamily: 'Inter-SemiBold',
                    }}>
                    + Deposit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={{
                color: colors[colorScheme].textDark,
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
                marginHorizontal: 20,
                marginTop: 16,
              }}>
              Recent Transactions
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: colors[colorScheme].primary,
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Image
                  source={require('../../../assets/images/down.png')}
                  style={{
                    width: 12,
                    height: 12,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: 10,
                }}>
                <Text
                  style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-SemiBold',
                  }}>
                  Deposit
                </Text>
                <Text
                  style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 14,
                    fontFamily: 'Inter-Regular',
                  }}>
                  To Bank Account
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: colors[colorScheme].textDark,
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
              }}>
              ₦ {item?.amount}
            </Text>
          </View>
        )}
      />


    </View>

    
    <BottomSheet
        height={320}
        width={'100%'}
        animationType="fade"
        ref={panelRef}
        closeOnDragDown={false}
        closeOnPressMask={true}
        closeOnPressBack={true}
        customStyles={{
          draggableIcon: {
          
            width: 50,
            height: 1,
          },
          container: {
            // backgroundColor: 'rgba(158, 176, 162, 0.5)',
            backgroundColor: colors[colorScheme].white,
            borderTopStartRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
            paddingBottom: 10,
          },
        }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{
                        fontFamily: 'Satoshi-Bold',
                        fontSize: 24,
                        color: colors[colorScheme].textDark,
                        marginTop: 20,
                        textAlign: 'center'
                    }}>
                        Deposit
                    </Text>
                    <Text style={{
                        fontFamily: 'Satoshi-Medium',
                        fontSize: 15,
                        color: colors[colorScheme].textDark,
                        marginTop: 20,
                    }}>
                        Enter Amount (NGN)
                    </Text>
                    {/* Input field for amount */}
                    <InputField
                        theme={colorScheme}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType='numeric'
                        placeholder="Enter Amount"
                        containerStyle={{ marginTop: 16 }}
                    />
                    {/* Note for amount */}
                    {
                        amount.length > 1 && amount <= 1000 &&
                        <Text style={{
                            color: colors[colorScheme].error,
                        }}>Note: Amount cannot be less than #1000</Text>
                    }

                    {/* Buttons for Cancel and Recharge Wallet */}
                    <View style={{
                        marginTop: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 20,
                        justifyContent: 'space-between'
                    }}>
                        {/* Cancel button */}
                        <Button
                            title="Cancel"
                            buttonStyle={{
                                borderRadius: 10,
                                width: '45%'
                            }}
                            enabled={true}
                            textColor={colors[colorScheme].buttonLight}
                            buttonColor={colors[colorScheme].card}
                            onPress={() => {
                                panelRef.current.close()
                            }}
                        />
                        {/* Recharge Wallet button */}
                        <Button
                            title="Proceed"
                            buttonStyle={{
                                borderRadius: 10,
                                width: '45%'
                            }}
                            loading={isLoading}
                            enabled={canproceed}
                            textColor={colors[colorScheme].white}
                            buttonColor={colors[colorScheme].primary}
                            onPress={() => {
                                panelRef.current.close()
                                deposit()
                            }}
                            fontSize={16}
                        />
                    </View>
                </View>
            </BottomSheet>
    </>
  
  );
};
