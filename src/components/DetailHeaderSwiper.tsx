import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from '../../Icon-font.js';

const width = wp('100%');
const ImageWidth = wp('100%') / 5 - 15;

const DetailHeaderSwiper = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();
  return (
    <>
      <ImageWrapper>
        <LikeButton activeOpacity={0.7}>
          <Icon name="heart-fill" style={{fontSize: 20, color: '#fff'}} />
        </LikeButton>
        <CoverImg source={require('../assets/images/1.jpg')} />

        <ImageRow>
          <Img source={require('../assets/images/1.jpg')} />
          <Img source={require('../assets/images/2.jpg')} />
          <Img source={require('../assets/images/3.jpg')} />
          <Img source={require('../assets/images/4.jpg')} />
          <Img
            source={require('../assets/images/5.jpg')}
            style={{marginRight: 0}}
          />
        </ImageRow>
      </ImageWrapper>
    </>
  );
};

export default observer(DetailHeaderSwiper);

const CoverImg = styled.Image`
  width: ${width}px;
  height: ${width}px;
`;
const ImageWrapper = styled.View``;
const ImageRow = styled.View`
  padding: 16px;
  padding-bottom: 22px;
  flex-direction: row;
`;
const Img = styled.Image`
  width: ${ImageWidth}px;
  height: ${ImageWidth}px;
  margin-right: 10px;
  border-radius: 4px;
`;

const LikeButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 15px;
  z-index: 1;
`;
