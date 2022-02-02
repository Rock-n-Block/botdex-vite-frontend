import { createContext, FC, useCallback, useContext, useEffect, useMemo, useRef } from 'react';

import { observer } from 'mobx-react-lite';
import { rootStore } from 'store';

import { chains } from 'config';

import { WalletService } from 'services/WalletService';
import { chainsEnum } from 'types';

declare global {
  interface Window {
    ethereum: any;
  }
}

const WalletConnectContext = createContext<{
  connect: (chainName: chainsEnum, providerName: 'MetaMask') => Promise<string>;
  disconnect: () => void;
  walletService: WalletService;
}>({
  connect: async (): Promise<string> => '',
  disconnect: (): void => {},
  walletService: new WalletService(),
});

const Connect: FC = observer(({ children }) => {
  const provider = useRef<WalletService>(
    new WalletService(chains['Binance-Smart-Chain'].network.rpc as string),
  );

  const disconnect = useCallback(() => {
    // USE THIS: delete localStorage.project_name_logged;
    delete localStorage.project_name_logged;
    rootStore.user.disconnect();
  }, []);

  const connect = useCallback(
    async (chainName: chainsEnum, providerName: 'MetaMask') => {
      if (window.ethereum) {
        try {
          const isConnected = await provider.current.initWalletConnect(
            chainName,
            providerName as any,
          );

          if (isConnected.connected) {
            try {
              const { address }: any = await provider.current.getAccount();
              provider.current.setAccountAddress(address);
              rootStore.user.setAddress(address);
              localStorage.project_name_logged = true;

              const eventSubs = provider.current.connectWallet.eventSubscriber().subscribe(
                (res: any) => {
                  if (res.name === 'accountsChanged' && rootStore.user.address !== res.address) {
                    disconnect();
                  }
                },
                (err: any) => {
                  // eslint-disable-next-line no-console
                  console.log(err);
                  eventSubs.unsubscribe();
                  disconnect();
                },
              );
              return address;
            } catch (err: any) {
              console.error('getAccount wallet connect - get user account err: ', err);
              if (!(err.code && err.code === 6)) {
                disconnect();
              }
            }
          }
        } catch (err) {
          console.error(err);
          disconnect();
          throw new Error();
        }
      }
      throw new Error();
    },
    [disconnect, provider],
  );

  const walletConnectValue = useMemo(() => {
    return { connect, disconnect, walletService: provider.current };
  }, [connect, disconnect, provider]);

  useEffect(() => {
    // USE THIS INSTEAD: if (window.ethereum && localStorage.project_name_logged) {
    if (window.ethereum && localStorage.project_name_logged) {
      connect(chainsEnum['Binance-Smart-Chain'], 'MetaMask').then();
    }
  }, [connect, provider.current.connectWallet]);

  return (
    <WalletConnectContext.Provider value={walletConnectValue}>
      {children}
    </WalletConnectContext.Provider>
  );
});
export default Connect;

export const useWalletConnectorContext = () => {
  return useContext(WalletConnectContext);
};
