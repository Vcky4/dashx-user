import React from 'react';
import {View, Dimensions, StyleSheet, Image} from 'react-native';
import colors from '../../../assets/colors/colors';

const {width, height} = Dimensions.get('window');

export default Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../assets/images/splashs.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A10F7E',
  },
  image: {
    resizeMode: 'cover',
    width: width,
    height: height,
    marginBottom: 80,
    resizeMode: 'contain',
  },
});
