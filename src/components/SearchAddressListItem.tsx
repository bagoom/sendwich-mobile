import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import Icon from '../../Icon-font.js';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

const SearchAddressListItem = (props: any) => {
  const {item} = props;
  const g = useGlobalStore();
  const navigation = useNavigation<any>();
  return (
    item.road_address && (
      <ListItem
        onPress={() => {
          g.selectHeaderAddr(item.road_address?.address_name, item);
          navigation.goBack();
        }}>
        <Icon
          name="marker"
          style={{fontSize: 20, color: '#222', position: 'absolute', top: 2}}
        />
        <NewAddr>{item.road_address?.address_name}</NewAddr>
        <OldAddr>{item.address_name}</OldAddr>
      </ListItem>
    )
  );
};

export default observer(SearchAddressListItem);

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
