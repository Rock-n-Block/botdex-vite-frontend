import { INetwork } from '@amfi/connect-wallet/dist/interface';

import { chainsEnum, IConnectWallet, IContracts } from 'types';

import { botAbi, stakingAbi } from './abi';

export const is_production = false;

export const chains: {
  [key: string]: {
    name: chainsEnum;
    network: INetwork;
    provider: {
      [key: string]: any;
    };
    explorer: string;
  };
} = {
  [chainsEnum['Binance-Smart-Chain']]: {
    name: chainsEnum['Binance-Smart-Chain'],
    network: {
      chainID: is_production ? 56 : 97,
      chainName: is_production ? 'Binance Smart Chain' : 'Binance Smart Chain Testnet',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpc: is_production
        ? 'https://bsc-dataseed.binance.org/'
        : 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      blockExplorerUrl: is_production ? 'https://bscscan.com' : 'https://testnet.bscscan.com',
    },
    provider: {
      MetaMask: { name: 'MetaMask' },
    },
    explorer: is_production ? 'https://bscscan.com' : 'https://testnet.bscscan.com',
  },
};

export const connectWallet = (chainName: chainsEnum): IConnectWallet => {
  const chain = chains[chainName];

  return {
    wallets: ['MetaMask'],
    network: chain.network,
    provider: chain.provider,
    settings: { providerType: true },
  };
};

export const contracts: IContracts = {
  type: is_production ? 'mainnet' : 'testnet',
  names: ['BOT', 'STAKING'],
  params: {
    BOT: {
      mainnet: {
        address: '',
        abi: [],
      },
      testnet: {
        address: '0x39c8BAF5CE01F408378e67fDBdbF20F041A37773',
        abi: botAbi,
      },
    },
    STAKING: {
      mainnet: {
        address: '',
        abi: [],
      },
      testnet: {
        address: '0xbafB6B6F7b96e4fc6517D8687181340Bd62e5e55',
        abi: stakingAbi,
      },
    },
  },
};
