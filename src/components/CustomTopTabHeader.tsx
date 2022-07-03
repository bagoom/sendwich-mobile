import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import MainDrawer from '../routes/main-drawer';
import HomeHeaderTitle from './HomeHeaderTitle';
import HomeHeaderRight from './HomeHeaderRight';
const CustomTopTabHeader = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();
  const showRender = true;
  return (
    <SafeAreaView>
      <HeaderWrap>
        <MainDrawer />
        <HomeHeaderTitle showRender={showRender} navigation={navigation} />
        <HomeHeaderRight navigation={navigation} />
      </HeaderWrap>
    </SafeAreaView>
  );
};

export default observer(CustomTopTabHeader);

const HeaderWrap = styled.View`
  padding: 18px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom-width: 1px;
  border-color: #f5f5f5;
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
