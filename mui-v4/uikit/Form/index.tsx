import React, { memo } from 'react';

import { KFormProps } from '../types';

const KForm = (props: KFormProps) => {
  return <form noValidate {...props} />;
};

export default memo(KForm);
