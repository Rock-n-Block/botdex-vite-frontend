import { ConnectWallet } from '@amfi/connect-wallet';
import { IConnect, IConnectorMessage, IError } from '@amfi/connect-wallet/dist/interface';
import BigNumber from 'bignumber.js/bignumber';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { connectWallet as connectWalletConfig, contracts } from 'config';
import { bep20Abi, erc20Abi } from 'config/abi';

import { chainsEnum } from 'types';

type TokenAbiType = {
  [key in chainsEnum]: Array<AbiItem>;
};

const tokenAbis: TokenAbiType = {
  'Binance-Smart-Chain': bep20Abi as Array<AbiItem>,
  'Ethereum': erc20Abi as Array<AbiItem>,
};

export class WalletService {
  public connectWallet: ConnectWallet;

  public walletAddress = '';

  public contracts: any = {};

  private currentChain: chainsEnum = chainsEnum['Binance-Smart-Chain'];

  constructor(initProvider?: any) {
    this.connectWallet = new ConnectWallet(initProvider);
  }

  public async initWalletConnect(
    chainName: chainsEnum,
    providerName: 'MetaMask' | 'WalletConnect', // ADD PROVIDERS HERE
  ): Promise<IConnectorMessage> {
    return new Promise((resolve) => {
      const { provider, network, settings } = connectWalletConfig(chainName);

      this.connectWallet
        .connect(provider[providerName], network, settings)
        .then((connected: IConnectorMessage) => {
          this.currentChain = chainName;
          resolve(connected);
        });
    });
  }

  public logOut(): void {
    this.connectWallet.resetConect();
  }

  public Web3(): Web3 {
    return this.connectWallet.currentWeb3();
  }

  public getTokenBalance(address: string): Promise<string> {
    const contract = this.connectWallet.getContract({
      address,
      abi: tokenAbis[this.currentChain],
    });

    return contract.methods.balanceOf(this.walletAddress).call();
  }

  public getBalance(address: string): Promise<string | number> {
    return this.connectWallet.getBalance(address);
  }

  public getTokenDecimals(address: string): Promise<string> {
    const contract = this.connectWallet.getContract({
      address,
      abi: tokenAbis[this.currentChain],
    });

    return contract.methods.decimals().call();
  }

  public setAccountAddress(address: string) {
    this.walletAddress = address;
  }

  public getAccount(): Promise<
    | IConnect
    | IError
    | {
        address: string;
      }
  > {
    return this.connectWallet.getAccounts();
  }

  static getMethodInterface(abi: Array<any>, methodName: string) {
    return abi.filter((m) => {
      return m.name === methodName;
    })[0];
  }

  encodeFunctionCall(abi: any, data: Array<any>) {
    return this.Web3().eth.abi.encodeFunctionCall(abi, data);
  }

  async createTransaction({
    method,
    data,
    contract,
    tx,
    to,
    walletAddress,
    value,
  }: {
    method: string;
    data: Array<any>;
    contract: 'STAKING';
    tx?: any;
    to?: string;
    walletAddress?: string;
    value?: any;
  }) {
    const transactionMethod = WalletService.getMethodInterface(
      contracts.params[contract][contracts.type].abi,
      method,
    );

    let signature;
    if (transactionMethod) {
      signature = this.encodeFunctionCall(transactionMethod, data);
    }

    if (tx) {
      tx.from = walletAddress || this.walletAddress;
      tx.data = signature;

      return this.sendTransaction(tx);
    }
    return this.sendTransaction({
      from: walletAddress || this.walletAddress,
      to: to || contracts.params[contract][contracts.type].address,
      data: signature || '',
      value: value || '',
    });
  }

  sendTransaction(transactionConfig: any) {
    return this.Web3().eth.sendTransaction({
      ...transactionConfig,
      from: this.walletAddress,
    });
  }

  async totalSupply(tokenAddress: string, abi: Array<any>, tokenDecimals: number) {
    const contract = this.connectWallet.getContract({ address: tokenAddress, abi });
    const totalSupply = await contract.methods.totalSupply().call();

    return +new BigNumber(totalSupply).dividedBy(new BigNumber(10).pow(tokenDecimals)).toString(10);
  }

