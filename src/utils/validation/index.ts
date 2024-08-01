import type {ISignInState, ISignUpState} from './types';

export const validateEmail = (email: string): boolean => {
  const regex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/;
  return regex.test(password);
};

export const signInValidation = <T extends ISignInState>(state: T) => {
  const errors: Partial<Record<keyof T, string>> = {};

  if (state.email === '') {
    errors.email = 'Email을 입력해주세요.';
  }
  if (!validateEmail(state.email)) {
    errors.email = '올바른 이메일 주소 형식이 아닙니다.';
  }
  if (state.password === '') {
    errors.password = '비밀번호를 입력해주세요.';
  }
  return errors;
};

export const signUpValidation = <T extends ISignUpState>(state: T) => {
  const errors: Partial<Record<keyof T, string>> = {};

  if (state.email === '') {
    errors.email = 'Email을 입력해주세요.';
  }
  if (!validateEmail(state.email)) {
    errors.email = '올바른 이메일 주소 형식이 아닙니다.';
  }
  if (state.password === '') {
    errors.password = '비밀번호를 입력해주세요.';
  }
  if (!validatePassword(state.password)) {
    errors.password = '영문,숫자,특수문자를 포함, 8자 이상 입력해주세요.';
  }
  return errors;
};
