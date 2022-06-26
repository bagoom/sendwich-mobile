import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import {InputLabel} from '../Theme';
import styled from 'styled-components/native';

const InputRowBasic = (props: any) => {
  const {label, placeholder, widthButton, value} = props;
  const g = useGlobalStore();
  return (
    <InputRow>
      <InputLabel type="text">{label}</InputLabel>
      <InputBox>
        {!widthButton && (
          <InputText
            placeholder={placeholder}
            defaultValue={value ? value : null}
            onChangeText={text => g.onChangeNameInput(text)}
          />
        )}
        {widthButton === 'sendSms' && (
          <>
            <InputText
              placeholder={placeholder}
              widthButton={widthButton}
              keyboardType="numeric"
              editable={!g.authenticationed}
              onChangeText={text => g.onChangePhoneNumberInput(text)}
            />
            {!g.activeNextStack && (
              <AuthButton onPress={g.AuthenticatePhoneNumber}>
                <Text style={{color: '#fff', fontWeight: '500'}}>인증</Text>
              </AuthButton>
            )}
          </>
        )}
        {widthButton === 'confirmCode' && (
          <>
            <InputText
              placeholder={placeholder}
              widthButton={widthButton}
              keyboardType="numeric"
              onChangeText={text => g.onChangeVerifyCodeInput(text)}
            />
            <AuthButton
              onPress={g.confirmVerifyCode}
              style={{backgroundColor: '#FFBD2E'}}>
              <Text style={{color: '#fff', fontWeight: '500'}}>확인</Text>
            </AuthButton>
          </>
        )}
      </InputBox>
    </InputRow>
  );
};

export default observer(InputRowBasic);

const InputRow = styled.View`
  width: 100%;
  flex-direction: row;
  //   background: blue;
  border-bottom-width: 1px;
  border-color: #eee;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  //   background: red;
`;

const InputText = styled.TextInput<{widthButton?: boolean}>`
  flex: 1;
  height: 52px;
  //   background: blue;
`;

const AuthButton = styled.TouchableOpacity`
  width: 70px;
  height: 26px;
  background: #222;
  border-radius: 5px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
`;
