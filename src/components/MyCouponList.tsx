import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';

import LikeListItem from './MyCouponListItem';

const data = [{id: 1}, {id: 2}];

const MyCouponList = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();

  return (
    <Wrapper>
      <Title>구매 이용권</Title>
      {data.map((item, key) => (
        <LikeListItem item={item} key={key} />
      ))}
    </Wrapper>
  );
};

export default observer(MyCouponList);

const Wrapper = styled.View<{type?: number}>`
  padding: 25px 16px;
  background: #f9f9f9;
`;
const Title = styled.Text`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  letter-spacing: -0.3px;
`;
