import React, {useState} from 'react';
import {observer, inject} from 'mobx-react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button,
  Platform,
  SafeAreaView,
} from 'react-native';

import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {useGlobalStore} from '../store/util';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get(
        'REAL_WINDOW_HEIGHT',
      );

const styles = StyleSheet.create({
  drawerMenuStyle: {
    width: deviceWidth * 0.75, // SideMenu width
    margin: 0,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
});

//최외각에서 뷰들을 감싸는 Constainer
const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const DrawerNavigator = (props: any) => {
  const g = useGlobalStore();

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <Button title="Show modal" onPress={toggleModal} />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        swipeDirection="left" // Discard the drawer with swipe to left
        hideModalContentWhileAnimating // Better performance, try with/without
        propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
        style={styles.drawerMenuStyle} // Needs to contain the width, 75% of screen width in our case
      >
        <SafeAreaView style={{flex: 1}}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={toggleModal} />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default observer(DrawerNavigator);
