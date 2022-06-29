import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {SectionList, Dimensions, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import HomeIcon from './base-ui/HomeIcon';

import styled from 'styled-components/native';

const numColumns = 4;
const data = [
  {id: 1, icon: 'restaurant', name: '카페'},
  {id: 2, icon: 'restaurant', name: '카페'},
  {id: 3, icon: 'restaurant', name: '카페'},
  {id: 4, icon: 'restaurant', name: '카페'},
  {id: 5, icon: 'restaurant', name: '카페'},
  {id: 6, icon: 'restaurant', name: '카페'},
  {id: 7, icon: 'restaurant', name: '카페'},
  {id: 8, icon: 'restaurant', name: '카페'},
];

const HomeIcons = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();

  useEffect(() => {
    g.getHomeIcons();
  }, []);

  return (
    <Wrapper>
      {g.homeIcons.map((item: any, index: number) => {
        return <HomeIcon data={item} key={index} index={index} />;
      })}

      {/* <SectionList
        sections={g.homeIcons}
        getItemCount={items => items.length}
        renderItem={({item}) => <HomeIcon data={item} />}
      /> */}
    </Wrapper>
  );
};

export default observer(HomeIcons);

const Wrapper = styled.View`
  margin: 20px 0;
  padding: 0 18px;
  flex-direction: row;
  flex-wrap: wrap;
  // justify-content: space-between;
`;

const HomeIconRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
