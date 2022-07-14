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
const StoreDetail = ({route, navigation}: any) => {
  const g = useGlobalStore();

  const cartCountFetch = useQuery('fetch-cart-count', () =>
    axios(`${BASE_URL}/api/cart/with-store?user_id=${g.sendwichProfile.id}`),
  );
  const cartCount = cartCountFetch.data?.data;
  const {isLoading, error, data} = useQuery('fetch-detail', () =>
    axios(`${BASE_URL}/api/stores/with-coupon/${route.params}?populate=*`),
  );
  const detailData = data?.data.data;
  useEffect(() => {
    if (!isLoading) {
      navigation.setOptions({headerTitle: detailData?.shop_name});
    }
    cartCountFetch.refetch();
    console.log('ddd');
  }, [detailData]);

  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && (
        <View style={{flex: 1}}>
          <ScrollView>
            <DetailHeaderSwiper
              data={detailData}
              isLoading={isLoading}
              navigation={navigation}
              id={route.params}
            />

            <Container ph0={false}>
              <TagList data={detailData?.theme_item} />
              <CouponListItem coupon={detailData?.coupon} />
            </Container>

            <Container2 ph0={true}>
              {detailData.menu_list[0].category ? (
                <DetailMenuList
                  titleVisible={true}
                  data={detailData.menu_list}
                  shop_id={detailData.id}
                />
              ) : (
                <EmptyMenuList>
                  <Text>아직 메뉴가 등록 되지 않은 매장입니다.</Text>
                </EmptyMenuList>
              )}
            </Container2>
          </ScrollView>
          <CartBtn activeOpacity={1}>
            <Badge>
              <BadgeText>{cartCount?.count}</BadgeText>
            </Badge>
            <Img
              source={require('../assets/images/cart.png')}
              resizeMode="cover"
            />
          </CartBtn>
        </View>
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

const EmptyMenuList = styled.View<{ph0?: boolean}>`
  padding: 40px 16px;
  justify-self: center;
  align-items: center;
`;
const CartBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 42px;
  height: 42px;
`;
const Img = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 20px;
`;
const Badge = styled.View`
  position: absolute;
  right: -5px;
  bottom: 30px;
  background: #ee5e52;
  z-index: 1;
  width: 22px;
  height: 22px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;
const BadgeText = styled.Text`
  top: -1px;
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  z-index: 2;
  letter-spacing: -0.3px;
`;
