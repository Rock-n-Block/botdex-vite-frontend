import { FC } from 'react';

import { Footer, Header, RouterManager, Sidebar } from 'containers';

const App: FC = () => {
  return (
    <>
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
    </>
  );
};
export default App;
