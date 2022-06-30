import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import StoreListItem from '../components/StoreListItem';

import {Title} from '../Theme';

const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];
const StoreList = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();
  return (
    <>
      <View
        style={{
          flex: 1,
          marginTop: 30,
          paddingBottom: 30,
        }}>
        <Title>내 주변 매장</Title>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          {data.map(item => (
            <StoreListItem item={item} />
          ))}
        </View>
      </View>
    </>
  );
};

export default observer(StoreList);
