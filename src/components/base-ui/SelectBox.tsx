import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, View} from 'react-native';
import {useGlobalStore} from '../../store/util';
import SelectDropdown from 'react-native-select-dropdown';

import theme from '../../Theme';

import styled from 'styled-components/native';

const countries = ['1', '2', '3', '4'];

const SelectBox = (props: any) => {
  const {data, radius, label, color} = props;
  const g = useGlobalStore();
  const [show, setDropdownShow] = useState(false);

  return (
    <>
      <SelectWrap>
        <SelectDropdown
          buttonStyle={{
            paddingVertical: 16,
            backgroundColor: 'transparent',
          }}
          buttonTextStyle={{
            fontSize: 14,
            fontWeight: '500',
            color: '#000',
          }}
          data={countries}
          onFocus={() => setDropdownShow(true)}
          onBlur={() => setDropdownShow(false)}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem: number, index) => {
            return (
              <>
                <View style={{flexDirection: 'row'}}>
                  <Label>우선순위 </Label>
                  <Value>{selectedItem}</Value>
                </View>
              </>
            );
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </SelectWrap>
    </>
  );
};

export default observer(SelectBox);

const SelectWrap = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Label = styled.Text<{show?: boolean}>`
  color: #000;
  font-size: 14px;
  font-weight: 500;
`;
const Value = styled.Text`
  margin-left: 3px;
  color: ${theme.color.red};
  font-size: 14px;
  font-weight: 500;
`;
