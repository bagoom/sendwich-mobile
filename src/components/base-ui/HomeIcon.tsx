import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {useGlobalStore} from '../../store/util';
import styled from 'styled-components/native';
import {FlatList, Dimensions, Text} from 'react-native';
import {BASE_URL} from '@env';
const numColumns = 4;
const HomeIcon = (props: any) => {
  const {data, index} = props;
  const g = useGlobalStore();
  const mr0 = index === 3 || index === 7;
  return (
    <IconButton mr={mr0}>
      <IconImage
        source={{
          uri: `${BASE_URL}${data.image.url}`,
        }}
        resizeMode="contain"
      />
      <IconText>{data.title}</IconText>
    </IconButton>
  );
};

export default observer(HomeIcon);

const IconButton = styled.TouchableOpacity<{mr?: boolean}>`
  width: ${(Dimensions.get('window').width - 164) / numColumns}px;
  align-items: center;
  margin-right: ${props => (props.mr ? '0' : '32')}px;
  margin-bottom: 15px;
  // background: blue;
`;
const IconImage = styled.Image`
  width: 100%;
  height: ${(Dimensions.get('window').width - 160) / numColumns}px;
`;
const IconText = styled.Text`
  margin-top: 7px;
  font-size: 10px;
  color: #7e745c;
`;
