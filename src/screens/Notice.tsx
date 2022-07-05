import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import theme, {Title} from '../Theme';

import NoticeList from '../components/NoticeList';

const Notice = () => {
  const g = useGlobalStore();
  return (
    <ScrollView>
      <Wrpper>
        <NoticeList />
      </Wrpper>
    </ScrollView>
  );
};

export default observer(Notice);
const Wrpper = styled.View`
  margin-bottom: 30px;
`;
const ScrollView = styled.ScrollView``;
