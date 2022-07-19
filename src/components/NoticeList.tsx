import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import NoticeListItem from '../components/NoticeListItem';
import EmptyList from './EmptyList';

import axios from 'axios';
import {useQuery} from 'react-query';
import {BASE_URL} from '@env';

const NoticeList = (props: any) => {
  const g = useGlobalStore();
  const [currentIndex, setCurrentIndex] = useState(-1);

  const {isLoading, error, data} = useQuery('notice-list', () =>
    axios(`${BASE_URL}/api/notices`),
  );
  const NoticeData = data?.data.data;

  return (
    <Wrapper>
      {NoticeData?.map((item: any, index: any) => (
        <NoticeListItem
          item={item}
          key={index}
          currentNumber={index + 1}
          index={index}
          isShow={index === currentIndex ? true : false}
          setCurrentIndex={setCurrentIndex}
        />
      ))}

      {NoticeData.length === 0 && (
        <EmptyList
          text1="등록된 공지사항이 없습니다."
          // text2={`다른 카테고리를 선택 해주세요..`}
        />
      )}
    </Wrapper>
  );
};

export default observer(NoticeList);

const Wrapper = styled.View`
  margin-top: 0;
`;
