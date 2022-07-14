import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import theme, {Title} from '../Theme';
import CounterInput from 'react-native-counter-input';

import {BASE_URL} from '@env';

import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {commaTheNumbers} from '../lib/transfer';

const StoreCartOption = (props: any) => {
  const {route, navigation} = props;
  const g = useGlobalStore();
  const queryClient = useQueryClient();
  const [count, setCount] = useState<number>(1);
  const [price, setPrice] = useState<number>(route.params.price);
  const onHandleCount = (num: number) => {
    if (num > 0) {
      setCount(num);
      setPrice(route.params.price * num);
    }
  };
  const cartCountFetch = useQuery('fetch-cart-count', () =>
    axios(`${BASE_URL}/api/cart/with-store?user_id=${g.sendwichProfile.id}`),
  );

  useEffect(() => {
    return () => {
      cartCountFetch.refetch();
    };
  }, []);

  const mutatePost = useMutation(
    () =>
      axios.post(`${BASE_URL}/api/carts`, {
        data: {
          shop_id: route.params.shop_id,
          user_id: g.sendwichProfile.id,
          menu_name: route.params.menuname,
          count: count,
          price: price,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetch-detail-like');
      },
    },
  );
  return (
    <Wrapper>
      <Container ph0={false}>
        <MenuName>{route.params.menuname}</MenuName>
        <OptionList>
          <Text>가격</Text>
          <Text>{commaTheNumbers(route.params.price)}원</Text>
        </OptionList>
        <OptionList style={{marginBottom: 0, borderBottomWidth: 0}}>
          <Text>수량</Text>

          <CounterInput
            horizontal={true}
            initial={1}
            value={count === 0 ? 0 : count}
            decreaseButtonBackgroundColor={theme.color.point}
            increaseButtonBackgroundColor={theme.color.point}
            onChange={counter => {
              onHandleCount(counter);
            }}
          />
        </OptionList>
        <OptionList
          style={{
            backgroundColor: '#f9f9f9',
            paddingTop: 15,
            borderWidth: 1,
            borderRadius: 4,
          }}>
          <Text>총금액</Text>
          <Text>{commaTheNumbers(price)}원</Text>
        </OptionList>
      </Container>
      <FixedBtnContainer>
        <FixedBtn
          onPress={() => {
            mutatePost.mutate();
            navigation.goBack();
          }}>
          <FixedBtnText>장바구니 담기</FixedBtnText>
        </FixedBtn>
      </FixedBtnContainer>
    </Wrapper>
  );
};

export default observer(StoreCartOption);

const Wrapper = styled.View`
  flex: 1;
`;
const MenuName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

const Text = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #000;
`;

const OptionList = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 8px;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

const Container = styled.View<{ph0?: boolean}>`
  padding: 24px 16px;
`;
const FixedBtnContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
`;

const FixedBtn = styled.TouchableOpacity<{activeNextStack?: boolean}>`
  width: 100%;
  height: 100%;
  background: #ffbd2e;
  justify-content: center;
  align-items: center;
`;
const FixedBtnText = styled.Text<{activeNextStack?: boolean}>`
  color: #000;
  font-size: 14px;
  font-weight: 500;
`;
