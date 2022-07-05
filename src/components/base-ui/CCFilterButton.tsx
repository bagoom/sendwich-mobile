import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {useGlobalStore} from '../../store/util';

import theme from '../../Theme';
import styled from 'styled-components/native';

const CCFilterButton = (props: any) => {
  const {titles} = props;
  const g = useGlobalStore();
  console.log(g.CCFilterIndex);
  return titles.map((title: string, index: number) => {
    const activeState = index === g.CCFilterIndex;
    return (
      <Button
        activeOpacity={0.8}
        activation={activeState}
        onPress={() => g.onChangeCCFilter(index)}
        key={index}>
        <Text activation={activeState}>{title}</Text>
      </Button>
    );
  });
};

export default observer(CCFilterButton);

const Button = styled.TouchableOpacity<{activation?: boolean}>`
  margin-right: 7px;
  padding: 7px 20px;
  background: ${props => (props.activation ? theme.color.point : '#ccc')};
  border-radius: 24px;
`;
const Text = styled.Text<{activation?: boolean}>`
  font-size: 12px;
  color: #fff;
`;
