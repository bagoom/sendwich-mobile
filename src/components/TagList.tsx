import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import TagListItem from '../components/TagListItem';

import {Title} from '../Theme';
let titleVisible = false;
const TagList = (props: any) => {
  const {navigation, data} = props;
  titleVisible = props.titleVisible;
  const g = useGlobalStore();
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}>
        {data?.map((item: any, key: any) => (
          <TagListItem item={item} key={key} />
        ))}
      </View>
    </>
  );
};

export default observer(TagList);
