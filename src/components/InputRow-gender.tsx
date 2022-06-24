import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useGlobalStore} from '../store/util';
import {InputLabel} from '../Theme';
import styled from 'styled-components/native';

const InputRowGender = (props: any) => {
  const {label} = props;
  const g = useGlobalStore();
  console.log(g.gender);
  return (
    <View style={styles.inputRow}>
      <InputLabel>{label}</InputLabel>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{alignItems: 'center', marginRight: 23}}>
          <Button
            onPress={() => g.setGender('male')}
            gender={g.gender === 'male'}>
            <Image
              source={require('../assets/images/man.png')}
              style={{width: 46, height: 53, marginTop: 3}}
            />
          </Button>
          <Text>남자</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Button
            onPress={() => g.setGender('female')}
            gender={g.gender === 'female'}>
            <Image
              source={require('../assets/images/woman.png')}
              style={{width: 46, height: 53, marginTop: -5}}
            />
          </Button>
          <Text>여자</Text>
        </View>
      </View>
    </View>
  );
};

export default observer(InputRowGender);

const Button = styled.TouchableOpacity<{gender?: boolean}>`
  width: 80px;
  height: 80px;
  margin-bottom: 7px;
  background: ${props => (props.gender ? '#FFBD2E' : '#f9f9f9')};
  border-width: 1px;
  border-color: ${props => (props.gender ? '#FFBD2E' : '#eee')};
  border-radius: 40px;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  inputRow: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 40,
  },
});
