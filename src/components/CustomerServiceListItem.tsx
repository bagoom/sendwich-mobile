import React, {useRef} from 'react';
import {observer} from 'mobx-react';
import {View, Animated, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import moment from 'moment';
import styled from 'styled-components/native';
import Icon from '../../Icon-font.js';
import theme from '../Theme';
import {Transition, Transitioning} from 'react-native-reanimated';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const CustomerServiceListItem = (props: any) => {
  const {item, currentNumber, index, isShow, setCurrentIndex}: any = props;
  const g = useGlobalStore();
  const onMoreButtonClick = (index: any, isShow: any) => {
    console.log(index, isShow);
    if (isShow) {
      setCurrentIndex(-1);
    } else {
      setCurrentIndex(index);
    }
  };
  return (
    <View>
      <ListItem
        style={{borderTopWidth: index === 0 ? 1 : 0}}
        isShow={isShow}
        activeOpacity={1}
        onPress={() => {
          onMoreButtonClick(index, isShow);
        }}>
        <View>
          <Subject>{item.title}</Subject>
          <Date>{moment(item.createdAt).format('yy.MM.DD')}</Date>
        </View>
        <View style={{transform: [{rotate: isShow ? '90deg' : '-90deg'}]}}>
          <Icon
            name="arrow-left"
            style={{
              fontSize: 14,
              color: '#aaa',
            }}
          />
        </View>
      </ListItem>
      {isShow && (
        <Content>
          <ContentText>{item.content}</ContentText>
          {item.pending && (
            <>
              <BadgeBox>
                <Badge>
                  <BadgeText>답변</BadgeText>
                </Badge>
              </BadgeBox>
              <ReplyContent>{item.reply_content}</ReplyContent>
            </>
          )}
        </Content>
      )}
    </View>
  );
};

export default React.memo(CustomerServiceListItem);

const ListItem = styled.TouchableOpacity<{isShow?: boolean}>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom-width: 1px;
  border-color: #eee;
  background: ${props => (props.isShow ? '#f4f4f4' : '#fff')};
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

const BadgeBox = styled.View`
  flex-wrap: wrap;
  align-items: flex-start;
  flex-direction: row;
`;
const Badge = styled.View`
  margin: 15px 0;
  padding: 5px 13px;
  border: 1px solid #d9d9d9;
`;
const BadgeText = styled.Text`
  font-size: 12px;
  color: #666;
`;

const ContentText = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #999;
`;
const ReplyContent = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #222;
`;
