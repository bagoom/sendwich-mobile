import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import FilterButton from './base-ui/FilterButton';

const HeaderFilter = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();

  return (
    <Wrapper>
      <FilterButton titles={['인기순', '거리순', '할인률순']} />
    </Wrapper>
  );
};

export default observer(HeaderFilter);

const Wrapper = styled.View`
  margin-top: 16px;
  flex-direction: row;
`;
