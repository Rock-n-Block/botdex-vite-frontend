import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider, rootStore } from 'store';

import App from 'App';

import { GetData } from 'services';
import WalletConnect from 'services/WalletConnect';

import 'styles/index.scss';

const root = document.getElementById('root');
const app = (
  <Provider value={rootStore}>
    <WalletConnect>
      <GetData />
      <Router>
        <App />
      </Router>
    </WalletConnect>
  </Provider>
);

ReactDOM.render(app, root);
