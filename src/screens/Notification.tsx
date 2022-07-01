import React, {ReactChild, useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, FlatList, ScrollView, Dimensions} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import NotificationItem from '../components/NotificationItem';

const dummy = [
  {
    id: 1,
    date: '2021.12.07',
    title: '가장 좋은 모임 장소를 보내드리는 센드위치입니다.',
    description: '쥬쥬가 좋아 쥬쥬가 좋아 우리 쥬쥬가 좋아',
  },
  {
    id: 2,
    date: '2021.12.07',
    title: '가장 좋은 모임 장소를 보내드리는 센드위치입니다.',
    description: '쥬쥬가 좋아 쥬쥬가 좋아 우리 쥬쥬가 좋아',
  },
  {
    id: 3,
    date: '2021.12.07',
    title: '가장 좋은 모임 장소를 보내드리는 센드위치입니다.',
    description: '쥬쥬가 좋아 쥬쥬가 좋아 우리 쥬쥬가 좋아',
  },
  {
    id: 4,
    date: '2021.12.07',
    title: '가장 좋은 모임 장소를 보내드리는 센드위치입니다.',
    description: '쥬쥬가 좋아 쥬쥬가 좋아 우리 쥬쥬가 좋아',
  },
];
const Notification = (props: any) => {
  const g = useGlobalStore();

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <Container>
          {dummy.map((item, key) => (
            <NotificationItem item={item} key={key} />
          ))}
        </Container>
      </ScrollView>
    </>
  );
};

export default observer(Notification);

const Container = styled.View``;
