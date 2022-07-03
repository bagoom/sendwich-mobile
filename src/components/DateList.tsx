import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import DateListItem from '../components/DateListItem';

const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];
const DateList = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();
  return (
    <Wrapper>
      {data.map((item, key) => (
        <DateListItem item={item} key={key} />
      ))}
    </Wrapper>
  );
};

export default observer(DateList);

const Wrapper = styled.View`
  margin-top: 16px;
`;
