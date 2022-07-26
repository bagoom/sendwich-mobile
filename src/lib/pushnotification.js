import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const getFCMToken = async () => {
  let fcmtoken = await AsyncStorage.getItem('@sendwich_fcmtoken');
  //   console.log(fcmtoken, 'OLD TOKEN');
  if (!fcmtoken) {
    try {
      let fcmtoken = await messaging().getToken();
      console.log(fcmtoken);
      if (fcmtoken) {
        console.log(fcmtoken, 'NEW TOKEN');
        await AsyncStorage.setItem(`@sendwich_fcmtoken`, fcmtoken);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const notificationListner = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('notification 포그라운드', remoteMessage);
  });
};
