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
