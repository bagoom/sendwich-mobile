import React, {useLayoutEffect} from 'react';
import {observer} from 'mobx-react';
import {useGlobalStore} from '../../store/util';
import theme from '../../Theme';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';

const RoundSingleCheckBox = (props: any) => {
  const {data, onChange, checkedText} = props;
  const g = useGlobalStore();

  console.log(checkedText);
  const _data = data.map((item: any) => ({
    id: item.id,
    text: item.title,
    fillColor: theme.color.point,
    unfillColor: '#fff',
    useNativeDriver: true,
    iconStyle: {
      height: 18,
      width: 18,
      borderRadius: 25,
      borderColor: checkedText === item.title ? theme.color.point : '#ddd',
    },
    textStyle: {
      fontSize: 14,
      textDecorationLine: 'none',
      color: checkedText === item.title ? '#000' : '#aaa',
    },
    style: {paddingVertical: 14},
    bounceFriction: 7,
    isChecked: checkedText === item.title ? true : false,
  }));
  const checkdata: ICheckboxButton[] = _data;
  //@ts-ignore
  const checked = checkdata.find((d: any) => d.isChecked)?.id;

  return (
    <BouncyCheckboxGroup
      initial={checked}
      data={checkdata}
      style={{flexDirection: 'column'}}
      onChange={(selectedItem: ICheckboxButton) => {
        onChange(selectedItem.text);
      }}
    />
  );
};

export default observer(RoundSingleCheckBox);
