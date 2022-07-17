import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import RecentAddressListItem from '../components/RecentAddressListItem';
import styled from 'styled-components/native';
import {SubTitle} from '../Theme';
const RecentAddressList = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();
  return (
    <>
      <Wrapper>
        <SubTitle>최근 주소</SubTitle>
        {g.recently_address.map((item, key) => (
          <RecentAddressListItem item={item} key={key} index={key} />
        ))}
      </Wrapper>
    </>
  );
};

export default observer(RecentAddressList);

const Wrapper = styled.View`
  flex: 1;
`;
