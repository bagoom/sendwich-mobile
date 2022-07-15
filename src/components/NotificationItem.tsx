import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import Icon from '../../Icon-font.js';
import styled from 'styled-components/native';

const NotificationItem = (props: any) => {
  const {navigation, item} = props;
  const g = useGlobalStore();

  return (
    <ListItem>
      <Date>{item.date}</Date>
      <Title>{item.title}</Title>
      <Desc>{item.description}</Desc>

      <ExpandButton>
        <Icon name="arrow-down" style={{fontSize: 16, color: '#bbb'}} />
      </ExpandButton>
    </ListItem>
  );
};

export default observer(NotificationItem);

const ListItem = styled.View<{type?: number}>`
  width: 100%;
  padding: 20px 16px;
  padding-right: 26px;
  border-bottom-width: 1px;
  border-color: #f0f0f0;
`;

const Date = styled.Text`
  font-size: 12px;
  letter-spacing: -0.8px;
  color: #bbb;
`;
const Title = styled.Text`
  margin-top: 3px;
  font-size: 15px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.8px;
  color: #000;
`;
const Desc = styled.Text`
  margin-top: 6px;
  font-size: 14px;
  color: #999;
  line-height: 20px;
`;
const ExpandButton = styled.TouchableOpacity`
  position: absolute;
  top: 34px;
  right: 0;
  padding: 5px;
`;
