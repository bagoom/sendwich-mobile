import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import RecentAddressListItem from '../components/RecentAddressListItem';
import styled from 'styled-components/native';
import {SubTitle} from '../Theme';

const dummy = [
  {
    id: 1,
    newAddr: '서울특별시 강남구 학동로33길 40 110-805',
    oldAddr: '[지번]논현동 77-2 110-805',
  },
  {
    id: 2,
    newAddr: '서울특별시 강남구 학동로33길 40 110-805',
    oldAddr: '[지번]논현동 77-2 110-805',
  },
  {
    id: 3,
    newAddr: '서울특별시 강남구 학동로33길 40 110-805',
    oldAddr: '[지번]논현동 77-2 110-805',
  },
  {
    id: 4,
    newAddr: '서울특별시 강남구 학동로33길 40 110-805',
    oldAddr: '[지번]논현동 77-2 110-805',
  },
];
const RecentAddressList = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();
  return (
    <>
      <Wrapper>
        <SubTitle>최근 주소</SubTitle>
        {g.recently_address.map((item, key) => (
          <RecentAddressListItem item={item} key={key} />
        ))}
      </Wrapper>
    </>
  );
};

export default observer(RecentAddressList);

const Wrapper = styled.View`
  flex: 1;
`;
