import React, {ReactChild, useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, FlatList, ScrollView, Dimensions} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import NotificationItem from '../components/NotificationItem';

import axios from 'axios';
import {useQuery} from 'react-query';
import {BASE_URL} from '@env';
const Notification = (props: any) => {
  const g = useGlobalStore();

  const fetchNotiList = () => {
    return axios.get(
      `${BASE_URL}/api/notifications/find-noti?user_id=${g.sendwichProfile.id}`,
    );
  };

  const {isLoading, isError, data, error} = useQuery(
    'fetch-notification-list',
    fetchNotiList,
  );
  const noti = data?.data;

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <Container>
          {noti?.map((item: any, key: any) => (
            <NotificationItem item={item} key={key} />
          ))}
        </Container>
      </ScrollView>
    </>
  );
};

export default observer(Notification);

const Container = styled.View``;
