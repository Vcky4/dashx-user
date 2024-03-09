import React, {useContext, useEffect, useState} from 'react';
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

export default Wallet = ({navigation}) => {
  const {colorScheme, user, token} = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const [wallet, setWallet] = useState({});
  const [history, setHistory] = useState([]);
  // console.log(user)


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



  useEffect(() => {
    onRefresh()
}, [])

const onRefresh = () => {
    getBalance()
}

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
                  onPress={() => navigation.navigate(mainRouts.deposit)}
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
  );
};
