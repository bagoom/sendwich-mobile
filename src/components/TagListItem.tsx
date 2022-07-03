import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';

const TagListItem = (props: any) => {
  const {navigation, item} = props;
  const g = useGlobalStore();

  return (
    <TagItem>
      <Text>브라운도트</Text>
    </TagItem>
  );
};

export default observer(TagListItem);

const TagItem = styled.TouchableOpacity<{type?: number}>`
  margin-right: 5px;
  margin-bottom: 8px;
  padding: 7px 14px;
  background: #f5f5f5;
  border-radius: 24px;
`;

const Text = styled.Text`
  font-size: 12px;
  color: #999;
`;
