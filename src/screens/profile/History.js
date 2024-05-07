import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import colors from '../../../assets/colors/colors';
import {AuthContext} from '../../../context/AuthContext';
import endpoints from '../../../assets/endpoints/endpoints';
import {RefreshControl} from 'react-native-gesture-handler';
import FilterIcon from '../../../assets/icons/filterIcon.svg';
import mainRouts from '../../navigation/routs/mainRouts';
import Bottomsheet from 'react-native-raw-bottom-sheet';

export default History = ({navigation}) => {
  const {colorScheme, user, token} = useContext(AuthContext);
  const [orders, setOrders] = React.useState([]);
  const [processing, setProcessing] = React.useState(false);
  const bottomSheetRef = useRef();
  const appearance = colorScheme;
  const [selectedStatus, setSelectedStatus] = useState(null); // Step 1: State for selected status

  const getOrders = async () => {
    setProcessing(true);
    const response = await fetch(endpoints.baseUrl + endpoints.retrieveOrder, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        userid: user._id,
      }),
    });
    const json = await response.json();
    setProcessing(false);
    console.log(json);
    // Filter orders based on selected status, or show all if selectedStatus is "All"
    if (Array.isArray(json.data)) {
      let filteredOrders = json.data;
      if (selectedStatus && selectedStatus !== 'All') {
        filteredOrders = filteredOrders.filter(
          order => order.order_status === selectedStatus,
        );
      }
      setOrders(filteredOrders);
    }
  };
  useEffect(() => {
    getOrders();
  }, [selectedStatus]);

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
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
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
            History
          </Text>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current.open();
            }}>
            <FilterIcon />
          </TouchableOpacity>
        </View>
        {/* <Text
          style={{
            color: colors[colorScheme].primary,
            fontSize: 12,
            fontFamily: 'Inter-Regular',
            alignSelf: 'center',
            backgroundColor: colors[colorScheme].white,
            padding: 4,
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 6,
          }}>
          {user.online_status ? 'Online' : 'Offline'}
        </Text> */}
      </View>

      <FlatList
        data={orders}
        style={{
          marginTop: 20,
        }}
        refreshControl={
          <RefreshControl refreshing={processing} onRefresh={getOrders} />
        }
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 250,
            }}>
            <Text
              style={{
                color: colors[colorScheme].textDark,
                fontSize: 15,
                fontFamily: 'Inter-Regular',
              }}>
              No history available yet
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(mainRouts.dispatchDetails, {
                item: item,
              });
            }}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              elevation: 5,
              marginBottom: 10,
              marginHorizontal: 10,
              borderRadius: 10,
              backgroundColor: colors[colorScheme].background,
            }}>
            <Text
              style={{
                color: colors[colorScheme].textDark,
                fontSize: 14,
                fontFamily: 'Inter-SemiBold',
              }}>
              #{item._id}
            </Text>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 6,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: 4,
                }}>
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: colors[colorScheme].primary,
                  }}
                />
                <View
                  style={{
                    width: 1,
                    height: 40,
                    backgroundColor: colors[colorScheme].textGray,
                  }}
                />
                <View
                  style={{
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                    overflow: 'hidden',
                    borderTopWidth: 6,
                    borderRightWidth: 4,
                    borderBottomWidth: 0,
                    borderLeftWidth: 4,
                    borderTopColor: colors[colorScheme].primary,
                    borderRightColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderLeftColor: 'transparent',
                  }}
                />
              </View>

              <View
                style={{
                  height: 70,
                  marginLeft: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: colors[colorScheme].textDark,
                      fontSize: 16,
                      fontFamily: 'Inter-SemiBold',
                    }}>
                    {item?.sendername}
                  </Text>

                  
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: colors[colorScheme].textDark,
                      fontSize: 14,
                      fontFamily: 'Inter-Regular',
                      width: '70%',
                    }}>
                    {item?.receiveraddress}
                  </Text>

                  <View
                    style={{
                      backgroundColor: colors[colorScheme].textGray,
                      paddingVertical: 4,
                      borderRadius: 10,
                      paddingHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        color: colors[colorScheme].white,
                        fontSize: 12,
                        fontFamily: 'Inter-Regular',
                      }}>
                      {item?.order_status}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Bottomsheet
        height={340}
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

            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
          },
        }}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View>
            <View
              style={{
                width: '100%',
                paddingVertical: 20,
                paddingHorizontal: 20,
                paddingTop: 20,
              }}>
              <Text
                style={{
                  color: colors[colorScheme].textDark,
                  fontSize: 20,
                  fontFamily: 'Inter-Bold',
                }}>
                Filter by status
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setSelectedStatus('All'); // Update selectedStatus to 'All'
                bottomSheetRef.current.close();
              }}
              style={{
                width: '100%',
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderTopWidth: 1,
                borderColor: colors[appearance].textGray,
              }}>
              <Text
                style={{
                  color: colors[colorScheme].textDark,
                  fontSize: 15,
                  fontFamily: 'Inter-Medium',
                }}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedStatus('pending');
                bottomSheetRef.current.close();
              }}
              style={{
                width: '100%',
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderTopWidth: 1,
                borderColor: colors[appearance].textGray,
              }}>
              <Text
                style={{
                  color: colors[colorScheme].textDark,
                  fontSize: 15,
                  fontFamily: 'Inter-Medium',
                }}>
                Pending
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedStatus('pickup');
                bottomSheetRef.current.close();
              }}
              style={{
                width: '100%',
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderTopWidth: 1,
                borderColor: colors[appearance].textGray,
              }}>
              <Text
                style={{
                  color: colors[colorScheme].textDark,
                  fontSize: 15,
                  fontFamily: 'Inter-Medium',
                }}>
                Picked-Up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedStatus('shipping');
                bottomSheetRef.current.close();
              }}
              style={{
                width: '100%',
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderTopWidth: 1,
                borderColor: colors[appearance].textGray,
              }}>
              <Text
                style={{
                  color: colors[colorScheme].textDark,
                  fontSize: 15,
                  fontFamily: 'Inter-Medium',
                }}>
                Shipping
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedStatus('delivered');
                bottomSheetRef.current.close();
              }}
              style={{
                width: '100%',
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderTopWidth: 1,
                borderColor: colors[appearance].textGray,
              }}>
              <Text
                style={{
                  color: colors[colorScheme].textDark,
                  fontSize: 15,
                  fontFamily: 'Inter-Medium',
                }}>
                Delivered
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Bottomsheet>
    </View>
  );
};
