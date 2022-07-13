import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';

import {useNavigation} from '@react-navigation/native';

import DetailHeaderSwiper from '../components/DetailHeaderSwiper';
import TagList from '../components/TagList';
import CouponListItem from '../components/CouponListItem';
import DetailMenuList from '../components/DetailMenuList';

import axios from 'axios';
import {useQuery} from 'react-query';
import {BASE_URL} from '@env';
import Loader from '../components/Loader';
const StoreDetail = ({route}: any) => {
  // console.log(route);

  const g = useGlobalStore();
  const navigation = useNavigation<any>();

  const {isLoading, error, data} = useQuery('fetch-detail', () =>
    axios(`${BASE_URL}/api/stores/with-coupon/${route.params}?populate=*`),
  );
  const detailData = data?.data.data;
  useEffect(() => {
    if (!isLoading) {
      navigation.setOptions({headerTitle: detailData?.shop_name});
    }
  }, [detailData]);

  console.log(isLoading, 'isLoading');
  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && (
        <ScrollView>
          <DetailHeaderSwiper data={detailData} isLoading={isLoading} />

          <Container ph0={false}>
            <TagList data={detailData?.theme_item} />
            <CouponListItem coupon={detailData?.coupon} />
          </Container>

          <Container2 ph0={true}>
            <DetailMenuList titleVisible={true} />
          </Container2>
        </ScrollView>
      )}
    </>
  );
};

export default observer(StoreDetail);

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const Container = styled.View<{ph0?: boolean}>`
  padding: 0 16px;
`;
const Container2 = styled.View<{ph0?: boolean}>``;
