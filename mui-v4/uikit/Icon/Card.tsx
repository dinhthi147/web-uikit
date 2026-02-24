import React, { memo } from 'react';

import { KColors } from '../../constants';
import KView from '../Container/View';
import KImage from '../Image';
import { MIcon } from '../types';

interface Props {
  icon: MIcon;
  shadow?: boolean;
}

const KIconCard = (props: Props) => {
  const { icon, shadow = true } = props;

  return (
    <KView
      size={36}
      dp="flex"
      center
      background={KColors.blue.normal}
      br="x"
      marginR="1rem"
      style={{
        ...(shadow && {
          filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))'
        })
      }}
    >
      <KImage.MuiIcon icon={icon} color={KColors.white} />
    </KView>
  );
};

KIconCard.displayName = 'KIcon.Card';

export default memo(KIconCard);
