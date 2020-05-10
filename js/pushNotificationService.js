import React, {Component} from 'react';
import PushNotification from 'react-native-push-notification';
// var PushNotification = require("react-native-push-notification");

export default class PushController extends Component {
  componentDidMount() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        LocalNotification('titi', 'toto');
      },
      // Android only
      senderID: '874165912511',
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  render() {
    return null;
  }
}

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
