import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {useGlobalStore} from '../../store/util';
import {Dimensions} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CheckBox = (props: any) => {
  const {size, radius, label, color, onChange} = props;
  const g = useGlobalStore();
  const [isChecked, setToggleCheckBox] = useState(false);
  const toggleTextColor = isChecked ? '#000' : '#888';
  const toggleBorderColor = isChecked ? color : '#ddd';
  return (
    <BouncyCheckbox
      size={size}
      fillColor={color}
      unfillColor="#FFFFFF"
      text={label}
      textContainerStyle={{marginLeft: 6}}
      bounceFriction={7}
      iconStyle={{borderColor: toggleBorderColor, borderRadius: radius}}
      textStyle={{
        textDecorationLine: 'none',
        fontSize: 14,
        color: toggleTextColor,
      }}
      onPress={(isChecked: boolean) => {
        setToggleCheckBox(isChecked);
        onChange ? onChange() : null;
      }}
    />
  );
};

export default observer(CheckBox);
