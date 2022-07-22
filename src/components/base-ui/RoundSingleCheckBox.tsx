import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {useGlobalStore} from '../../store/util';
import {TouchableOpacity} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';

const RoundSingleCheckBox = (props: any) => {
  const {data, onChange} = props;
  const g = useGlobalStore();
  const [isChecked, setToggleCheckBox] = useState(false);
  return (
    <BouncyCheckboxGroup
      data={data}
      style={{flexDirection: 'column'}}
      onChange={(selectedItem: ICheckboxButton) => {
        onChange(selectedItem.text);
      }}
    />
  );
};

export default observer(RoundSingleCheckBox);
