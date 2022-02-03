import { createContext, useContext } from 'react';

import makeInspectable from 'mobx-devtools-mst';
import { Instance, onSnapshot, types } from 'mobx-state-tree';

import { SidebarModel, UserModel } from './Models';

const RootModel = types.model('RootModel', {
  user: UserModel,
  sidebar: SidebarModel,
});

export const rootStore = RootModel.create({
  user: {
    address: null,
  },
  sidebar: {
    isOpen: window.innerWidth >= 1024,
  },
});

makeInspectable(rootStore);

export type RootInstance = Instance<typeof RootModel>;

const RootStoreContext = createContext<RootInstance | null>(null);

export const { Provider } = RootStoreContext;

onSnapshot(rootStore, (snapshot) => {
  console.log(snapshot);
});

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw Error('Store cannot be null, please add a context provider');
  }
  return store;
}

export default rootStore;
