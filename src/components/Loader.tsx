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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
