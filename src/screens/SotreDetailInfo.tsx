import React, {useEffect, useState} from 'react';
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

import axios from 'axios';
import {useQuery} from 'react-query';
import {BASE_URL} from '@env';
import Loader from '../components/Loader';

const MyMap = (props: any) => {
  const coord = props.coord;
  console.log(coord);
  return (
    <>
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        showsMyLocationButton={true}
        center={{
          ...coord,
          zoom: 16,
        }}
        onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
        <Marker
          coordinate={coord}
          onClick={() => console.warn('onClick! p0')}
        />
        {/* <Marker
            coordinate={P0}
            pinColor="blue"
            onClick={() => console.warn('onClick! p1')}
          /> */}
      </NaverMapView>
    </>
  );
};
const SotreDetailInfo = ({navigation, route}: any) => {
  const g = useGlobalStore();

  // const [coord, setCoord] = useState<any>({
  //   latitude: 37.3648095,
  //   longitude: 127.1076833,
  // });

  const {isLoading, error, data} = useQuery(
    'fetch-detail',
    () => axios(`${BASE_URL}/api/stores/with-coupon/${route.params}`),
    {staleTime: 100000},
  );
  const infoData = data?.data.data;
  console.log(infoData);
  useEffect(() => {
    g.searchAddr(infoData.addr);
  }, []);
  console.log(g.searchAddrArr.length);
  if (isLoading) return <Loader />;
  const coord = {
    latitude: parseFloat(g.searchAddrArr[0]?.y),
    longitude: parseFloat(g.searchAddrArr[0]?.x),
  };

  return (
    <>
      {!isLoading && g.searchAddrArr.length !== 0 && (
        <ScrollView>
          <Container ph0={false}>
            <Name>{infoData.shop_name}</Name>
            <Location>{infoData.location_information}</Location>
            <Contact>{infoData.conatac_number}</Contact>
            <Line />
            <Description>{infoData.content}</Description>

            <Title style={{fontSize: 16, fontWeight: 'bold', marginTop: 35}}>
              위치안내
            </Title>

            <Map>
              <MyMap coord={coord} />
            </Map>
          </Container>
        </ScrollView>
      )}
    </>
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
