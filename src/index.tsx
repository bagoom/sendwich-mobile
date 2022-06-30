import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as React from 'react';

import App from './routes/root';
import globalStore, {GlobalStore} from './store/store';
import {StoreProvider} from './store/util';

function Main() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StoreProvider store={globalStore as GlobalStore}>
        <App />
      </StoreProvider>
    </GestureHandlerRootView>
  );
}

export default Main;
