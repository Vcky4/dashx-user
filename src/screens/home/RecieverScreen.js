import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Dimensions,
  TextInput,
  Animated,
} from 'react-native';
import io from 'socket.io-client';
import colors from '../../../assets/colors/colors';
import endpoints from '../../../assets/endpoints/endpoints';
// import dings from '../../../assets/sounds/trilla.mp3'
import mainRouts from '../../navigation/routs/mainRouts';
import {AuthContext} from '../../../context/AuthContext';
var Sound = require('react-native-sound');

export default Home = ({navigation}) => {
  //check if ready
  // const ready = variableUser?.data?.longitude != 0 && variableUser?.data?.is_online == 1;
  return (
    <View
      style={[
        styles.container,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <Text>Wallet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
});
