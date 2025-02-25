import React from 'react';
import Svg, {SvgProps} from 'react-native-svg';

import * as Icons from '@/assets/Icon';

type IconProps = SvgProps & {
  name: keyof typeof Icons;
  size?: number;
  onPress?: () => void;
  color?: string;
};

function Icon({name, size, onPress, color}: IconProps) {
  const SvgIcon = Icons[name];

  return <SvgIcon width={size} height={size} onPress={onPress} color={color} />;
}

export default Icon;
