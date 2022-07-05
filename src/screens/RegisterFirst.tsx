import React, {useContext} from 'react';
import {useGlobalStore} from '../store/util';
import {observer} from 'mobx-react';
import styled from 'styled-components/native';
import {RegisterContainer} from '../Theme';
import InputRowGender from '../components/InputRow-gender';
import InputRowBasic from '../components/InputRow-basic';

const RegisterFirst = (props: any) => {
  const g = useGlobalStore();
  const {navigation} = props;
  return (
    <RegisterContainer>
      <Wrapper>
        <Header>
          <HeaderTitle>회원 가입이{'\n'}거의 끝나갑니다.</HeaderTitle>
        </Header>

        <InputRowGender label={'성별'} />
        <InputRowBasic
          label={'이름'}
          placeholder="이름을 입력 해주세요."
          value={g.kakaoData.nickname}
        />
        <InputRowBasic
          label={'전화번호'}
          placeholder="전화번호를 입력 해주세요."
          widthButton="sendSms"
        />
        {g.showPhoneAuthNumberInput && (
          <InputRowBasic
            label={'인증번호'}
            placeholder="인증번호를 입력 해주세요."
            widthButton="confirmCode"
          />
        )}

        <FixedBtnContainer>
          <FixedBtn
            activeNextStack={g.activeNextStack}
            disabled={!g.activeNextStack}
            onPress={() => navigation.navigate('RegisterSecondScreen')}>
            <FixedBtnText activeNextStack={g.activeNextStack}>
              다음
            </FixedBtnText>
          </FixedBtn>
        </FixedBtnContainer>
      </Wrapper>
    </RegisterContainer>
  );
};

export default observer(RegisterFirst);

const Wrapper = styled.View`
  flex: 1;
  padding: 30px 16px;
`;
const Header = styled.View`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom-width: 2px;
  border-color: #000;
`;
const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.1px;
  color: #000;
`;
const FixedBtnContainer = styled.View`
  position: absolute;
  bottom: 0px;
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