  async checkTokenAllowance({
    contractName,
    approvedAddress,
    walletAddress,
    amount,
  }: {
    contractName: string;
    approvedAddress: string;
    walletAddress?: string;
    amount?: string | number;
  }): Promise<{ allowance: boolean; tokenDecimals: string }> {
    try {
      const contract = this.connectWallet.getContract({
        address: approvedAddress,
        // contracts.params[contractName][this.currentChain][contracts.type].address,
        abi: erc20Abi as any,
      });
      const walletAdr = walletAddress || this.walletAddress;

      let result = await contract.methods
        .allowance(
          walletAdr,
          // approvedAddress,
          contracts.params[contractName][contracts.type].address,
        )
        .call();

      const tokenDecimals = await this.getTokenDecimals(approvedAddress);

      result =
        result === '0'
          ? null
          : +new BigNumber(result).dividedBy(new BigNumber(10).pow(tokenDecimals)).toString(10);
      if (result && new BigNumber(result).minus(amount || 0).isPositive()) {
        return { allowance: true, tokenDecimals };
      }
      return { allowance: false, tokenDecimals };
    } catch (error) {
      return { allowance: false, tokenDecimals: '' };
    }
  }

  async approveToken({
    contractName,
    approvedAddress,
    walletAddress,
    approveAmount,
  }: {
    contractName: string;
    approvedAddress?: string;
    walletAddress?: string;
    approveAmount: number;
  }) {
    try {
      const approveMethod = WalletService.getMethodInterface(erc20Abi, 'approve');

      const approveSignature = this.encodeFunctionCall(approveMethod, [
        contracts.params[contractName][contracts.type].address,
        approveAmount.toString(),
      ]);
      return this.sendTransaction({
        from: walletAddress || this.walletAddress,
        to: approvedAddress,
        data: approveSignature,
      });
    } catch (error) {
      return error;
    }
  }

  public async calcTransactionAmount(
    tokenContract: string,
    amount: number | string,
  ): Promise<string> {
    if (amount === '0') {
      return amount;
    }
    const tokenDecimals = await this.getTokenDecimals(tokenContract);
    return new BigNumber(amount).times(new BigNumber(10).pow(tokenDecimals)).toString(10);
  }

  public async weiToEth(
    tokenContract: string,
    amount: number | string,
    float: number | null,
  ): Promise<string> {
    if (amount === '0') {
      return amount;
    }
    const tokenDecimals = await this.getTokenDecimals(tokenContract);
    if (float || float === 0) {
      return new BigNumber(amount)
        .dividedBy(new BigNumber(10).pow(tokenDecimals))
        .toFixed(float)
        .toString();
    }
    return new BigNumber(amount).dividedBy(new BigNumber(10).pow(tokenDecimals)).toString();
  }

  static ethToWei(amount: number | string, decimals = 18): string {
    return new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals)).toString(10);
  }

  static getAddress(contractName: string): string {
    return contracts.params[contractName][contracts.type].address;
  }

  createContract(contractName: string, tokenAddress: string, abi: Array<any>) {
    if (!this.contracts[contractName]) {
      const contract = this.connectWallet.getContract({ address: tokenAddress, abi });
      this.contracts = {
        ...this.contracts,
        [contractName]: contract,
      };
    }
  }

  async callContractMethod({
    contractName,
    methodName,
    data = [],
    contractAddress,
    contractAbi,
  }: {
    contractName: string;
    methodName: string;
    data?: any[];
    contractAddress: string;
    contractAbi: Array<any>;
  }) {
    try {
      if (!this.contracts[contractName] && contractAddress && contractAbi) {
        this.createContract(contractName, contractAddress, contractAbi);
      }

      if (this.contracts[contractName]) {
        const method = this.contracts[contractName].methods[methodName];
        return method(...data).call();
      }
    } catch (err: any) {
      throw new Error(err);
    }
    return new Error(`contract ${contractName} didn't created`);
  }
}
