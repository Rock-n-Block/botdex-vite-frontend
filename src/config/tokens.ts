import { contracts, is_production } from './index';

import { Token } from 'types';

import NO_LOGO from 'assets/img/icons/empty_token.png';

export const tokens: Record<'bot' | 'fuel' | 'dai' | 'wbnb', Token> = {
  bot: {
    symbol: 'BOT',
    address: contracts.params.BOT[contracts.type].address,
    decimals: 18,
    projectLink: 'https://www.example.com/',
    logoURI: NO_LOGO,
  },
  fuel: {
    symbol: 'FUEL',
    address: is_production ? '' : '0xe9095E4Fb47f7136ab9e65edb92FAfCe044553d3',
    decimals: 18,
    projectLink: 'https://www.example.com/',
    logoURI: NO_LOGO,
  },
  dai: {
    symbol: 'DAI',
    address: is_production ? '' : '0xA520feb43893Cfa59845cdbBCBDdf4f6f991fbB6',
    decimals: 18,
    projectLink: 'https://www.example.com/',
    logoURI: NO_LOGO,
  },
  wbnb: {
    symbol: 'WBNB',
    address: is_production ? '' : '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    decimals: 18,
    projectLink: 'https://www.example.com/',
    logoURI: NO_LOGO,
  },
};
