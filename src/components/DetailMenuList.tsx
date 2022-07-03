import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';

import {Title} from '../Theme';
import DetailMenuItem from '../components/DetailMenuItem';

let titleVisible = false;
const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
const DetailMenuList = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();
  return (
    <Wrapper>
      {props.titleVisible && (
        <Container>
          <Title>메뉴</Title>
        </Container>
      )}

      {data.map((item, key) => (
        <DetailMenuItem item={item} key={key} index={key} />
      ))}
    </Wrapper>
  );
};

export default observer(DetailMenuList);

const Wrapper = styled.View`
  margin-top: 40px;
`;
const Container = styled.View`
  padding: 0 16px;
`;
