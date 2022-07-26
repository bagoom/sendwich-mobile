import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as React from 'react';

import App from './routes/root';
import {Alert} from 'react-native';
import globalStore, {GlobalStore} from './store/store';
import {StoreProvider} from './store/util';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import messaging from '@react-native-firebase/messaging';
const queryClient = new QueryClient();

function Main() {
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

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
