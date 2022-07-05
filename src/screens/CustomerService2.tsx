import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, Linking} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import theme, {Space} from '../Theme';

import Icon from '../../Icon-font.js';

const CustomerService = () => {
  const g = useGlobalStore();
  return (
    <>
      <Container>
        <Title>긴급 전화문의</Title>
        <Desc>
          <Text>
            이용권 환불 및 매장에서 서비스 불가할 경우에만 긴급으로 전화문의가
            가능합니다.
          </Text>
        </Desc>
        <Desc style={{marginTop: 5}}>
          <Text style={{color: '#aaa', fontSize: 13}}>
            평일 : 오전 9시~오후 6시(점심 : 오후 12시~오후 1시)
          </Text>
        </Desc>

        <Contact>
          <Icon name="call" style={{fontSize: 14, color: '#000'}} />
          <Tel>1599-4923</Tel>
          <Button
            onPress={() => {
              Linking.openURL('tel:1599-4923');
            }}>
            <ButtonText>긴급연락</ButtonText>
          </Button>
        </Contact>
      </Container>

      <Space />

      <Container>
        <Title2>
          궁금하신 점이 있으신가요?{'\n'}
          1:1문의에 남겨주시면 답변 드리겠습니다.
        </Title2>

        <Desc style={{marginTop: 5}}>
          문의하신 내용에 대한 답변은 문의 리스트 목록에서{'\n'}
          확인이 가능합니다.
        </Desc>

        <InputWrap>
          <InputText
            placeholder="제목을 입력하세요."
            placeholderTextColor={'#aaa'}
          />
          <TextArea
            placeholder="내용을 입력하세요."
            multiline
            placeholderTextColor={'#aaa'}
            textAlignVertical="top"
          />
        </InputWrap>
        <ConfirmButton>
          <ConfirmButtonText>문의하기</ConfirmButtonText>
        </ConfirmButton>
      </Container>
    </>
  );
};

export default observer(CustomerService);
const Container = styled.View`
  padding: 16px 16px 40px 16px;
`;
const ScrollView = styled.ScrollView``;

const Title = styled.Text`
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 500;
  color: #000;
  letter-spacing: -0.3px;
`;
const Desc = styled.Text`
  font-size: 14px;
  color: #999;
  line-height: 20px;
`;

const Contact = styled.View`
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

const Title2 = styled.Text`
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.3px;
  color: #000;
`;
const InputWrap = styled.View`
  margin-top: 27px;
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
