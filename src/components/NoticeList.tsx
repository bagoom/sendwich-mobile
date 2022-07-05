import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import NoticeListItem from '../components/NoticeListItem';

import {Title} from '../Theme';

const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
const NoticeList = (props: any) => {
  const g = useGlobalStore();
  return (
    <Wrapper>
      {data.map((item, key) => (
        <NoticeListItem item={item} key={key} />
      ))}
    </Wrapper>
  );
};

export default observer(NoticeList);

const Wrapper = styled.View`
  margin-top: 0;
`;
