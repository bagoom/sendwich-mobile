import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import LikeListItem from '../components/LikeListItem';

import {Title} from '../Theme';

import axios from 'axios';
import {useQuery} from 'react-query';
import {BASE_URL} from '@env';

const LikeList = (props: any) => {
  const g = useGlobalStore();

  const {isLoading, error, data} = useQuery('like-list', () =>
    axios(`${BASE_URL}/api/likes/with-store?user_id=${g.sendwichProfile.id}`),
  );
  const likeData = data?.data.storeInfo;
  return (
    <Wrapper>
      {likeData?.map((item: any, key: any) => (
        <LikeListItem item={item} key={key} />
      ))}
    </Wrapper>
  );
};

export default observer(LikeList);

const Wrapper = styled.View`
  margin-top: 10px;
`;
