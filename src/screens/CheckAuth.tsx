import React, {useEffect} from 'react';
import {useGlobalStore} from '../store/util';
import {observer} from 'mobx-react';
import styled from 'styled-components/native';
import {View, Text} from 'react-native';
//@ts-ignore
import {BubblesLoader} from 'react-native-indicator';
import {BASE_URL} from '@env';

const CheckAuthScreen = () => {
  const g = useGlobalStore();

  useEffect(() => {
    g.setupAuth();
    g.getHomeIcons();
  }, []);

  return (
    //@ts-ignore
    <Wrapper source={require('../assets/images/splash_screen.jpg')}>
      <Logo
        source={require('../assets/images/splash_logo.png')}
        resizeMode="contain"
      />
      {!g.authChecked && (
        <IndicatorWrap>
          <BubblesLoader size={22} dotRadius={4} color="#fff" />
        </IndicatorWrap>
      )}
    </Wrapper>
  );
};

export default observer(CheckAuthScreen);

const Wrapper = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.Image`
  width: 150px;
`;
const IndicatorWrap = styled.View`
  position: absolute;
  bottom: 100px;
`;
