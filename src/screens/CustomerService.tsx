import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import theme, {Title} from '../Theme';

import CustomerServiceList from '../components/CustomerServiceList';

const CustomerService = () => {
  const g = useGlobalStore();
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Wrpper>
        <CustomerServiceList />
      </Wrpper>
    </ScrollView>
  );
};

export default observer(CustomerService);
const Wrpper = styled.View`
  margin-bottom: 30px;
`;
const ScrollView = styled.ScrollView``;
