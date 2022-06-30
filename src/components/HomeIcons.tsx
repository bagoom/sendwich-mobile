import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {SectionList, Dimensions, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import HomeIcon from './base-ui/HomeIcon';

import styled from 'styled-components/native';

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
    </Wrapper>
  );
};

export default observer(HomeIcons);

const Wrapper = styled.View`
  margin: 20px 0 30px;
  padding: 0 18px;
  flex-direction: row;
  flex-wrap: wrap;
  // justify-content: space-between;
`;

const HomeIconRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
