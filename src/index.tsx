import * as React from 'react';
import App from './routes/root';
import globalStore, {GlobalStore} from './store/store';
import {StoreProvider} from './store/util';

function Main() {
  return (
    <StoreProvider store={globalStore as GlobalStore}>
      <App />
    </StoreProvider>
  );
}

export default Main;
