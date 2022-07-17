import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Alert, SafeAreaView, DeviceEventEmitter} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import {useIsFocused} from '@react-navigation/native';

import HeaderFilter from '../components/HeaderFilter';
import StoreLargeList from '../components/StoreLargeList';
import StoreList from '../components/StoreList';

const CustomRoute = (props: any) => {
  const g = useGlobalStore();
  const isFocused = useIsFocused();
  console.log(isFocused);
  useEffect(() => {
    if (isFocused) {
      g.seleteFilterBtn('인기순');
      g.getShopList();
    }
  }, [isFocused]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <>
        {/* <Wrapper>
            <StoreLargeList
              start={0}
              type={type}
              category={g.currentRoute.name}
            />
          </Wrapper> */}

        <StoreList />
      </>
    </SafeAreaView>
  );
};

export default observer(CustomRoute);

const ScrollView = styled.ScrollView`
  flex: 1;
`;
const Wrapper = styled.View`
  flex: 1;
  padding: 0 16px;
`;
const Text1 = styled.Text`
  font-size: 12px;
  line-height: 20px;
  color: #999;
`;
const Text2 = styled.Text`
  margin-top: 25px;
  font-size: 12px;
  line-height: 19px;
  color: #bbb;
`;
const EmptyList = styled.View<{ph0?: boolean}>`
  padding: 40px 16px;
  justify-self: center;
  align-items: center;
`;
