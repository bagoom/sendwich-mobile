import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import CustomerServiceListItem from '../components/CustomerServiceListItem';
import CCFilterButton from './base-ui/CCFilterButton';
import CustomerService2 from '../screens/CustomerService2';

import {Title} from '../Theme';

import axios from 'axios';
import {useQuery} from 'react-query';
import {BASE_URL} from '@env';
const CustomerServiceList = (props: any) => {
  const g = useGlobalStore();
  const [currentIndex, setCurrentIndex] = useState(-1);

  const {isLoading, error, data} = useQuery('cs-list', () =>
    axios(`${BASE_URL}/api/faqs?filters[user_id][$eq]=${g.sendwichProfile.id}`),
  );
  const csData = data?.data.data;

  return (
    <Wrapper>
      <ButtonWrap>
        <CCFilterButton titles={['문의 리스트', '1:1문의']} />
      </ButtonWrap>

      {g.CCFilterIndex == 0 ? (
        csData?.map((item: any, index: any) => (
          <CustomerServiceListItem
            item={item}
            key={index}
            currentNumber={index + 1}
            index={index}
            isShow={index === currentIndex ? true : false}
            setCurrentIndex={setCurrentIndex}
          />
        ))
      ) : (
        <CustomerService2 />
      )}
    </Wrapper>
  );
};

export default observer(CustomerServiceList);

const Wrapper = styled.View`
  margin-top: 0;
`;

const ButtonWrap = styled.View`
  flex-direction: row;
  padding: 16px;
  background: #f6f6f6;
`;
