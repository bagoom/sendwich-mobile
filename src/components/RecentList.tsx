import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import RecentListItem from '../components/RecentListItem';
import {Title} from '../Theme';

const RecentList = (props: any) => {
  const g = useGlobalStore();
  const recentSotre = g.recent_store;
  return (
    <Wrapper>
      {recentSotre?.map((item: any, key: any) => (
        <RecentListItem item={item} key={key} />
      ))}
    </Wrapper>
  );
};

export default observer(RecentList);

const Wrapper = styled.View`
  margin-top: 10px;
`;
