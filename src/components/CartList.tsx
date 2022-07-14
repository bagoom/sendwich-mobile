import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import CartListItem from '../components/CartListItem';

import {Title} from '../Theme';

import {BASE_URL} from '@env';
import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import Loader from '../components/Loader';

const CartList = (props: any) => {
  const g = useGlobalStore();

  const cartListFetch = useQuery('fetch-list-fetch', () =>
    axios(`${BASE_URL}/api/cart/with-store?user_id=${g.sendwichProfile.id}`),
  );
  const data = cartListFetch?.data?.data.storeInfo;
  console.log(data);

  //   useEffect(() => {}, [dataList]);
  console.log('eeeeeeee');
  return (
    <>
      {cartListFetch?.isLoading && <Loader />}

      {!cartListFetch?.isLoading && (
        <Wrapper>
          {data?.map((item: any, key: any) => (
            <CartListItem item={item} key={key} />
          ))}
        </Wrapper>
      )}
    </>
  );
};

export default observer(CartList);

const Wrapper = styled.View`
  margin-top: 0;
  flex: 1;
`;
