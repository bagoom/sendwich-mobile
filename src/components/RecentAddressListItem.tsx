import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import Icon from '../../Icon-font.js';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

const RecentAddressListItem = (props: any) => {
  const {item, index} = props;
  const g = useGlobalStore();
  const navigation = useNavigation<any>();
  return (
    <ListItem
      onPress={() => {
        g.selectHeaderAddr(item.road_addr, {
          address: {address_name: item.addr},
          road_address: {address_name: item.road_addr},
          x: item.x,
          y: item.y,
        });
        navigation.goBack();
      }}>
      <Icon
        name="marker"
        style={{fontSize: 20, color: '#222', position: 'absolute', top: 2}}
      />
      <NewAddr>{item.addr}</NewAddr>
      <OldAddr>{item.road_addr}</OldAddr>

      <CloseButton onPress={() => g.deleteRecentAddr(index)}>
        <Icon name="close" style={{fontSize: 16, color: '#bbb'}} />
      </CloseButton>
    </ListItem>
  );
};

export default observer(RecentAddressListItem);

const ListItem = styled.TouchableOpacity<{type?: number}>`
  width: 100%;
  margin-right: ${props => (props.type ? '14px' : '0px')};
  margin-bottom: 23px;
  padding-left: 26px;
  padding-right: 26px;
`;

const NewAddr = styled.Text`
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.8px;
  color: #000;
`;
const OldAddr = styled.Text`
  font-size: 14px;
  color: #999;
`;
const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: -2px;
  right: 0;
  padding: 5px;
`;
