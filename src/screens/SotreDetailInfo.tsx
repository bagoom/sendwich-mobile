import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import theme, {Title} from '../Theme';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

const MyMap = () => {
  const P0 = {latitude: 37.3648095, longitude: 127.1076833};

  return (
    <NaverMapView
      style={{width: '100%', height: '100%'}}
      showsMyLocationButton={true}
      center={{...P0, zoom: 16}}
      onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
      <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
      <Marker
        coordinate={P0}
        pinColor="blue"
        onClick={() => console.warn('onClick! p1')}
      />
    </NaverMapView>
  );
};
const SotreDetailInfo = () => {
  const g = useGlobalStore();
  return (
    <ScrollView>
      <Container ph0={false}>
        <Name>브라운도트</Name>
        <Location>
          경기도 성남시 분당구 정자일로 177 젤존타워 정자역에서 정자동 우체국
          방향으로 도보 5분
        </Location>
        <Contact>031.718.3737</Contact>
        <Line />
        <Description>
          성북구 돈암동에 위치한 해물솥밥&막걸리 전문점 ”브라운도트”는, 세련된
          분위기의 퓨전 한식당으로서 일본풍 가정식 느낌의 개인트레 이를
          사용함으로 개인 위생 및 프라이빗을 중요시
        </Description>

        <Title style={{fontSize: 16, fontWeight: 'bold', marginTop: 35}}>
          위치안내
        </Title>

        <Map>
          <MyMap />
        </Map>
      </Container>
    </ScrollView>
  );
};

export default observer(SotreDetailInfo);

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const Container = styled.View<{ph0?: boolean}>`
  padding: 24px 16px;
`;
const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  letter-spacing: -0.3px;
`;
const Location = styled.Text`
  margin-top: 7px;
  font-size: 14px;
  color: ${theme.color.dark_yellow};
  line-height: 22px;
  letter-spacing: -0.3px;
`;
const Contact = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  line-height: 19px;
  color: #000;
  letter-spacing: -0.3px;
`;

const Line = styled.View`
  width: 100%;
  height: 1px;
  margin: 20px 0;
  background: #000;
`;
const Description = styled.Text`
  font-size: 14px;
  color: ${theme.color.dark_yellow};
  line-height: 22px;
  letter-spacing: -0.3px;
`;
const Map = styled.View`
  width: 100%;
  height: 300px;
  border-width: 0.5px;
  overflow: hidden;
  border-color: #000;
  /* background: #000; */
`;
