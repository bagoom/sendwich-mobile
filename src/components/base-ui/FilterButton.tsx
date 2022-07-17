import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {useGlobalStore} from '../../store/util';

import theme from '../../Theme';
import styled from 'styled-components/native';

const FilterButton = (props: any) => {
  const {titles, activeState} = props;
  const g = useGlobalStore();

  const [activeValue, setActive] = useState('');

  const onPress = (value: string) => {
    g.seleteFilterBtn(value);
  };

  return titles.map((title: string, index: number) => {
    const activeState = title === g.seletedFilterBtn;
    return (
      <Button
        activeOpacity={0.8}
        activation={activeState}
        onPress={() => onPress(title)}
        key={index}>
        <Text activation={activeState}>{title}</Text>
      </Button>
    );
  });
};

export default observer(FilterButton);

const Button = styled.TouchableOpacity<{activation?: boolean}>`
  margin-right: 7px;
  padding: 7px 20px;
  background: ${props => (props.activation ? theme.color.point : '#f5f5f5')};
  border-radius: 24px;
`;
const Text = styled.Text<{activation?: boolean}>`
  font-size: 12px;
  color: ${props => (props.activation ? '#fff' : '#999')};
`;
