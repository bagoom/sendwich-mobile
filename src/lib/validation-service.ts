import React from 'react';

// 핸드폰번호 유효성 검사
export const mobilevalidate = text => {
  var regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
  return regExp.test(text); // 형식에 맞는 경우 true 리턴
};

//비밀번호 유효성 검사
const checkPassword = e => {
  //  8 ~ 10자 영문, 숫자 조합
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
  // 형식에 맞는 경우 true 리턴
  console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value));
};

// 이메일 유효성 검사
const checkEmail = e => {
  var regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  // 형식에 맞는 경우 true 리턴
  console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value));
};
