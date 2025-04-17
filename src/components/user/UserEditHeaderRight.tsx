import React from 'react';
import HeaderButton from '../custom/HeaderButton';

function UserEditHeaderRight(onPress: () => void) {
  return <HeaderButton labelText="저장" onPress={onPress} />;
}

export default UserEditHeaderRight;
