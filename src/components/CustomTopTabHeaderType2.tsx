import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import HomeHeaderTitle from './HomeHeaderTitle';
import {useNavigation} from '@react-navigation/native';

const CustomTopTabHeaderType2 = (props: any) => {
  const {} = props;
  const g = useGlobalStore();
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView>
      <HeaderWrap>
        <HomeHeaderTitle navigation={navigation} />
      </HeaderWrap>
    </SafeAreaView>
  );
};

export default observer(CustomTopTabHeaderType2);

const HeaderWrap = styled.View`
  padding: 18px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom-width: 1px;
  border-color: #f5f5f5;
`;
