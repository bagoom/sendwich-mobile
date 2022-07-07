import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import {Title} from '../Theme';

import DetailHeaderSwiper from '../components/DetailHeaderSwiper';
import TagList from '../components/TagList';
import CouponListItem from '../components/CouponListItem';
import DetailMenuList from '../components/DetailMenuList';

const StoreDetail = () => {
  const g = useGlobalStore();
  return (
    <ScrollView>
      <DetailHeaderSwiper />

      <Container ph0={false}>
        <TagList />
        <Title style={{marginTop: 28, marginBottom: 16}}>
          모임비 지원 매장
        </Title>
        <CouponListItem />
      </Container>

      <Container2 ph0={true}>
        <DetailMenuList titleVisible={true} />
      </Container2>
    </ScrollView>
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
