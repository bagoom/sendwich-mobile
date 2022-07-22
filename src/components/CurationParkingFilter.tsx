import React, {useState, useLayoutEffect} from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, Platform, Dimensions, View} from 'react-native';
import {useGlobalStore} from '../store/util';
import CheckBox from '../components/base-ui/CheckBox';
import RoundSingleCheckBox from '../components/base-ui/RoundSingleCheckBox';
import SelectBox from '../components/base-ui/SelectBox';
import theme, {Title} from '../Theme';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {BASE_URL} from '@env';
import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../Icon-font.js';
import {ICheckboxButton} from 'react-native-bouncy-checkbox-group';
const deviceWidth = Dimensions.get('window').width;

const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get(
        'REAL_WINDOW_HEIGHT',
      );

const CurationParkingFilter = ({name, isBordered = true, label}: any) => {
  const g = useGlobalStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [parking, setParking] = useState('');
  const [disable, setDisable] = useState(false);
  const navigation = useNavigation<any>();

  const checkParking = (park: never) => {
    if (parking === park) {
      //   const newParkings = parking.filter(item => item !== park);
      //   setParking([...newParkings]);
    } else {
      setParking(park);
    }
  };
  console.log(parking);

  const toggleTextColor = parking ? '#000' : '#aaa';
  const toggleBorderColor = parking ? theme.color.point : '#ddd';

  const _iconStyle = (borderColor: string) => ({
    height: 18,
    width: 18,
    margin: 0,
    borderRadius: 25,
    borderColor: toggleBorderColor,
  });

  const styles = StyleSheet.create({
    drawerMenuStyle: {
      margin: 0,
    },
    verticalStyle: {paddingVertical: 14},
    textStyle: {
      paddingLeft: 5,
      fontSize: 14,
      textDecorationLine: 'none',
      color: toggleTextColor,
    },
    iconImageStyle: {height: 10, width: 10},
  });

  const data: ICheckboxButton[] = [
    {
      id: 0,
      text: '주차가능',
      fillColor: theme.color.point,
      unfillColor: '#fff',
      useNativeDriver: true,
      iconStyle: {
        height: 18,
        width: 18,
        borderRadius: 25,
        borderColor: parking === '주차가능' ? theme.color.point : '#ddd',
      },
      textStyle: {
        fontSize: 14,
        textDecorationLine: 'none',
        color: parking === '주차가능' ? '#000' : '#aaa',
      },
      style: styles.verticalStyle,
      bounceFriction: 7,
    },
    {
      id: 1,
      text: '주차불가',
      fillColor: theme.color.point,
      unfillColor: '#fff',
      useNativeDriver: true,
      iconStyle: {
        height: 18,
        width: 18,
        borderRadius: 25,
        borderColor: parking === '주차불가' ? theme.color.point : '#ddd',
      },
      textStyle: {
        fontSize: 14,
        textDecorationLine: 'none',
        color: parking === '주차불가' ? '#000' : '#aaa',
      },
      style: styles.verticalStyle,
      bounceFriction: 7,
    },
    {
      id: 2,
      text: '주차편리',
      fillColor: theme.color.point,
      unfillColor: '#fff',
      useNativeDriver: true,
      iconStyle: {
        height: 18,
        width: 18,
        borderRadius: 25,
        borderColor: parking === '주차편리' ? theme.color.point : '#ddd',
      },
      textStyle: {
        fontSize: 14,
        textDecorationLine: 'none',
        color: parking === '주차편리' ? '#000' : '#aaa',
      },
      style: styles.verticalStyle,
      bounceFriction: 7,
    },
  ];

  useLayoutEffect(() => {
    if (parking.length !== 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [parking]);
  return (
    <ListItem border={isBordered}>
      <LabelArea>
        <ItemName>{label}</ItemName>
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
          <Text1>{name}</Text1>
        </Button>

        <Modal
          isVisible={modalVisible}
          deviceWidth={deviceWidth}
          //   deviceHeight={deviceHeight}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          propagateSwipe={true}
          onBackButtonPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          hasBackdrop={Platform.OS === 'android' ? true : false}
          useNativeDriver={true}
          style={styles.drawerMenuStyle}>
          <ListWrap keyboardShouldPersistTaps="handled">
            <Row>
              <BackButton onPress={() => setModalVisible(false)}>
                <Icon
                  name="arrow-right"
                  style={{
                    transform: [{rotate: '-180deg'}],
                    fontSize: 20,
                    color: '#000',
                  }}
                />
              </BackButton>
              <Title
                style={{
                  paddingLeft: 35,
                  //   paddingBottom: 15,
                  //   borderBottomWidth: 1,
                  //   borderColor: '#222',
                }}>
                큐레이션에 적용 될{'\n'}
                {name}
              </Title>
            </Row>
            <Item>
              <RoundSingleCheckBox data={data} onChange={checkParking} />
            </Item>
            <EmptySpace></EmptySpace>
          </ListWrap>

          <FixedBtnWrap>
            <FixedBtn
              activeOpacity={1}
              disabled={!disable}
              disable={disable}
              onPress={() => setModalVisible(false)}>
              <FixedBtnText>확인</FixedBtnText>
            </FixedBtn>
          </FixedBtnWrap>
        </Modal>
      </FilterArea>
    </ListItem>
  );
};

export default observer(CurationParkingFilter);

const ListItem = styled.View<{border?: boolean}>`
  margin-bottom: 20px;
  border-bottom-width: ${props => (props.border ? '1px' : '0px')};
  border-bottom-color: #f5f5f5;
  overflow: hidden;
`;
const Button = styled.TouchableOpacity`
  /* background: red; */
`;
const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: -5px;
  left: -5px;
  padding: 5px;
  z-index: 1;
`;
const Text1 = styled.Text`
  color: #c5c5c5;
`;
const LabelArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const EmptySpace = styled.View`
  padding-bottom: 50px;
`;
const Row = styled.View`
  /* flex-direction: row; */
  /* align-items: flex-start; */
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

const ListWrap = styled.ScrollView`
  background: #fff;
  padding: 20px 16px;
`;

const FixedBtnWrap = styled.View`
  width: 100%;
`;
const FixedBtn = styled.TouchableOpacity<{disable?: boolean}>`
  width: 100%;
  padding: 16px;
  background: ${props => (props.disable ? theme.color.point : '#ddd')};
`;

const FixedBtnText = styled.Text`
  font-size: 16px;
  color: #000;
  text-align: center;
`;

const Item = styled.View`
  /* border-bottom-width: 1px; */
  border-color: #f5f5f5;
`;
