import React from 'react';

export const commaTheNumbers = (number: number) => {
  const data = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return data; // 형식에 맞는 경우 true 리턴
};
export const commaTheNumbers2 = (text: string) => {
  const data = text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return data; // 형식에 맞는 경우 true 리턴
};

export const convertNumberToMobile = (number: string) => {
  const value = number.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  return value;
};

export const converMeter = (number: number) => {
  let value;
  if (number > 1) {
    value = number.toFixed(1) + 'km';
  } else {
    value = (number * 1000).toFixed(0) + 'm';
  }
  return value;
};

export function sortNestedArrays(obj: any, sortPropertyName: any) {
  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key])) {
      obj[key].sort(
        (a: any, b: any) => a[sortPropertyName] - b[sortPropertyName],
      );
    }

    if (
      !!obj[key] &&
      (typeof obj[key] === 'object' || Array.isArray(obj[key]))
    ) {
      sortNestedArrays(obj[key], sortPropertyName);
    }
  });

  return obj;
}
