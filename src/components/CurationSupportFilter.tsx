import React, {useState, useLayoutEffect} from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, Platform, Dimensions, Text} from 'react-native';
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

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  drawerMenuStyle: {
    margin: 0,
  },
});

const CurationSupportFilter = ({name, isBordered = true, label}: any) => {
  const g = useGlobalStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [support, setSupport] = useState('');
  const [disable, setDisable] = useState(false);
  const navigation = useNavigation<any>();

  const data = [
    {id: 1, title: '지원가능'},
    {id: 2, title: '지원불가'},
  ];

  const checkSupport = (support: never) => {
    setSupport(support);
  };

  const filterArr: any = g.sortingCurationFilter.find(
    (d: any) => d.type === 'support',
  );

  const clear = () => {
    setSupport('');
  };

  useLayoutEffect(() => {
    if (support !== '') {
      setDisable(true);
    } else {
      setDisable(false);
    }
    g.setCurationModalFilter('support', support, 0);
  }, [support]);
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
        <Priority onPress={() => g.setTargetFilter('support')}>
          <Label>우선순위</Label>
          <Num>{filterArr.order !== 0 ? filterArr.order : null}</Num>
        </Priority>
        <Button activeOpacity={1} onPress={() => setModalVisible(true)}>
          {filterArr.list !== '' ? (
            <Text2>{filterArr.list}</Text2>
          ) : (
            <Text1>{name}</Text1>
          )}
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
              <BackButton
                onPress={() => {
                  setModalVisible(false);
                  clear();
                }}>
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
                }}>
                큐레이션에 적용 될{'\n'}
                {name}
              </Title>
            </Row>
            <Item>
              <RoundSingleCheckBox
                data={data}
                checkedText={support}
                onChange={checkSupport}
              />
            </Item>
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

export default observer(CurationSupportFilter);

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
const Text2 = styled.Text`
  color: #000;
`;
const LabelArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  padding: 12px 0 14px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Priority = styled.TouchableOpacity`
  flex-direction: row;
`;

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
const Label = styled.Text<{show?: boolean}>`
  color: #999;
  font-size: 14px;
  font-weight: 400;
`;
const Num = styled.Text<{show?: boolean}>`
  padding-left: 5px;
  color: ${theme.color.point};
  font-size: 14px;
  font-weight: 500;
`;
