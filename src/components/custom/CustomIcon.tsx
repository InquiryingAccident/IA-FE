import React from 'react';
import Svg, {SvgProps} from 'react-native-svg';

import * as Icons from '@/assets/Icon';

type IconProps = SvgProps & {
  name: keyof typeof Icons;
  size?: number;
  onPress?: () => void;
};

function Icon({name, size, onPress, ...props}: IconProps) {
  const SvgIcon = Icons[name];

  const iconWidth = size || 24;
  const iconHeight = size || 24;

  const sizeProps = {
    ...(iconWidth !== undefined ? {iconWidth} : {}),
    ...(iconHeight !== undefined ? {iconHeight} : {}),
  };

  return <SvgIcon {...sizeProps} onPress={onPress} />;
}

export default Icon;
