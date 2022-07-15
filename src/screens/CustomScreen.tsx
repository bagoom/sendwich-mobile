import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import HeaderFilter from '../components/HeaderFilter';
import StoreLargeList from '../components/StoreLargeList';
import StoreList from '../components/StoreList';
import Footer from '../components/Footer';
import {Space} from '../Theme';

const CustomRoute = (props: any) => {
  const g = useGlobalStore();
  return (
    <ScrollView>
      <Wrapper>
        <HeaderFilter />
        <StoreLargeList />
      </Wrapper>
      <Space />

      <Wrapper>
        <StoreList start={3} />
      </Wrapper>
      <Space />
      <Footer />
    </ScrollView>
  );
};

export default observer(CustomRoute);

const ScrollView = styled.ScrollView``;
const Wrapper = styled.ScrollView`
  flex: 1;
  padding: 0 16px;
`;
const Text1 = styled.Text`
  font-size: 12px;
  line-height: 20px;
  color: #999;
`;
const Text2 = styled.Text`
  margin-top: 25px;
  font-size: 12px;
  line-height: 19px;
  color: #bbb;
`;
