type UserInfomation = {
  email: string;
  password: string;
  nickname?: string; //닉네임 정보 추가
};

function validateUser(values: UserInfomation) {
  const errors = {
    email: '',
    password: '',
    nickname: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
}

function validateLogin(values: UserInfomation) {
  return validateUser(values);
}

function validateSignup(
  values: UserInfomation & {passwordConfirm: string; nickname: string},
) {
  const errors = validateUser(values);
  const signupErrors = {...errors, passwordConfirm: ''};

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지않습니다.';
  }

  if (!values.nickname) {
    signupErrors.nickname = '닉네임을 입력해주세요.';
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
