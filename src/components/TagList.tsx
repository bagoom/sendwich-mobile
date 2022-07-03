import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import TagListItem from '../components/TagListItem';

import {Title} from '../Theme';
let titleVisible = false;
const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];
const TagList = (props: any) => {
  const {navigation} = props;
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
        {data.map((item, key) => (
          <TagListItem item={item} key={key} />
        ))}
      </View>
    </>
  );
};

export default observer(TagList);
