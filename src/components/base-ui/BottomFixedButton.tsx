import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {useGlobalStore} from '../../store/util';

import theme from '../../Theme';
import styled from 'styled-components/native';

const BottomFixedButton = (props: any) => {
  const {onPress, activeState} = props;
  const g = useGlobalStore();

  return (
    <>
      <FixedBtnContainer>
        <FixedBtn
          activeOpacity={1}
          activation={activeState}
          onPress={onPress}
          disabled={!activeState}>
          <FixedBtnText>확인</FixedBtnText>
        </FixedBtn>
      </FixedBtnContainer>
    </>
  );
};

export default observer(BottomFixedButton);

const FixedBtnContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
`;

const FixedBtn = styled.TouchableOpacity<{activation?: boolean}>`
  width: 100%;
  height: 100%;
  background: ${props => (props.activation ? theme.color.point : '#ccc')};
  justify-content: center;
  align-items: center;
`;
const FixedBtnText = styled.Text<{activation?: boolean}>`
  color: ${props => (props.activation ? '#000' : '#fff')};
  font-size: 14px;
  font-weight: 500;
`;
