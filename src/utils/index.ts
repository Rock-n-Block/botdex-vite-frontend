import BigNumber from 'bignumber.js/bignumber';

export { default as addressWithDots } from './addressWithDots';

export const convertSeconds = (time: number): string => {
  let result = time / 60;
  if (result >= 60) {
    result = Math.ceil(result / 60);
    return `${result} hours`;
  }
  if (result >= 3600) {
    result = Math.ceil(result / 60 / 24);
    return `${result} days`;
  }
  if (result >= 2592000) {
    result = Math.ceil(result / 60 / 24 / 30);
    return `${result} month`;
  }
  return `${result} min`;
};

export const checkValueDecimals = (value: string, decimals: string | number) => {
  const decimalsPlaces = value.toString().split('.')[1] ? value.toString().split('.')[1].length : 0;
  if (decimalsPlaces > +decimals) {
    return new BigNumber(value).toFixed(18, 1);
  }
  return value;
};
