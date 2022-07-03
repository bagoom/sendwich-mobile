import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';

const DetailMenuItem = (props: any) => {
  const {navigation, item, index} = props;
  const g = useGlobalStore();
  const firstItem = index == 0;
  return (
    <MenuItem withBorderTop={firstItem}>
      <Name>1인세트 A</Name>
      <Description>
        가락떡볶이 + 수제생크림와플 + (500ml캔 아메리카노) 심플 시그니처 모카
        블랜디드
      </Description>
    </MenuItem>
  );
};

export default observer(DetailMenuItem);

const MenuItem = styled.View<{withBorderTop?: boolean}>`
  padding: 22px 16px;
  border-bottom-width: 1px;
  border-top-width: ${props => (props.withBorderTop ? '1px' : '0')};
  border-color: #eee;
`;

const Name = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  letter-spacing: -0.3px;
`;
const Description = styled.Text`
  margin-top: 5px;
  font-size: 14px;
  line-height: 19px;
  color: #7e745c;
`;
