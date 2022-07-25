import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, Text, FlatList} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import theme, {Title} from '../Theme';
import Icon from '../../Icon-font.js';
import {WebView} from 'react-native-webview';
import axios from 'axios';
import {useQuery} from 'react-query';
import {BASE_URL} from '@env';
import moment from 'moment';

const BannerDetail = ({route}: any) => {
  const g = useGlobalStore();

  console.log(route);
  const fetchBannerData = () => {
    return axios.get(`${BASE_URL}/api/banners/${route.params}?populate=*`);
  };

  const {isLoading, isError, data, error} = useQuery(
    'main-event-banner-detail',
    fetchBannerData,
  );
  const banner = data?.data.data;

  console.log(banner);

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      {!banner?.link && (
        <EmptyList>
          <Icon
            name="info"
            style={{fontSize: 42, color: '#999', marginBottom: 13}}
          />
          <Text1>이벤트 컨텐츠가 없습니다. </Text1>
        </EmptyList>
      )}

      {banner?.link ? <WebView source={{uri: banner.link}} /> : null}
    </>
  );
};

export default observer(BannerDetail);
const Wrpper = styled.View`
  margin-bottom: 30px;
`;
const ScrollView = styled.ScrollView``;

const EmptyList = styled.View`
  padding: 50px 20px;
  justify-content: center;
  align-items: center;
`;
const Text1 = styled.Text`
  margin-bottom: 3px;
  font-size: 14px;
  color: #999;
`;
