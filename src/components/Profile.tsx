import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import theme, {SubTitle} from '../Theme';
import {convertNumberToMobile} from '../lib/transfer';
import {useShoppingState} from '../hooks/useIap';

const Profile = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();
  const profile = g.sendwichProfile;
  const Iap = useShoppingState();

  console.log(Iap);

  // 구매
  const onPurchase = (item: any) => {
    if (item.type === 'subs') {
      Iap.requestSubscriptionPurchase(item.productId);
    } else {
      Iap.requestItemPurchase(item.productId);
    }
  }

  return (
    <Wrapper>
      <Row>
        <Avatar source={{uri: `${profile.avatar}`}} resizeMode="cover" />
        <Info>
          <Title>{profile.username}님 반갑습니다.</Title>
          <Contact>{convertNumberToMobile(profile.phoneNumber)}</Contact>
        </Info>
      </Row>

      <Membership>
        <View style={{flexDirection: 'row'}}>
          <Status>멤버십 회원입니다. </Status>
          <Date>(2021.12.08~2022~01.07)</Date>
        </View>

        {/* <Button onPress={()=> onPurchase({ 
            type : 'subs',
            productId : 'com.subscription01'
          })}> */}
        <Button>
          <ButtonText>회원권연장</ButtonText>
        </Button>
      </Membership>
      {/* <SubTitle>최근 주소</SubTitle> */}
    </Wrapper>
  );
};

export default observer(Profile);

const Wrapper = styled.View`
  padding: 25px 0;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  margin-right: 15px;
  border-radius: 30px;
  border-width: 0.5px;
  border-color: #ddd;
`;

const Info = styled.View`
  width: 100%;
`;

const Title = styled.Text`
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.3px;
  color: #000;
`;

const Contact = styled.Text`
  font-size: 15px;
  color: #888;
`;

const Membership = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 11px 12px;
  background: ${theme.color.point};
  border-radius: 5px;
`;

const Status = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.3px;
`;

const Date = styled.Text`
  font-size: 12px;
  color: #fff;
  letter-spacing: -0.3px;
`;

const Button = styled.TouchableOpacity`
  padding: 4px 7px;
  background: #000;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  font-size: 12px;
  color: #fff;
  letter-spacing: -0.3px;
`;
