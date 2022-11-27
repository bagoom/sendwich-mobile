import React, {useState, useEffect} from 'react';
import RNIap, { InAppPurchase, PurchaseError, SubscriptionPurchase, finishTransaction, purchaseErrorListener,purchaseUpdatedListener } from 'react-native-iap';
import { Platform, Alert } from 'react-native';

const itemSkus: any = Platform.select({
  ios: [
    'com.meeting01',
  ],
  android: [
    'com.meeting01',
    'com.meeting02',
  ]
});

const itemSubs: any = Platform.select({
  ios: [
    'com.subscription01',
  ],
  android: [
    'com.subscription01',
  ]
});

export const useShoppingState = () => {
  let purchaseUpdateSubscription: any;
  let purchaseErrorSubscription: any;
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const connection = async () => {
      try {
        const init = await RNIap.initConnection();
        const initCompleted = init === true;
        
        if (initCompleted) {
          if (Platform.OS === 'android') {
            await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
          } else {
            await RNIap.clearTransactionIOS();
          }
        }
        
        // success listener
        purchaseUpdateSubscription = purchaseUpdatedListener(
          async (purchase: InAppPurchase | SubscriptionPurchase) => {
            const receipt = purchase.transactionReceipt ? purchase.transactionReceipt : purchase.purchaseToken;
            
            if (receipt) {
              try {
                setLoading(false);
                const ackResult = await finishTransaction(purchase);
                
                // 구매이력 저장 및 상태 갱신
                if (purchase) {
                  
                }
              } catch(error) {
                console.log('ackError: ', error);
              }
            }
          }
        );
        
        purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
          setLoading(false);
            console.log(error)
          // 정상적인 에러상황 대응
          const USER_CANCEL = 'E_USER_CANCELED';
          if (error && error.code === USER_CANCEL) {
            Alert.alert('구매 취소', '구매를 취소하셨습니다.');
          } else {
            Alert.alert('구매 실패', '구매 중 오류가 발생하였습니다.');
          }
        });
        
        getItems();
        getSubscriptions();
      } catch(error) {
        console.log('connection error: ', error);
      }
    }
    
    connection();
    
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
      
      RNIap.endConnection();
    }
  }, [])
  
  const getItems = async () => {
    try {
      const items = await RNIap.getProducts(itemSkus);
      console.log(items)
      // items 저장
    } catch(error) {
      console.log('get item error: ', error);
    }
  }
  
  const getSubscriptions = async () => {
    try {
      const subscriptions = await RNIap.getSubscriptions(itemSubs);
      console.log(subscriptions)
      // subscriptions 저장
      console.log(subscriptions);
    } catch(error) {
      console.log('get subscriptions error: ', error);
    }  
  }
  
  const requestItemPurchase = async (sku: string) => {
    try {
      RNIap.requestPurchase(sku);
    } catch(error:any) {
      console.log('request purchase error: ', error);
      Alert.alert(error.message);
    }
  }
  
  const requestSubscriptionPurchase = async (sub: string) => {
    try {
      console.log('request purchase error: ', sub);
      RNIap.requestPurchase(sub);
    } catch(error:any) {
      console.log('request purchase error: ', error);
      Alert.alert(error.message);
    }  
  }
  
  return { requestItemPurchase, requestSubscriptionPurchase }
}