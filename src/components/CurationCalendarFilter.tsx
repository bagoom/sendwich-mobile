import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import {useGlobalStore} from '../store/util';
import CheckBox from '../components/base-ui/CheckBox';
import SelectBox from '../components/base-ui/SelectBox';
import theme from '../Theme';
import styled from 'styled-components/native';
import {Calendar, LocaleConfig, Agenda} from 'react-native-calendars';
import Modal from 'react-native-modal';
import moment from 'moment';
import Icon from '../../Icon-font.js';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get(
        'REAL_WINDOW_HEIGHT',
      );

const styles = StyleSheet.create({
  drawerMenuStyle: {
    width: deviceWidth, // SideMenu width
    margin: 0,
    paddingHorizontal: 40,
  },
});

LocaleConfig.locales['kr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘날짜',
};
LocaleConfig.defaultLocale = 'kr';

const today = moment().format('yy-MM-DD');
const nextMonth = moment().add(2, 'M').format('yy-MM-DD');
console.log(nextMonth);
const CurationCalendarFilter = ({name, isBordered = true}: any) => {
  const g = useGlobalStore();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
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
        </FilterArea>
      </ListItem>
      <Modal
        isVisible={modalVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={() => setModalVisible(false)}
        hasBackdrop={Platform.OS === 'android' ? true : false}
        useNativeDriver={true}
        style={styles.drawerMenuStyle}>
        <Calendar
          style={{
            borderRadius: 6,
            padding: 20,
          }}
          current={today}
          minDate={today}
          maxDate={nextMonth}
          onDayPress={day => {
            console.log('selected day', day);
          }}
          monthFormat={'yyyy MM'}
          // 달력에서 보이는 월이 바뀔때 실행되는 함수, Default = undefined
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          // 달 이동 화살표 숨기기, Default = false
          hideArrows={false}
          // 기본 화살표를 커스텀화살ㅇㅈ표로 대체 (방향은 '왼쪽'이나 '오른쪽')
          renderArrow={direction => (
            <Icon
              name={`arrow-left`}
              style={{
                fontSize: 14,
                color: '#000',
                transform:
                  direction === 'right'
                    ? [{rotate: '-180deg'}]
                    : [{rotate: '0deg'}],
              }}
            />
          )}
          // 이번 달 페이지에 다른 달 숫자를 보이지 않게 함, Default = false
          hideExtraDays={true}
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={false}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={subtractMonth => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          theme={{
            todayTextColor: theme.color.point,
            textDayFontSize: 14,
            textDayFontWeight: '500',
          }}
        />
      </Modal>
    </>
  );
};

export default observer(CurationCalendarFilter);

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
