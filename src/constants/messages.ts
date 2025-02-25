const alerts = {
  LOCATION_PERMISSION: {
    TITLE: '위치 권한 허용이 필요합니다.',
    DESCRIPTION: '설정 화면에서 위치 권한을 허용해주세요.',
  },
  PHOTO_PERMISSION: {
    TITLE: '사진 권한 허용이 필요합니다.',
    DESCRIPTION: '설정 화면에서 사진 권한을 허용해주세요.',
  },
  CAMERA_PERMISSION: {
    TITLE: '카메라 사용 권한 허용이 필요합니다.',
    DESCRIPTION: '설정 화면에서 카메라 권한을 허용해주세요.',
  },
};

const alerts_ErrorMessage = {
  AUTH_LOGIN: {
    TITLE: '아이디 또는 비밀번호가 정확하지 않습니다.',
    DESCRIPTION: '아이디 또는 비밀번호를 확인해주세요.',
  },
  AUTH_SIGNUP_EMAIL: {
    TITLE: '이미 사용중인 이메일입니다.',
    DESCRIPTION: '다른 이메일을 사용해주세요.',
  },
  AUTH_SIGNUP_NICKNAME: {
    TITLE: '이미 사용중인 닉네임입니다.',
    DESCRIPTION: '다른 닉네임을 사용해주세요.',
  },
};

const errorMessages = {
  UNEXPECTED_ERROR: '알 수 없는 에러가 발생했습니다.',
  CANNOT_GET_ADDRESS: '주소를 알 수 없습니다.',
  VALIDATE_EMAIL: '올바른 이메일 형식이 아닙니다.',
  VALIDATE_PASSWORD: '비밀번호는 8~20자 사이로 입력해주세요.',
  VALIDATE_PASSWORDCONFIRM: '비밀번호가 일치하지않습니다.',
  VALIDATE_NICKNAME: '닉네임은 2~10자 사이로 입력해주세요.',
};

export {alerts, errorMessages, alerts_ErrorMessage};
