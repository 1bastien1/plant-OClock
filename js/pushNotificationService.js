import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

/**
 *
 * @param {*} bigText notif text when notification is deployed (user open notification bar)
 * @param {*} msg body msg when notification is showed in notification bar (user made nothing) and when notification appear
 */
export const LocalNotification = (bigText, msg) => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText: bigText,
    subText: 'Local Notification Demo',
    title: "PlantO'Clock Notification",
    message: msg,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Voir"]',
  });
};
