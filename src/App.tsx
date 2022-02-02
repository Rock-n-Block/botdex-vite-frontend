import { FC } from 'react';

import { Header, RouterManager } from 'containers';

import WalletConnect from './services/WalletConnect';

const App: FC = () => {
  return (
    <WalletConnect>
      <div className="main_wrapper">
        <div className="page_wrapper">
          <Header />
          <RouterManager />
        </div>
      </div>
    </WalletConnect>
  );
};
export default App;
