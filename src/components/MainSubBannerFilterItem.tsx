import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, Keyboard} from 'react-native';
import {useGlobalStore} from '../store/util';
import CheckBox from '../components/base-ui/CheckBox';
import SelectBox from '../components/base-ui/SelectBox';
import theme from '../Theme';
import styled from 'styled-components/native';

const MainSubBannerFilterItem = ({name, isBordered = true}: any) => {
  const g = useGlobalStore();
  return (
    <ListItem border={isBordered}>
      <LabelArea>
        <ItemName>{name}</ItemName>
        <CheckBox
          size={18}
          radius={7}
          color={theme.color.point}
          label="상관없음"
        />
      </LabelArea>

      <FilterArea>
        <Priority>
          <SelectBox />
        </Priority>
        <TextInput placeholder={`${name}입력`} placeholderTextColor="#c5c5c5" />
      </FilterArea>
    </ListItem>
  );
};

export default observer(MainSubBannerFilterItem);

const ListItem = styled.View<{border?: boolean}>`
  margin-bottom: 20px;
  border-bottom-width: ${props => (props.border ? '1px' : '0px')};
  border-bottom-color: #f5f5f5;
  overflow: hidden;
`;

const LabelArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ItemName = styled.Text`
  color: #000;
  font-size: 16px;
  font-weight: bold;
`;

const FilterArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Priority = styled.View``;

const TextInput = styled.TextInput`
  text-align: right;
  color: #000;
  font-size: 14px;
  font-weight: 500;
`;
