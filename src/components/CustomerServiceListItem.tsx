import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import Icon from '../../Icon-font.js';

const CustomerServiceListItem = (props: any) => {
  const {navigation, item} = props;
  const g = useGlobalStore();

  return (
    <ListItem>
      <View>
        <Subject>공지사항 제목입니다.</Subject>
        <Date>2021.12.07</Date>
      </View>

      <View style={{transform: [{rotate: '-90deg'}]}}>
        <Icon
          name="arrow-left"
          style={{
            fontSize: 14,
            color: '#aaa',
          }}
        />
      </View>
    </ListItem>
  );
};

export default observer(CustomerServiceListItem);

const ListItem = styled.TouchableOpacity<{type?: number}>`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

const Subject = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #000;
  letter-spacing: -0.3px;
`;
const Date = styled.Text`
  font-size: 12px;
  line-height: 22px;
  color: #bbb;
`;
