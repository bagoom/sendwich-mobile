import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useGlobalStore} from '../store/util';
import theme from '../Theme';
import Icon from '../../Icon-font.js';
import styled from 'styled-components/native';

const SearchInput = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();

  return (
    <Wrapper>
      <Icon
        name="search"
        style={{
          position: 'absolute',
          top: 18,
          left: 16,
          fontSize: 20,
          color: '#aaa',
          zIndex: 1,
        }}
      />
      <Input
        placeholder="지역, 매장명, 메뉴를 입력해주세요"
        placeholderTextColor={'#aaa'}
      />
    </Wrapper>
  );
};

export default observer(SearchInput);

const Wrapper = styled.View`
  margin-bottom: 18px;
`;
const Input = styled.TextInput`
  width: 100%;
  padding: 13px 16px 13px 45px;
  background: #f6f6f6;
  border-radius: 3px;
  color: #000;
  font-size: 16px;
`;
