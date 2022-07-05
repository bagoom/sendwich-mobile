import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import CustomerServiceListItem from '../components/CustomerServiceListItem';
import CCFilterButton from './base-ui/CCFilterButton';
import CustomerService2 from '../screens/CustomerService2';

import {Title} from '../Theme';

const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
const CustomerServiceList = (props: any) => {
  const g = useGlobalStore();
  return (
    <Wrapper>
      <ButtonWrap>
        <CCFilterButton titles={['문의 리스트', '1:1문의']} />
      </ButtonWrap>

      {g.CCFilterIndex == 0 ? (
        data.map((item, key) => (
          <CustomerServiceListItem item={item} key={key} />
        ))
      ) : (
        <CustomerService2 />
      )}
    </Wrapper>
  );
};

export default observer(CustomerServiceList);

const Wrapper = styled.View`
  margin-top: 0;
`;

const ButtonWrap = styled.View`
  flex-direction: row;
  padding: 16px;
  background: #f6f6f6;
`;
