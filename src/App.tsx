import { FC } from 'react';

import { Footer, Header, RouterManager, Sidebar } from 'containers';

import WalletConnect from './services/WalletConnect';

const App: FC = () => {
  return (
    <WalletConnect>
      <Sidebar />
      <div className="main_wrapper">
        <Header />
        <div className="page_wrapper">
          <RouterManager />
        </div>
        <Footer />
      </div>
    </WalletConnect>
  );
};
export default App;
