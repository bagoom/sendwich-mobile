import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';

import theme, {Title} from '../Theme';
import DetailMenuItem from '../components/DetailMenuItem';

let titleVisible = false;
const DetailMenuList = (props: any) => {
  const {navigation, data, shop_id} = props;
  const g = useGlobalStore();
  return (
    <Wrapper>
      {/* {props.titleVisible && (
        <Container>
          <Title>메뉴</Title>
        </Container>
      )} */}

      {data.map((item: any, key: any) => {
        return (
          <View key={key}>
            {item.category ? (
              <View key={key}>
                <MenuTitle withBorderTop={key === 0 ? true : false}>
                  {item.category}
                </MenuTitle>
                {item.menus.map((menu: any, index: number) => {
                  return (
                    <DetailMenuItem
                      menu={menu}
                      key={index}
                      index={index}
                      shop_id={shop_id}
                    />
                  );
                })}
              </View>
            ) : null}
          </View>
        );
      })}
    </Wrapper>
  );
};

export default observer(DetailMenuList);

const Wrapper = styled.View`
  flex: 1;
  margin-top: 40px;
`;
const Container = styled.View`
  padding: 0 16px;
`;
const MenuTitle = styled.Text<{
  withBorderTop?: boolean;
}>`
  padding: 5px 16px;
  background: #f9f9f9;
  font-size: 14px;
  font-weight: bold;
  color: ${theme.color.dark_yellow};
  border-top-width: ${props => (props.withBorderTop ? '0.7px' : '0')};
  letter-spacing: -0.3px;
  border-bottom-width: 0.7px;
  border-color: #eee;
`;
