import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import Loader from '../components/Loader';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from '../../Icon-font.js';
import {BASE_URL} from '@env';

const width = wp('100%');
const ImageWidth = wp('100%') / 5 - 15;

const DetailHeaderSwiper = (props: any) => {
  const {navigation, data, isLoading} = props;
  const g = useGlobalStore();
  const [bigImg, setBigImg] = useState<any>('');

  const gif_img = data?.gif_image ? data?.gif_image : [];
  const main_img = data?.main_image ? data?.main_image : [];

  useEffect(() => {
    if (data.gif_image) {
      setBigImg(data.gif_image[0]?.url);
    } else {
      setBigImg('/uploads/4_f5b6feca83.jpg');
    }
    return () => {
      setBigImg('');
      console.log('언마운트');
    };
  }, [data]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <ImageWrapper>
          <LikeButton activeOpacity={0.7}>
            <Icon name="heart-fill" style={{fontSize: 20, color: '#fff'}} />
          </LikeButton>
          <CoverImg source={{uri: `${BASE_URL}${bigImg}`}} />

          <ImageRow>
            {gif_img[0] && (
              <ImgView
                activeOpacity={1}
                onPress={() => setBigImg(gif_img[0]?.url)}>
                <Img source={{uri: `${BASE_URL}${gif_img[0]?.url}`}} />
              </ImgView>
            )}
            {gif_img[1] && (
              <ImgView
                activeOpacity={1}
                onPress={() => setBigImg(gif_img[1]?.url)}>
                <Img source={{uri: `${BASE_URL}${gif_img[1]?.url}`}} />
              </ImgView>
            )}
            {main_img[0] && (
              <ImgView
                activeOpacity={1}
                onPress={() => setBigImg(main_img[0]?.url)}>
                <Img source={{uri: `${BASE_URL}${main_img[0]?.url}`}} />
              </ImgView>
            )}
            {main_img[1] && (
              <ImgView
                activeOpacity={1}
                onPress={() => setBigImg(main_img[1]?.url)}>
                <Img source={{uri: `${BASE_URL}${main_img[1]?.url}`}} />
              </ImgView>
            )}
            {main_img[2] && (
              <ImgView
                activeOpacity={1}
                onPress={() => setBigImg(main_img[2]?.url)}>
                <Img
                  source={{uri: `${BASE_URL}${main_img[2]?.url}`}}
                  style={{marginRight: 0}}
                />
              </ImgView>
            )}
          </ImageRow>
        </ImageWrapper>
      )}
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
  overflow: hidden;
`;
const ImgView = styled.TouchableOpacity`
  width: ${ImageWidth}px;
  height: ${ImageWidth}px;
  margin-right: 10px;
  border-radius: 4px;
  overflow: hidden;
`;

const LikeButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 15px;
  z-index: 1;
`;
