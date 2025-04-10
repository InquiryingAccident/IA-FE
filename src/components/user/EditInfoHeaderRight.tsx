import React from 'react';
import HeaderButton from '@/components/custom/HeaderButton';

function EditInfoHeaderRight(onSubmit: () => void) {
  return <HeaderButton labelText="완료" onPress={onSubmit} />;
}

export default EditInfoHeaderRight;
