import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import StoreLargeListItem from './StoreLargeListItem';

import {Title} from '../Theme';
let titleVisible = false;
const data = [{id: 1}, {id: 2}, {id: 3}];
const StoreLargeList = (props: any) => {
  const {navigation} = props;
  titleVisible = props.titleVisible;
  const g = useGlobalStore();
  return (
    <>
      <View
        style={{
          flex: 1,
          marginTop: 16,
          paddingBottom: 30,
        }}>
        {props.titleVisible && <Title>내 주변 매장</Title>}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          {data.map((item, key) => (
            <StoreLargeListItem item={item} key={key} />
          ))}
        </View>
      </View>
    </>
  );
};

export default observer(StoreLargeList);
