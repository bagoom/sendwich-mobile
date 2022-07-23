import React, {useState, useLayoutEffect} from 'react';
import {observer} from 'mobx-react';
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  FlatList,
  Animated,
} from 'react-native';
import {useGlobalStore} from '../../store/util';
import Modal from 'react-native-modal';

import theme from '../../Theme';

import styled from 'styled-components/native';

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

const {width, height} = Dimensions.get('window');

const countries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const ITEM_SIZE = width * 0.132;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

const SelectBox = (props: any) => {
  const {data, radius, label, color} = props;
  const g = useGlobalStore();
  // const [modalVisible, setModalVisible] = useState(true);
  const [prioritys, setPriority] = useState(0);

  useLayoutEffect(() => {
    g.setTargetFilterOrder(g.targetCuration, prioritys);
  }, [prioritys]);

  return (
    <>
      <Modal
        isVisible={g.prioritysModalVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => g.togglePrioritysModal(false)}
        hasBackdrop={Platform.OS === 'android' ? true : false}
        useNativeDriver={true}
        style={styles.drawerMenuStyle}>
        <SelectWrap>
          <Title>우선순위를 선택 해주세요</Title>
          <AlignRow>
            <SelectContainer>
              <FlatList
                data={countries}
                keyExtractor={item => item.toString()}
                bounces={false}
                // onScroll={Animated.event(
                //   [{nativeEvent: {contentOffset: {x: scrollX}}}],
                //   {useNativeDriver: true},
                // )}
                snapToInterval={ITEM_SIZE}
                decelerationRate="fast"
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  flexGrow: 0,
                }}
                contentContainerStyle={{
                  paddingVertical: 20,
                }}
                //@ts-ignore
                renderItem={({item}: never) => {
                  const disabled = g.curationFilter.some(c => c.order === item);
                  return (
                    <Button
                      disabled={disabled}
                      onPress={() => {
                        setPriority(item);
                        g.togglePrioritysModal(false);
                      }}>
                      <Label disabled={disabled}>{item}</Label>
                    </Button>
                  );
                }}
              />
            </SelectContainer>
          </AlignRow>
        </SelectWrap>
      </Modal>
    </>
  );
};

export default observer(SelectBox);

const SelectWrap = styled.View`
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  width: 100%;
  padding: 35px 35px 20px;
  background: #fff;
`;
const AlignRow = styled.View`
  align-items: center;
  justify-content: center;
`;
const SelectContainer = styled.View`
  padding: 20px 0;
  margin-top: 10px;
  overflow-y: hidden;
`;
const Title = styled.Text`
  position: absolute;
  top: 35px;
  left: 35px;
  color: #000;
  font-size: 14px;
  z-index: 10;
`;
const Button = styled.TouchableOpacity`
  width: ${ITEM_SIZE}px;
  justify-content: center;
  align-items: center;
`;
const Label = styled.Text<{disabled?: boolean}>`
  color: ${props => (props.disabled ? '#ccc' : '#222')};
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;
