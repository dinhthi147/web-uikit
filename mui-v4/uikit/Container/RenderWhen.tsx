/* eslint-disable @typescript-eslint/no-unused-vars */
// Inspired from https://github.com/amit08255/render-when
import React from 'react';

type WhenProps = {
  children: React.ReactNode;
  isTrue?: boolean;
  limit?: number;
};

const RenderWhen = ({ limit = 1, isTrue = true, children }: WhenProps) => {
  const list: React.ReactNode[] = [];

  if (isTrue !== true) {
    return null;
  }

  React.Children.map(children, (child: any) => {
    const { isTrue: isChildTrue } = child?.props || {};

    if (isChildTrue === true && list.length < limit) {
      list.push(child);
    }
  });

  return <>{list}</>;
};

RenderWhen.If = ({ children, isTrue }: any) => children;

export default RenderWhen;
