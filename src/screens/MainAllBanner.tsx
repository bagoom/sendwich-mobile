import React, {ReactChild, useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, FlatList, Text, ScrollView, Dimensions} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import EventItem from '../components/EventItem';

const dummy = [1, 2, 3, 4, 5, 6, 7];
const MainAllBanner = (props: any) => {
  const g = useGlobalStore();
  return (
    <ScrollView>
      <Wrapper>
        {dummy.map((item: any, index: number) => (
          <EventItem data={item} key={index} index={index} />
        ))}
      </Wrapper>
    </ScrollView>
  );
};

export default observer(MainAllBanner);

const Wrapper = styled.View`
  flex: 1;
  padding: 16px 16px;
  background: #f9f9f9;
`;
