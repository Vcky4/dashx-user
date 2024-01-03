export default OrderItem =()=>{
    return(
        <View
        style={{
          paddingVertical: 6,
          borderWidth: 1,
          borderRadius: 15,
          borderColor: '#A10F7E',
          paddingHorizontal: 10,
          marginTop: 31,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
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
                fontFamily: 'Inter-Medium',
                fontSize: 16,

                color: colors[appearance].textDark,
              }}>
              1
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                tintColor={colors[appearance].textDark}
                style={{height: 20, width: 20}}
                source={require('../../../assets/images/call.png')}
              />
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 16,

                  color: colors[appearance].textDark,
                }}>
                08166565462
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              height: 18,
              width: 18,
              backgroundColor: '#A10F7E',
              borderRadius: 20,
              marginEnd: 7,
              marginTop: 10,
            }}></View>

          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 15,

              color: colors[appearance].textDark,
            }}>
            {user.name}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', width: '65%'}}>
            <View
              style={{
                height: 60,
                width: 4,
                backgroundColor: '#000',
                marginStart: 7,

                marginTop: 7,
              }}></View>

            <Text
              style={{
                paddingStart: 10,
                maxWidth: '100%',
                color: '#868686',
              }}>
              kilometre 55, Lekki - Epe Expressway Sangotedo Ibeju-Lekki
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#31D0AA',
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 15,

                color: colors.light.white,
              }}>
              Picked-up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: 18,
              width: 18,
              backgroundColor: '#31D0AA',
              borderRadius: 20,
              marginEnd: 7,
              marginTop: 7,
            }}></View>

          <View style={{}}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 15,
                color: colors[appearance].textDark,
              }}>
              Frank Bambi
            </Text>
            <Text style={{paddingStart: 4, color: '#868686'}}>
              kilometre 55, Lekki - Epe Expressway Sangotedo Ibeju-Lekki
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            marginVertical:12

          }}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../../../assets/images/vehicle.png')}
          />
          <View
            style={{
              height: 2,
              width: '80%',
              backgroundColor: '#31D0AA',
            }}></View>

          <Image
            style={{height: 30, width: 30}}
            source={require('../../../assets/images/delivery.png')}
          />
        </View>
      </View>
    )
}