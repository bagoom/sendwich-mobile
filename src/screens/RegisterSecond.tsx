import React, {useContext} from 'react';
import {useGlobalStore} from '../store/util';
import {observer} from 'mobx-react';
import styled from 'styled-components/native';
import {RegisterContainer} from '../Theme';
import InputRowGender from '../components/InputRow-gender';
import InputRowBasic from '../components/InputRow-basic';

const RegisterSecond = (props: any) => {
  return <RegisterContainer></RegisterContainer>;
};

export default observer(RegisterSecond);

const Wrapper = styled.View`
  flex: 1;
  padding: 30px 16px;
`;
const Header = styled.View`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom-width: 2;
  border-color: #000;
`;
const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.1px;
`;
const Content = styled.View`
  margin-bottom: 20px;
  padding-bottom: 20px;
`;
const FixedBtnContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
`;

const FixedBtn = styled.TouchableOpacity<{activeNextStack?: boolean}>`
  width: 100%;
  height: 100%;
  background: ${props => (props.activeNextStack ? '#FFBD2E' : '#ccc')};
  justify-content: center;
  align-items: center;
`;
const FixedBtnText = styled.Text<{activeNextStack?: boolean}>`
  color: ${props => (props.activeNextStack ? '#000' : '#fff')};
  font-size: 14px;
  font-weight: 500;
`;
