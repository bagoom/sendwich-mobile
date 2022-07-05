import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, Linking} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import theme, {Space} from '../Theme';
import CheckBox from '../components/base-ui/CheckBox';
import Icon from '../../Icon-font.js';

const Withdrawal = () => {
  const g = useGlobalStore();
  return (
    <Wrapper>
      <Desc>
        정말 탈퇴하시겠습니까?{'\n'}
        탈퇴 사유를 남겨 주시면 서비스개선에 참고하도록 {'\n'}
        노력하겠습니다.
      </Desc>

      <Title> 탈퇴사유</Title>

      <CheckRow>
        <CheckBox
          size={18}
          radius={7}
          color={theme.color.point}
          label="서비스 사용이 불편해서"
        />
      </CheckRow>
      <CheckRow>
        <CheckBox
          size={18}
          radius={7}
          color={theme.color.point}
          label="가맹점이 별로 없어서"
        />
      </CheckRow>
      <CheckRow>
        <CheckBox size={18} radius={7} color={theme.color.point} label="기타" />
      </CheckRow>

      {/* <Contact>
        <Icon name="call" style={{fontSize: 14, color: '#000'}} />
        <Tel>1599-4923</Tel>
        <Button
          onPress={() => {
            Linking.openURL('tel:1599-4923');
          }}>
          <ButtonText>긴급연락</ButtonText>
        </Button>
      </Contact> */}

      <InputWrap>
        <TextArea
          placeholder="내용을 입력하세요."
          multiline
          placeholderTextColor={'#aaa'}
          textAlignVertical="top"
        />
      </InputWrap>
      <ConfirmButton>
        <ConfirmButtonText>탈퇴하기</ConfirmButtonText>
      </ConfirmButton>
    </Wrapper>
  );
};

export default observer(Withdrawal);
const Wrapper = styled.View`
  padding: 25px 16px;
`;

const Title = styled.Text`
  margin-bottom: 0;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  letter-spacing: -0.3px;
`;
const Desc = styled.Text`
  margin-bottom: 25px;
  font-size: 15px;
  color: #000;
  line-height: 20.5px;
`;

const CheckRow = styled.View`
  margin-top: 14px;
  flex-direction: row;
  align-items: center;
`;
const Tel = styled.Text`
  margin-left: 5px;
  margin-right: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  letter-spacing: -0.3px;
`;

const Button = styled.TouchableOpacity`
  padding: 4px 10px 5px 10px;
  background: #000;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  letter-spacing: -0.3px;
`;
const InputWrap = styled.View`
  margin-top: 7px;
`;
const InputText = styled.TextInput`
  padding: 12px 16px;
  border-width: 1px;
  border-color: #e5e5e5;
  font-size: 14px;
  color: #000;
  border-radius: 5px;
`;
const TextArea = styled.TextInput`
  min-height: 200px;
  margin-top: 10px;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px;
  border-width: 1px;
  border-color: #e5e5e5;
  font-size: 14px;
  color: #000;
  border-radius: 5px;
`;
const ConfirmButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  margin-top: 12px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: ${theme.color.point};
`;
const ConfirmButtonText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  letter-spacing: -0.3px;
`;
