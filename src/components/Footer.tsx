import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';

const Footer = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();

  return (
    <>
      <FooterWrap>
        <Text1>주식회사 지오플래닛 대표이사 : 배원규</Text1>
        <Text1>개인정보보호책임자 : 변성윤 (david.kakao@daum.net)</Text1>
        <Text1>사업자등록번호 : 696-86-00824</Text1>
        <Text1>통신판매업 : 제 2020-성남분당-01235호</Text1>
        <Text1>주소 : 경기 성남시 분당구 성남대로 331번길 3-9, 8층</Text1>
        <Text1>고객센터 : 031-718-3737</Text1>
        <Text1>팩스 : 031-718-4343</Text1>
        <Text2>geopanet INc. Right Reserved.</Text2>
      </FooterWrap>
    </>
  );
};

export default observer(Footer);

const FooterWrap = styled.View`
  padding: 30px 16px;
`;
const Text1 = styled.Text`
  font-size: 12px;
  line-height: 20px;
  color: #999;
`;
const Text2 = styled.Text`
  margin-top: 25px;
  font-size: 12px;
  line-height: 19px;
  color: #bbb;
`;
