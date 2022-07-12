import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as React from 'react';

import App from './routes/root';
import globalStore, {GlobalStore} from './store/store';
import {StoreProvider} from './store/util';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

const queryClient = new QueryClient();

function Main() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StoreProvider store={globalStore as GlobalStore}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />

          <App />
        </QueryClientProvider>
      </StoreProvider>
    </GestureHandlerRootView>
  );
}

export default Main;
