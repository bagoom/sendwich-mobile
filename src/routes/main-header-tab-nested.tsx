import React, {useState, useEffect} from 'react';
import {View, useWindowDimensions, StyleSheet, Text} from 'react-native';

import {useGlobalStore} from '../store/util';
import {observer, inject} from 'mobx-react';
import {
  TabView,
  TabBar,
  SceneMap,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';

type State = NavigationState<{
  key: string;
  title: string;
}>;

const FirstRoute = (props: any) => (
  <View style={{flex: 1, backgroundColor: '#fff'}}>
    <Text style={{color: '#000'}}>{props.foo}</Text>
  </View>
);
const renderTabBar = (props: SceneRendererProps & {navigationState: State}) => (
  <TabBar
    {...props}
    scrollEnabled
    indicatorStyle={styles.indicator}
    style={styles.tabbar}
    labelStyle={styles.label}
    tabStyle={styles.tabStyle}
    pressColor={'transparent'}
    activeColor={'#222'}
  />
);

const TabViewExample = () => {
  const g = useGlobalStore();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const categories = g.dynamic_categories;
  const obj = categories.reduce((accumulator, value) => {
    return {...accumulator, [value.key]: () => <FirstRoute foo="dddd" />};
  }, {});
  const renderScene = SceneMap(obj);
  const [routes] = useState(categories);
  return (
    <TabView
      swipeEnabled={false}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
      //@ts-ignore
      tabStyle={styles.tabStyle}
    />
  );
};

export default observer(TabViewExample);

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
  },
  indicator: {
    backgroundColor: 'transparent',
  },
  label: {
    fontWeight: '400',
    color: '#888',
  },
  tabStyle: {
    width: 'auto',
  },
});
