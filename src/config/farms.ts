import { contracts, is_production } from './index';

import { FarmConfig } from 'types';

import { tokens } from './tokens';

export const farms: FarmConfig[] = [
  {
    id: 0,
    lpSymbol: 'BOT',
    lpAddresses: contracts.params.BOT[contracts.type].address,
    token: tokens.fuel,
    quoteToken: tokens.wbnb,
    categoryType: 'core',
  },
  {
    id: 1,
    lpSymbol: 'DAI-WBNB LP',
    lpAddresses: is_production ? '' : '0x92e999CCB3A368678422e5814ABdD177700ccf93',
    token: tokens.dai,
    quoteToken: tokens.wbnb,
    categoryType: 'core',
  },
];
