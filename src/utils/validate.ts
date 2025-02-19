import {errorMessages} from '@/constants';

type UserLoginInfomation = {
  email: string;
  password: string;
};

type UserSignupInformation = {
  email: string;
  password: string;
  nickname: string;
};

function validateLoginUser(values: UserLoginInfomation) {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
}

function validateLogin(values: UserLoginInfomation) {
  return validateLoginUser(values);
}

function validateSignupUser(values: UserSignupInformation) {
  const errors = {
    email: '',
    password: '',
    nickname: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = errorMessages.VALIDATE_EMAIL;
  }
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = errorMessages.VALIDATE_PASSWORD;
  }
  if (!(values.nickname.length >= 2 && values.nickname.length <= 10)) {
    errors.nickname = errorMessages.VALIDATE_NICKNAME;
  }

  return errors;
}

function validateSignup(
  values: UserSignupInformation & {passwordConfirm: string},
) {
  const errors = validateSignupUser(values);
  const signupErrors = {...errors, passwordConfirm: ''};

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = errorMessages.VALIDATE_PASSWORDCONFIRM;
  }

  return signupErrors;
}

// const validateSignup = (values: {
//   email: string;
//   password: string;
//   passwordConfirm: string;
//   nickname: string;
// }) => {
//   const errors: {
//     email: string;
//     password: string;
//     passwordConfirm: string;
//     nickname: string;
//   } = {
//     email: '',
//     password: '',
//     passwordConfirm: '',
//     nickname: '',
//   };

//   if (!values.email) {
//     errors.email = '이메일을 입력해주세요.';
//   }

//   if (!values.password) {
//     errors.password = '비밀번호를 입력해주세요.';
//   }

//   if (values.password !== values.passwordConfirm) {
//     errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
//   }

//   if (!values.nickname) {
//     errors.nickname = '닉네임을 입력해주세요.';
//   }

//   return errors;
// };

export {validateLogin, validateSignup};
