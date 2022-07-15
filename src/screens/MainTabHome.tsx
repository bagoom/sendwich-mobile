import React from 'react';
import {observer} from 'mobx-react';
import {ScrollView} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import HomeHeaderSwiper from '../components/HomeHeaderSwiper';
import HomeSubSwiper from '../components/HomeSubSwiper';
import HomeIcons from '../components/HomeIcons';
import HomeStoreSwiper from '../components/HomeStoreSwiper';
import StoreList from '../components/StoreList';
import Footer from '../components/Footer';

import {Space} from '../Theme';

const MainTabA1Screen = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();
  return (
    <ScrollView style={{flex: 1}}>
      <HomeHeaderSwiper navigation={navigation} />
      <Container>
        <HomeSubSwiper />
        <HomeIcons navigation={navigation} />
      </Container>
      <HomeStoreSwiper />
      <Space />
      <ContainerType2>
        <StoreList titleVisible={true} start={0} />
      </ContainerType2>
      <Space />

      <Footer />
    </ScrollView>
  );
};

export default observer(MainTabA1Screen);

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;
const ContainerType2 = styled.View`
  flex: 1;
  padding: 0 16px;
`;
