import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, Text} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import theme from '../Theme';
//@ts-ignore
import {BubblesLoader} from 'react-native-indicator';

const Loader = (props: any) => {
  const {navigation, item} = props;
  const g = useGlobalStore();

  return (
    <IndicatorWrap>
      <BubblesLoader size={28} dotRadius={6} color={theme.color.point} />
    </IndicatorWrap>
  );
};

export default observer(Loader);

const IndicatorWrap = styled.View`
  flex: 1;
  min-height: 300px;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
`;
