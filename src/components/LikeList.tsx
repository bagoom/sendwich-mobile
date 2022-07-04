import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import LikeListItem from '../components/LikeListItem';

import {Title} from '../Theme';

const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
const LikeList = (props: any) => {
  const g = useGlobalStore();
  return (
    <Wrapper>
      {data.map((item, key) => (
        <LikeListItem item={item} key={key} />
      ))}
    </Wrapper>
  );
};

export default observer(LikeList);

const Wrapper = styled.View`
  margin-top: 10px;
`;
