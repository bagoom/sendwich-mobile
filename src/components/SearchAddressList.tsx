import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import SearchAddressListItem from './SearchAddressListItem';
import styled from 'styled-components/native';
import {SubTitle} from '../Theme';

const SearchAddressList = (props: any) => {
  const {} = props;
  const g = useGlobalStore();
  const data = g.searchAddrArr;
  return (
    <Wrapper>
      {data ? (
        <>
          <SubTitle>검색 결과</SubTitle>
          {data.map((item: any, key: any) => (
            <SearchAddressListItem item={item} key={key} />
          ))}
        </>
      ) : null}
    </Wrapper>
  );
};

export default observer(SearchAddressList);

const Wrapper = styled.View`
  flex: 1;
`;
