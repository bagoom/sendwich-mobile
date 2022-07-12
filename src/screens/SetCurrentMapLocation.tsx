import React, {useState, useEffect, useRef} from 'react';
import {observer} from 'mobx-react';
import {View, FlatList, ScrollView, Dimensions} from 'react-native';
import {useGlobalStore} from '../store/util';
import Geolocation from '@react-native-community/geolocation';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import NaverMapView, {Marker} from 'react-native-nmap';
import {useNavigation} from '@react-navigation/native';
import theme from '../Theme';

import Loader from '../components/Loader';

const mapHeight = hp('100%');
const SetCurrentMapLocation = (props: any) => {
  const mapRef = useRef(null);
  const navigation = useNavigation<any>();

  const g = useGlobalStore();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: 37.53815725,
    longitude: 126.9307627,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
        setLoading(true);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
    if (mapRef?.current !== null) {
      // @ts-ignore
      mapRef.current?.setLocationTrackingMode(3);
    }
  }, []);

  // console.log(g.coordsToAddr);

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.53815725,
    longitude: 126.9307627,
  });
  const locationHandler = (e: any) => {
    setCurrentLocation({
      latitude: e.latitude,
      longitude: e.longitude,
    });
    g.setMyLocation(`x=${e.longitude}&y=${e.latitude}`);
    // console.log(e);
  };
  return (
    <>
      {loading && (
        <Wrapper>
          <MapWrapper>
            <NaverMapView
              ref={mapRef}
              mapType={1}
              zoomControl={false}
              style={{width: '100%', height: '100%'}}
              showsMyLocationButton={true}
              buildingHeight={mapHeight - 130}
              center={{...location, zoom: 16}}
              onCameraChange={e => locationHandler(e)}>
              <Marker
                coordinate={currentLocation}
                onClick={() => console.warn('onClick! p0')}
              />
            </NaverMapView>
          </MapWrapper>

          <ArrdWrap>
            <RoadAddr>{g.coordsToAddr.roadArr}</RoadAddr>
            <Addr>{g.coordsToAddr.addr}</Addr>

            <Btn
              onPress={() => {
                g.selectHeaderAddr(g.coordsToAddr.roadArr2);
                navigation.navigate('MainStack');
              }}>
              <BtnText>선택한 위치로 설정</BtnText>
            </Btn>
          </ArrdWrap>
        </Wrapper>
      )}

      {!loading && <Loader />}
    </>
  );
};

export default observer(SetCurrentMapLocation);

const Wrapper = styled.View`
  flex: 1;
  background: #000;
`;
const MapWrapper = styled.View`
  height: ${mapHeight - 193}px;
`;

const ArrdWrap = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background: #fff;
`;
const RoadAddr = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #000;
  letter-spacing: -0.3px;
`;
const Addr = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: #999;
  letter-spacing: -0.3px;
`;

const Btn = styled.TouchableOpacity`
  width: 100%;
  margin-top: 15px;
  padding: 12px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background: ${theme.color.point};
`;

const BtnText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;
