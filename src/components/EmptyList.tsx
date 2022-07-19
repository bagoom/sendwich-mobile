import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import Icon from '../../Icon-font.js';

let titleVisible = false;
const EmptyList = (props: any) => {
  const {navigation, text1, text2} = props;
  titleVisible = props.titleVisible;
  const g = useGlobalStore();
  return (
    <>
      <List>
        <Icon
          name="info"
          style={{fontSize: 42, color: '#999', marginBottom: 13}}
        />
        <Text1>{text1} </Text1>
        <Text1>{text2}</Text1>
      </List>
    </>
  );
};

export default observer(EmptyList);
const List = styled.View`
  padding: 50px 20px;
  justify-content: center;
  align-items: center;
`;
const Text1 = styled.Text`
  margin-bottom: 3px;
  font-size: 14px;
  color: #999;
`;
