import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {useGlobalStore} from '../store/util';
import Icon from '../../Icon-font.js';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
const width = wp('100%');
const SliderImg = styled.Image`
  width: ${width};
  height: ${width};
`;

const signInWithKakao = async (): Promise<void> => {
  const token: KakaoOAuthToken = await login();
  getProfile();
  console.log(JSON.stringify(token));
};

const signOutWithKakao = async (): Promise<void> => {
  const message = await logout();

  console.log(message);
};

const getProfile = async (): Promise<void> => {
  const profile: KakaoProfile = await getKakaoProfile();
  // console.log(JSON.stringify(profile));
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const HomeSwiper = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();

  return (
    <>
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <View style={styles.slide1}>
          <SliderImg
            source={{
              uri: 'https://source.unsplash.com/random/?food',
            }}
          />
        </View>
        <View style={styles.slide2}>
          <SliderImg
            source={{
              uri: 'https://source.unsplash.com/random/?food',
            }}
          />
        </View>
        <View style={styles.slide3}>
          <SliderImg
            source={{
              uri: 'https://source.unsplash.com/random/?food',
            }}
          />
        </View>
      </Swiper>

      <Button title="카카오로 계속하기2" onPress={signInWithKakao} />
      <Button title="카카오로 계속하기" onPress={signInWithKakao} />
    </>
  );
};

export default observer(HomeSwiper);
