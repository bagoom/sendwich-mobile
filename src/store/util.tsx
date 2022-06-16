import React from 'react';
import globalStore, {GlobalStore} from './store';

export const GlobalStoreContext = React.createContext<GlobalStore>(
  globalStore as GlobalStore,
);

export const StoreProvider = ({
  children,
  store,
}: {
  children: any;
  store: GlobalStore;
}) => {
  return (
    <GlobalStoreContext.Provider value={store}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStore = () => React.useContext(GlobalStoreContext);
export const withGlobalStore =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: any) => {
    return <Component {...props} store={useGlobalStore()} />;
  };