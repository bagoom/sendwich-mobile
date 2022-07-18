import React from 'react';
import Modal from 'react-native-modal';
import {View, StyleSheet, Platform, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {useGlobalStore} from '../store/util';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from '../../Icon-font.js';
import theme from '../Theme';
//@ts-ignore
import {BubblesLoader} from 'react-native-indicator';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get(
        'REAL_WINDOW_HEIGHT',
      );

const styles = StyleSheet.create({
  drawerMenuStyle: {
    width: deviceWidth, // SideMenu width
    margin: 0,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

const LoadingModal = ({visible, confirm, cancel, param}: any) => {
  const g = useGlobalStore();

  return (
    <Modal
      isVisible={visible}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor={'transparent'}
      backdropOpacity={0.1}
      hasBackdrop={Platform.OS === 'android' ? true : false}
      useNativeDriver={true}
      style={styles.drawerMenuStyle}>
      <BubblesLoader size={28} dotRadius={6} color={theme.color.point} />
    </Modal>
  );
};

export default LoadingModal;
