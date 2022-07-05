import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, Text} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import theme from '../Theme';
import ToggleSwitch from 'toggle-switch-react-native';

const MypageButton = (props: any) => {
  const {title, route, style} = props;
  const g = useGlobalStore();
  const navigation = useNavigation<any>();
  console.log(g.alertStatus);

  return (
    <ListItem style={{...style}}>
      <Title>{title}</Title>

      <Button>
        <ToggleSwitch
          isOn={g.alertStatus}
          onColor={theme.color.point}
          offColor="#ddd"
          labelStyle={{color: 'black', fontWeight: '900'}}
          size="medium"
          //@ts-ignore
          onToggle={isOn => g.toggleAlertStatus(isOn)}
        />
      </Button>
    </ListItem>
  );
};

export default observer(MypageButton);

const ListItem = styled.View`
  flex-direction: row;
  padding: 20px 16px;
  border-bottom-width: 1px;
  border-color: #eee;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  color: #666;
  font-size: 15px;
  letter-spacing: -0.3px;
`;
const Price = styled.Text`
  color: #000;
  font-size: 19px;
  font-weight: bold;
  letter-spacing: -1px;
`;
const Date = styled.Text`
  margin-top: 10px;
  color: #999;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: -0.5px;
`;
const Button = styled.View``;
const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  font-size: 13px;
  letter-spacing: -0.3px;
`;
