import { FC } from 'react';

import { Footer, Header, RouterManager, Sidebar } from 'containers';

import WalletConnect from './services/WalletConnect';

const App: FC = () => {
  return (
    <WalletConnect>
      <div className="app">
        <div className="bg" />
        <Sidebar />
        <div className="main_wrapper">
          <Header />
          <div className="page_wrapper">
            <RouterManager />
          </div>
        </div>
      </div>
      <Footer />
    </WalletConnect>
  );
};
export default App;
