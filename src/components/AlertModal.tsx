import React from 'react';
import Modal from 'react-native-modal';
import {View, StyleSheet, Platform, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {useGlobalStore} from '../store/util';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from '../../Icon-font.js';
import theme from '../Theme';

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
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

const AlertModal = ({visible, confirm, cancel, param}: any) => {
  const g = useGlobalStore();
  return (
    <Modal
      isVisible={visible}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      animationIn="fadeIn"
      animationOut="fadeOut"
      hasBackdrop={Platform.OS === 'android' ? true : false}
      hideModalContentWhileAnimating
      useNativeDriver={true}
      style={styles.drawerMenuStyle}>
      <Box>
        <Body>
          <Icon name="info" style={{fontSize: 42, color: '#666'}} />
          <Title>{param.title}</Title>
          <Message>{param.message}</Message>
        </Body>

        <Footer>
          {param.cancelText && (
            <CancelBtn onPress={cancel} activeOpacity={1}>
              <CancelBtnText>{param.cancelText}</CancelBtnText>
            </CancelBtn>
          )}
          <ConfirmBtn onPress={() => confirm()} activeOpacity={1}>
            <ConfirmBtnText>{param.confirmText}</ConfirmBtnText>
          </ConfirmBtn>
        </Footer>
      </Box>
    </Modal>
  );
};

export default AlertModal;

const Container = styled.View``;
const Box = styled.View`
  background: #f5f5f5;
  border-radius: 5px;
  elevation: 5;
  overflow: hidden;
`;

const Body = styled.View`
  padding: 65px 0 120px;
  align-items: center;
  justify-content: center;
`;
const Footer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: row;
  justify-content: space-between;
`;
const ConfirmBtn = styled.TouchableOpacity`
  flex: 1;
  padding: 16px 0;
  background: ${theme.color.point};

  align-items: center;
`;
const CancelBtn = styled.TouchableOpacity`
  flex: 1;
  padding: 16px 0;
  background: #e5e5e5;
  align-items: center;
`;

const Title = styled.Text`
  margin: 15px 0;
  font-size: 17px;
  font-weight: bold;
  color: #444;
`;
const Message = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #666;
`;
const ConfirmBtnText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;
const CancelBtnText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;
