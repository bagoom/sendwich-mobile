import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, Keyboard} from 'react-native';
import {useGlobalStore} from '../store/util';
import CheckBox from '../components/base-ui/CheckBox';
import SelectBox from '../components/base-ui/SelectBox';
import theme from '../Theme';
import styled from 'styled-components/native';

const MainSubBannerFilterItem = ({
  name,
  type,
  fixLabel,
  isBordered = true,
}: any) => {
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
        <Row>
          <Text1>{fixLabel}</Text1>
          <TextInput
            fixLabel={fixLabel}
            placeholder={`${name}`}
            keyboardType={type === 'number' ? 'numeric' : 'default'}
            placeholderTextColor="#c5c5c5"
          />
        </Row>
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
  font-size: 15px;
  font-weight: 500;
`;

const FilterArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Priority = styled.View``;

const TextInput = styled.TextInput<{fixLabel?: string}>`
  text-align: right;
  color: #000;
  padding-right: ${props => (!props.fixLabel ? '0px' : '45px')};
  font-size: 14px;
  font-weight: 400;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
const Text1 = styled.Text`
  position: absolute;
  top: 13.5px;
  right: 0;
  text-align: right;
  color: #000;
  font-size: 14px;
  font-weight: 400;
`;
