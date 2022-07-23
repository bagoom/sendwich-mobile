import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {useGlobalStore} from '../../store/util';
import {TouchableOpacity} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const RoundCheckBox = (props: any) => {
  const {size, radius, label, color, onChange, padding, checkedList} = props;
  const g = useGlobalStore();
  const toggleTextColor = checkedList?.includes(label) ? '#000' : '#aaa';
  const toggleBorderColor = checkedList?.includes(label) ? color : '#ddd';

  return (
    <BouncyCheckbox
      size={size}
      fillColor={color}
      unfillColor="#FFFFFF"
      text={label}
      isChecked={checkedList?.includes(label) ? true : false}
      style={{paddingVertical: padding}}
      textContainerStyle={{marginLeft: 6}}
      bounceFriction={7}
      iconStyle={{
        borderColor: toggleBorderColor,
        borderRadius: radius,
      }}
      textStyle={{
        textDecorationLine: 'none',
        fontSize: 14,
        color: toggleTextColor,
      }}
      onPress={(isChecked: boolean) => {
        onChange ? onChange() : null;
      }}
    />
  );
};

export default observer(RoundCheckBox);
