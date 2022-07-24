import React, {useRef, useLayoutEffect} from 'react';
import {observer} from 'mobx-react';
import {View, Animated, Alert} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import Icon from '../../Icon-font.js';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '@env';
import {converMeter} from '../lib/transfer';

const FilteredStoreListItem = (props: any) => {
  const {item} = props;
  const g = useGlobalStore();
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(0.01)).current;

  useLayoutEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
    // console.log('ddd');
  });
  return (
    <Animated.View style={{flex: 1, opacity: fadeAnim}}>
      <ListItem
        activeOpacity={1}
        onPress={() => navigation.navigate('SotreDetail', item.id)}>
        <View style={{flexDirection: 'row', alignContent: 'center'}}>
          <ImgBox>
            {item?.main_image ? (
              <Corver
                source={{uri: `${BASE_URL}${item?.main_image[0]?.url}`}}
              />
            ) : (
              <NoImg />
            )}
          </ImgBox>
          <View style={{paddingVertical: 5, paddingRight: 0}}>
            <Subject>{item.shop_name}</Subject>
            {item?.menu_list && (
              <Desc>{item?.menu_list[0]?.menus[0]?.menuname}</Desc>
            )}
            <Text1>{converMeter(item?.distance)}</Text1>
          </View>
        </View>
      </ListItem>
    </Animated.View>
  );
};

export default observer(FilteredStoreListItem);

const ListItem = styled.TouchableOpacity<{type?: number}>`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom-width: 0.6px;
  border-color: #f3f3f3;
`;

const ImgBox = styled.View`
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border-radius: 4px;
  overflow: hidden;
  border: 0.7px solid #eee;
`;
const Corver = styled.Image`
  width: 80px;
  height: 80px;
`;
const NoImg = styled.View`
  width: 80px;
  height: 80px;
  background: #f3f3f3;
`;

const Subject = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #000;
  letter-spacing: -0.3px;
`;
const Desc = styled.Text`
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 22px;
  color: #999;
`;
const Text1 = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #999;
  letter-spacing: -0.3px;
`;
