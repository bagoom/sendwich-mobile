import React, {useEffect, useRef} from 'react';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import {View, FlatList, Animated, Easing} from 'react-native';
import {useGlobalStore} from '../store/util';
import StoreListItem from '../components/StoreListItem';
import styled from 'styled-components/native';
import HeaderFilter from '../components/HeaderFilter';
import Footer from '../components/Footer';
import {Space} from '../Theme';
const StoreList = (props: any) => {
  const {start, type, category} = props;
  const g = useGlobalStore();
  const value = useRef(new Animated.Value(0));

  useEffect(() => {
    value.current.setValue(0);

    Animated.timing(value.current, {
      toValue: 10 + 22,
      useNativeDriver: true,
      delay: 0,
      duration: 10 * 100,
      easing: Easing.linear,
    }).start();
  });

  return (
    <>
      <FlatList
        data={g.shopList}
        ListHeaderComponent={
          <>
            <HeaderFilter />
            {/* {g.loading && <Loader />} */}
          </>
        }
        renderItem={({item, index}) => (
          <StoreListItem item={item} index={index} />
        )}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          paddingHorizontal: 16,
        }}
        ListFooterComponent={
          <View style={{flex: 1}}>
            <Space />
            <Footer />
          </View>
        }
      />

      {/* {listData?.map((item: any, key: any) => (
              <StoreListItem
                item={item}
                key={item.id}
                index={key}
                isLoading={isLoading}
              />
            ))} */}
    </>
  );
};

export default React.memo(observer(StoreList));
const Wrapper = styled.View`
  flex: 1;
  padding: 0 16px;
`;
const EmptyList = styled.View<{ph0?: boolean}>`
  padding: 40px 16px;
  justify-self: center;
  align-items: center;
`;
