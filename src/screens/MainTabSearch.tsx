import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import SearchInput from '../components/SearchInput';
import {useNavigation} from '@react-navigation/native';
import theme, {Title} from '../Theme';

const dummy2 = [
  '과메기',
  '고등어',
  '당근잼',
  '과메기',
  '캐비어',
  '떡갈비',
  '주꾸미 볶음',
  '라자냐',
];
const dummy3 = ['우주인피자', '도라지', '캡슐', '떡구이', '허브'];

const MainTabA1Screen = () => {
  const g = useGlobalStore();
  const navigation = useNavigation<any>();

  useEffect(() => {
    g.getPopularKeywordList();
    g.getRecommendKeywordList();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrapper>
        <SearchInput />

        <Container>
          <Title>최근 검색어 </Title>
          <Row>
            {g.recent_keyword.slice().length === 0 && (
              <EmptyText>최근 검색 이력이 없습니다.</EmptyText>
            )}
            {g.recent_keyword.slice().map((item: any, key) => (
              <Round1
                key={key}
                onPress={() => {
                  g.storeFiltering(item.keyword);
                  navigation.navigate('StoreFilterList');
                }}>
                <Round1Text>{item.keyword}</Round1Text>
              </Round1>
            ))}
          </Row>
        </Container>

        <Container>
          <Title>추천 검색어</Title>
          <Row>
            {g.recommendKeywordList.map((item: any, key) => (
              <Round2
                key={key}
                onPress={() => {
                  g.storeFiltering(item.keyword);
                  navigation.navigate('StoreFilterList');
                }}>
                <Round2Text>{item.keyword}</Round2Text>
              </Round2>
            ))}
          </Row>
        </Container>

        <Container>
          <Title style={{marginBottom: 5}}>급상승 검색어</Title>
          <SubTitle>최근 1시간 동안 검색 횟수가 급상승했어요.</SubTitle>
          {g.popularKeywordList.map((item: any, key) => (
            <ListItem
              style={{borderBottomWidth: key === 4 ? 0 : 1}}
              key={key}
              onPress={() => {
                g.storeFiltering(item.keyword);
                navigation.navigate('StoreFilterList');
              }}>
              <Num>{key + 1}</Num>
              <Text>{item.keyword}</Text>
            </ListItem>
          ))}
        </Container>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};

export default observer(MainTabA1Screen);

const Wrapper = styled.ScrollView`
  padding: 16px;
`;

const SubTitle = styled.Text`
  margin-bottom: 10px;
  font-size: 14px;
  letter-spacing: -0.3px;
  color: #999;
`;
const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const Container = styled.View`
  margin-bottom: 30px;
`;
const Round1 = styled.TouchableOpacity`
  margin-right: 6px;
  margin-bottom: 7px;
  padding: 5px 10px;
  border-width: 1px;
  border-color: #eee;
  border-radius: 30px;
`;
const Round1Text = styled.Text`
  font-size: 13px;
  color: #999;
`;
const Round2 = styled.TouchableOpacity`
  margin-right: 6px;
  margin-bottom: 7px;
  padding: 5px 10px;
  border-width: 1px;
  border-color: ${theme.color.point};
  border-radius: 30px;
`;
const Round2Text = styled.Text`
  font-size: 13px;
  color: #000;
`;

const ListItem = styled.TouchableOpacity`
  width: 100%;
  padding: 14px 0;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-style: dashed;
  border-color: #e5e5e5;
`;
const Num = styled.Text`
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
  color: ${theme.color.point};
`;
const Button = styled.TouchableOpacity``;
const Text = styled.Text`
  font-size: 16px;
  color: #000;
  letter-spacing: -0.3px;
`;
const EmptyText = styled.Text`
  font-size: 14px;
  color: #999;
  letter-spacing: -0.3px;
`;
