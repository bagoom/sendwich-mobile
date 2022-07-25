import React, {ReactChild, useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, FlatList, Text, ScrollView, Dimensions} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import EventItem from '../components/EventItem';

import axios from 'axios';
import {useQuery} from 'react-query';
import {BASE_URL} from '@env';
import moment from 'moment';

const MainAllBanner = (props: any) => {
  const g = useGlobalStore();

  const fetchBannerList = () => {
    return axios.get(
      `${BASE_URL}/api/banners?populate=*&filters[position][$eq][0]=이벤트배너&filters[end_date][$gte][1]=${moment(
        new Date(),
      ).format('yy-MM-DD')}`,
    );
  };

  const {isLoading, isError, data, error} = useQuery(
    'main-event-banner',
    fetchBannerList,
  );
  const banner = data?.data.data;
  console.log(banner);
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#f9f9f9'}}>
      <Wrapper>
        {banner?.map((item: any, index: number) => (
          <EventItem data={item} key={index} index={index} />
        ))}
      </Wrapper>
    </ScrollView>
  );
};

export default observer(MainAllBanner);

const Wrapper = styled.View`
  flex: 1;
  padding: 16px 16px;
`;
