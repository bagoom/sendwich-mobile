import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Platform, Dimensions, View, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import theme from '../Theme';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const EventItem = (props: any) => {
  const {data} = props;
  const g = useGlobalStore();
  const navigation = useNavigation<any>();
  return (
    <ListItem onPress={() => navigation.navigate('BannerDetail', data.id)}>
      {/* <Badge>
        <BadgeText>선착순</BadgeText>
      </Badge> */}

      <CouponImg source={require('../assets/images/coupon.png')} />

      <Catrory>{data.name}</Catrory>
      <Title>{data.etc}</Title>
      <Date>{moment(data.end_date).format('yy.MM.DD')}까지</Date>
    </ListItem>
  );
};

export default observer(EventItem);

const ListItem = styled.TouchableOpacity`
  min-height: 120px;
  margin-bottom: 13px;
  padding: 16px;
  border-width: 1px;
  border-color: #f1f1f1;
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
  /* elevation: 1 */
`;

const Badge = styled.View`
  padding: 2px 12px;
  background: ${theme.color.point};
  border-radius: 20px;
`;
const BadgeText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 12px;
`;
const CouponImg = styled.Image`
  position: absolute;
  top: 23px;
  right: 23px;
  width: 42px;
  height: 34px;
  z-index: 1;
`;
const Catrory = styled.Text`
  margin-top: 13px;
  color: #000;
  font-size: 19px;
  font-weight: 300;
  letter-spacing: -1px;
`;
const Title = styled.Text`
  color: #000;
  font-size: 19px;
  font-weight: bold;
  letter-spacing: -1px;
`;
const Date = styled.Text`
  margin-top: 10px;
  color: #999;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: -0.5px;
`;
