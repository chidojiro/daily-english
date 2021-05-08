import { prefixCls } from '../constants';

export const splitCustomClassName = (className: string) => {
  const classNames = className.split(' ');

  const [customClassNames, restClassNames] = classNames.reduce(
    (acc, cur) => {
      if (cur.includes(prefixCls)) {
        return [[...acc[0], cur], acc[1]];
      }

      return [acc[0], [...acc[1], cur]];
    },
    [[] as string[], [] as string[]],
  );

  return [customClassNames.join(' '), restClassNames.join(' ')];
};
