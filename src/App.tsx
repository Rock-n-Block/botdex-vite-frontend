import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import { Footer, Header, RouterManager, Sidebar } from 'containers';

import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer position="bottom-right" theme="dark" hideProgressBar />
    </>
  );
};
export default App;
