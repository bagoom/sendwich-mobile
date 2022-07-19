import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, Platform, Dimensions, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import CheckBox from '../components/base-ui/CheckBox';
import SelectBox from '../components/base-ui/SelectBox';
import theme from '../Theme';
import {asPickerFormat} from '../lib/time';
import {BUTTON_HEIGHT, VIEW_WIDTH} from '../lib/time-value';
import styled from 'styled-components/native';
import TimePicker from './TimePicker';
import Modal from 'react-native-modal';
import moment from 'moment';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get(
        'REAL_WINDOW_HEIGHT',
      );

const styles = StyleSheet.create({
  drawerMenuStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    // width: deviceWidth, // SideMenu width
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CurationTimeFilter = ({name, isBordered = true}: any) => {
  const g = useGlobalStore();
  const [time, setTime] = useState(asPickerFormat(new Date()));
  const [modalVisible, setModalVisible] = useState(false);
  console.log(moment(time).format('HH-mm-ss'));
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
        <Button activeOpacity={1} onPress={() => setModalVisible(true)}>
          <Text1>{name}입력</Text1>
        </Button>

        <Modal
          isVisible={modalVisible}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onBackdropPress={() => setModalVisible(false)}
          hasBackdrop={Platform.OS === 'android' ? true : false}
          useNativeDriver={true}
          style={styles.drawerMenuStyle}>
          <TimePickerWrap>
            <Text style={{color: '#000'}}>{moment(time).format('HH:mm')}</Text>

            <AlignRow>
              <TimePickerContainer>
                <TimePicker
                  value={time}
                  onChange={setTime}
                  width={VIEW_WIDTH}
                  buttonHeight={BUTTON_HEIGHT}
                  visibleCount={3}
                />
              </TimePickerContainer>
            </AlignRow>
          </TimePickerWrap>
        </Modal>
      </FilterArea>
    </ListItem>
  );
};

export default observer(CurationTimeFilter);

const ListItem = styled.View<{border?: boolean}>`
  margin-bottom: 20px;
  border-bottom-width: ${props => (props.border ? '1px' : '0px')};
  border-bottom-color: #f5f5f5;
  overflow: hidden;
`;
const Button = styled.TouchableOpacity`
  /* background: red; */
`;
const Text1 = styled.Text`
  color: #c5c5c5;
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

const TimePickerWrap = styled.View`
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  width: 100%;
  padding: 35px;
  background: #fff;
`;
const AlignRow = styled.View`
  align-items: center;
  justify-content: center;
`;
const TimePickerContainer = styled.View`
  width: 60%;
  background: #fff;
`;
