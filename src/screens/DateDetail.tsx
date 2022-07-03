import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import HomeStoreSwiper from '../components/HomeStoreSwiper';
import {Title} from '../Theme';

const width = wp('100%');

const DateDetail = () => {
  const g = useGlobalStore();
  return (
    <ScrollView>
      <Container2>
        <SliderImg source={require('../assets/images/main_banner.jpeg')} />
      </Container2>

      <Container2 style={{marginTop: 16}}>
        <HomeStoreSwiper />
      </Container2>
    </ScrollView>
  );
};

export default observer(DateDetail);

const ScrollView = styled.ScrollView`
  flex: 1;
`;
const SliderImg = styled.Image`
  width: ${width};
  height: ${width};
`;
const Container = styled.View<{ph0?: boolean}>`
  padding: 16px;
`;
const Container2 = styled.View<{ph0?: boolean}>``;
