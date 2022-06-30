import styled from 'styled-components/native';

export default {
  color: {
    white: '#FFFFFF',
    black: '#000000',
    point: '#FFBD2E',
  },
  fonts: {
    normal: '14px',
  },
  padding: {
    normal: '16px',
  },
};

export const RegisterContainer = styled.SafeAreaView`
  flex: 1;
`;

export const InputLabel = styled.Text<{type?: string}>`
  width: ${props => (props.type === 'text' ? '80px' : '70px')};
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.03px;
`;

export const Space = styled.View`
  flex: 1;
  height: 7px;
  background: #f9f9f9;
`;

export const Title = styled.Text`
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  letter-spacing: -0.3px;
`;
