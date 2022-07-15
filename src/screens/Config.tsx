import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import theme, {Space} from '../Theme';

import MypageButton from '../components/MypageButton';
import LogOutButton from '../components/LogOutButton';
import MypageSwichButton from '../components/MypageSwichButton';

const Config = () => {
  const g = useGlobalStore();
  return (
    <ScrollView>
      <Wrpper>
        <Container>
          <Row>
            <AppAvatar
              source={require('../assets/images/logo_icon.png')}
              resizeMode="cover"
            />
            <View>
              <Row>
                <Dt>현재버전</Dt>
                <Dd>1.0.1</Dd>
              </Row>
              <Row>
                <Dt>최신버전</Dt>
                <Dd>1.0.1</Dd>
              </Row>
            </View>
          </Row>
          <ConfirmButton update={false} activeOpacity={1}>
            <ConfirmButtonText update={false}>업데이트</ConfirmButtonText>
          </ConfirmButton>
        </Container>

        <Space />
        <MypageSwichButton title="알림 수신 설정" route="Notice" />
        <LogOutButton title="로그아웃" />
        <MypageButton title="회원탈퇴" route="Withdrawal" />
      </Wrpper>
    </ScrollView>
  );
};

export default observer(Config);
const Wrpper = styled.View`
  margin-bottom: 30px;
`;
const Container = styled.View`
  padding: 23px 16px;
`;
const AppAvatar = styled.Image`
  width: 60px;
  height: 60px;
  margin-right: 15px;
  border-radius: 30px;
  border-width: 0.5px;
  border-color: #ddd;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Dt = styled.Text`
  margin-right: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;
const Dd = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #999;
`;

const ScrollView = styled.ScrollView``;

const ConfirmButton = styled.TouchableOpacity<{update?: boolean}>`
  width: 100%;
  height: 50px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: ${props => (props.update ? theme.color.point : '#aaa')};
`;
const ConfirmButtonText = styled.Text<{update?: boolean}>`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  color: ${props => (props.update ? '#000' : '#fff')};
  letter-spacing: -0.3px;
`;
