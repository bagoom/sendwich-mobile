import React, {useContext} from 'react';
import {
  ImageBackground,
  Image,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {useGlobalStore} from '../store/util';
import {observer} from 'mobx-react';
import {ThemeContext} from 'styled-components';
import {useQuery} from 'react-query';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const pt = hp('10%');
const ph = wp('10%');
const ScreenHeader = styled.View`
  width: 100%;
  padding: 20px 0;
  justify-content: center;
  align-items: center;
`;
const Continer = styled.View`
  flex: 1;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 0;
`;
const Slide = styled.View`
  // margin-right: 10px;
`;
const SlideText = styled.Text`
  margin-top: 20px;
  font-size: 17px;
  color: #fff;
  text-align: center;
  flex-shrink: 1;
`;

const width = wp('10%');
const height = hp('40%');
const SliderImg = styled.Image`
  width: 100%;
  height: ${height}px;
  flex-shrink: 1;
`;

const Images = [
  {
    uri: 'https://source.unsplash.com/random/?food',
    text: '메뉴가 생각나지 않을때는\n 오늘 뭐 먹지 배너를 이용해보세요.',
  },
  {
    uri: 'https://source.unsplash.com/random/?food',
    text: '메뉴가 생각나지 않을때는\n 오늘 뭐 먹지 배너를 이용해보세요.',
  },
  {
    uri: 'https://source.unsplash.com/random/?food',
    text: '메뉴가 생각나지 않을때는\n 오늘 뭐 먹지 배너를 이용해보세요.',
  },
];

const LoginScreen = () => {
  const g = useGlobalStore();
  const theme = useContext(ThemeContext);
  const win = Dimensions.get('window');
  const ratio = win.width / 200;
  return (
    <ImageBackground
      source={require('../assets/images/splash.jpg')}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <ScreenHeader>
          <Image
            source={require('../assets/images/logo.png')}
            style={{width: 120, height: 28}}
          />
        </ScreenHeader>

        <Swiper
          containerStyle={{flex: 1.7, marginHorizontal: ph}}
          height={100}
          showsButtons={false}
          loop={false}
          paginationStyle={{bottom: 0}}
          dotColor="#fff"
          activeDotColor="#FFBD2E">
          {Images.map((img, key) => (
            <Slide key={key}>
              <SliderImg source={{uri: img.uri}} />
              <SlideText>{img.text}</SlideText>
            </Slide>
          ))}
        </Swiper>
        <Continer>
          <TouchableOpacity
            onPress={g.signInWithKakao}
            style={{width: '100%', marginTop: 20}}>
            <Image
              source={require('../assets/images/kakao_login.png')}
              style={{width: '100%', height: 24 * ratio}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Continer>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default observer(LoginScreen);
