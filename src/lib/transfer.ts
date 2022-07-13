import React from 'react';

// 핸드폰번호 유효성 검사
export const commaTheNumbers = (number: number) => {
  const data = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return data; // 형식에 맞는 경우 true 리턴
};
