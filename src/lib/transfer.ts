import React from 'react';

export const commaTheNumbers = (number: number) => {
  const data = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return data; // 형식에 맞는 경우 true 리턴
};
export const commaTheNumbers2 = (text: string) => {
  const data = text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return data; // 형식에 맞는 경우 true 리턴
};
