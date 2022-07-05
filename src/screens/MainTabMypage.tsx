import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {
  View,
  Platform,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import Profile from '../components/Profile';
import MyCouponList from '../components/MyCouponList';
import MypageButton from '../components/MypageButton';
import LogOutButton from '../components/LogOutButton';
import Icon from '../../Icon-font.js';

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

const MainTabA1Screen = () => {
  const g = useGlobalStore();
  return (
    <>
      <ScrollView>
        <Container>
          <Profile />
        </Container>

        <MyCouponList />

        {/* <MypageButton title="결제내역" route="" style={{borderTopWidth: 1}} /> */}
        {/* <MypageButton title="사용내역" route="" /> */}
        <MypageButton
          title="공지사항"
          route="Notice"
          style={{borderTopWidth: 1}}
        />
        <MypageButton title="고객센터" route="CustomerService" />
        <MypageButton
          title="환경설정"
          route="Config"
          style={{borderBottomWidth: 0}}
        />
      </ScrollView>
      <Modal
        isVisible={g.couponModalVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        animationIn="fadeIn"
        animationOut="fadeOut"
        hasBackdrop={Platform.OS === 'android' ? true : false}
        onBackdropPress={() => g.toggleCouponModal(false)}
        hideModalContentWhileAnimating
        useNativeDriver={true}
        style={styles.drawerMenuStyle}>
        <CouponWrapper>
          <CouponContainer>
            <Bg
              source={require('../assets/images/couponBG.png')}
              resizeMode="contain"
            />
            <CloseButton>
              <Icon
                onPress={() => g.toggleCouponModal(false)}
                name="close"
                style={{fontSize: 28, color: '#000'}}
              />
            </CloseButton>
            <StoreName>메르블루</StoreName>
            <CouponName>무화과 스테이크 이용권</CouponName>
            <Date>(2020.10.01~2020.12.30)</Date>

            <HelpBox>
              <Help1>
                가게 사장님(혹은 점원)에게 이 화면을{'\n'}
                보여주세요.
              </Help1>
              <Help2>
                아무 액션 없이 가게의 관계자에게{'\n'}
                보여드리기만 하면 됩니다.
              </Help2>
            </HelpBox>
          </CouponContainer>

          <ConfirmBtn onPress={() => g.toggleCouponModal(false)}>
            <ConfirmText>사용하기</ConfirmText>
            <Icon name="arrow-right" style={{fontSize: 28, color: '#fff'}} />
          </ConfirmBtn>
        </CouponWrapper>
      </Modal>
    </>
  );
};

export default observer(MainTabA1Screen);

const ScrollView = styled.ScrollView``;
const Container = styled.View`
  padding: 0 16px;
`;

const CouponWrapper = styled.View`
  /* min-height: 380px; */
  padding: 0;
  background: #fff;
  overflow: hidden;
  border-radius: 10px;
`;
const CouponContainer = styled.View`
  padding: 26px 26px 0;
`;

const Bg = styled.Image`
  position: absolute;
  top: 0;
  right: 10px;
  width: 67px;
  height: 56px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
`;
const StoreName = styled.Text`
  max-width: 200px;
  font-size: 20px;
  font-weight: bold;
  line-height: 26px;
  color: #000;
  letter-spacing: -0.6px;
`;
const CouponName = styled.Text`
  max-width: 200px;
  font-size: 20px;
  font-weight: bold;
  line-height: 26px;
  color: #000;
  letter-spacing: -0.6px;
`;
const Date = styled.Text`
  margin-top: 5px;
  font-size: 15px;
  letter-spacing: -0.3px;
  color: #000;
`;
const HelpBox = styled.View`
  margin-top: 35px;
  padding: 23px 14px;
  background: #000;
`;
const Help1 = styled.Text`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.3px;
  color: #fff;
  line-height: 19px;
`;
const Help2 = styled.Text`
  margin-top: 10px;
  font-size: 13px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: -0.3px;
  color: #999;
  text-decoration: underline;
`;

const ConfirmBtn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  padding: 19px 21px;
  background: #01c5ff;
  border-top-width: 1px;
  border-style: dashed;
`;
const ConfirmText = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #fff;
`;
