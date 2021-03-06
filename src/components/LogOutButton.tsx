import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import AlertModal from '../components/AlertModal';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import theme from '../Theme';
import Icon from '../../Icon-font.js';

const MypageButton = (props: any) => {
  const {title, style} = props;
  const g = useGlobalStore();
  const [visible, showModal] = useState(false);
  const navigation = useNavigation<any>();

  const logoutHandel = () => {
    showModal(true);
  };

  return (
    <>
      <AlertModal
        visible={visible}
        //@ts-ignore
        cancel={() => showModal()}
        confirm={() => g.signOutWithKakao()}
        param={{
          title: '로그아웃 안내',
          message: '로그아웃을 하시겠습니까?',
          cancelText: '취소',
          confirmText: '확인',
        }}
      />
      <ListItem style={{...style}} onPress={logoutHandel}>
        <Title>{title}</Title>

        <Button>
          <Icon
            name="arrow-left"
            style={{
              fontSize: 14,
              color: '#aaa',
            }}
          />
        </Button>
      </ListItem>
    </>
  );
};

export default observer(MypageButton);

const ListItem = styled.TouchableOpacity`
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
const Button = styled.TouchableOpacity`
  transform: rotate(180deg);
`;
const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  font-size: 13px;
  letter-spacing: -0.3px;
`;
