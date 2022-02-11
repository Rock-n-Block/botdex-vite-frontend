import { INetwork } from '@amfi/connect-wallet/dist/interface';

import { chainsEnum, IConnectWallet, IContracts } from 'types';

import { botAbi, factoryAbi, farmsAbi, multicallAbi, pairAbi, routerAbi, stakingAbi } from './abi';

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
  names: ['ROUTER', 'FACTORY', 'PAIR', 'MULTICALL', 'BOT', 'STAKING', 'FARMS'],
  params: {
    ROUTER: {
      mainnet: {
        address: '',
        abi: [],
      },
      testnet: {
        address: '0xb05241134B0974bE957fc56efD6b51dFFb3E74db',
        abi: routerAbi,
      },
    },
    FACTORY: {
      mainnet: {
        address: '',
        abi: [],
      },
      testnet: {
        address: '0x219864AC21AFe9B03386B172cc58334d949cDC88',
        abi: factoryAbi,
      },
    },
    PAIR: {
      mainnet: {
        address: '',
        abi: [],
      },
      testnet: {
        address: '0x92e999CCB3A368678422e5814ABdD177700ccf93',
        abi: pairAbi,
      },
    },
    MULTICALL: {
      mainnet: {
        address: '',
        abi: [],
      },
      testnet: {
        address: '0xf00c47F7FfECAe59E98261A757f6d8Bdf19AE928',
        abi: multicallAbi,
      },
    },
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
    FARMS: {
      mainnet: {
        address: '',
        abi: [],
      },
      testnet: {
        address: '0x61Ea91A4Fe616661bbd949A525e95204eDd99765',
        abi: farmsAbi,
      },
    },
  },
};
