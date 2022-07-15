import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, Animated, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import moment from 'moment';
import styled from 'styled-components/native';
import Icon from '../../Icon-font.js';
import theme from '../Theme';

const NoticeListItem = (props: any) => {
  const {item}: any = props;
  const g = useGlobalStore();
  const [open, setOpen] = useState(false);

  return (
    <View>
      <ListItem
        open={open}
        activeOpacity={1}
        onPress={() => setOpen(prev => !prev)}>
        <View>
          <Subject>{item.title}</Subject>
          <Date>{moment(item.createdAt).format('yy.MM.DD')}</Date>
        </View>
        <View style={{transform: [{rotate: open ? '90deg' : '-90deg'}]}}>
          <Icon
            name="arrow-left"
            style={{
              fontSize: 14,
              color: '#aaa',
            }}
          />
        </View>
      </ListItem>
      {open && (
        <Content>
          <ContentText>{item.content}</ContentText>
        </Content>
      )}
    </View>
  );
};

export default observer(NoticeListItem);

const ListItem = styled.TouchableOpacity<{open?: boolean}>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom-width: 1px;
  border-color: #eee;
  background: ${props => (props.open ? '#f4f4f4' : '#fff')};
`;

const Subject = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  letter-spacing: -0.3px;
`;
const Date = styled.Text`
  font-size: 12px;
  line-height: 22px;
  color: #bbb;
`;
const Content = styled.View`
  padding: 16px;
  background: #f9f9f9;
  border-bottom-width: 1px;
  border-color: #eee;
`;

const ContentText = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #999;
`;
