import React from 'react';
import { View, StyleSheet, Button, Alert, Platform } from 'react-native';
import { Constants, Notifications, Permissions } from 'expo';


export default class App extends React.Component {

  componentWillMount() {
    this.getiOSNotificationPermission();
    this.listenForNotifications();
  }

  async getiOSNotificationPermission() {
    const { status } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    ); // check permission

    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
  }
  
  listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === 'received' && Platform.OS === 'ios') {
        Alert.alert(this.notificationData().title, this.notificationData().body);
      } // in app alert
    });
  };

  handleSubmit = () => {
    let sendAfterFiveSeconds = Date.now();
    sendAfterFiveSeconds += 3000;
    const schedulingOptions = { time: sendAfterFiveSeconds };

    Notifications.scheduleLocalNotificationAsync(
      this.notificationData(),
      schedulingOptions
    );
  };

  notificationData() {
    const localnotification = {
      title: '로컬 알림 테스트',
      body: '이것은 로컬알림 테스트 입니다... push 를 받고 싶으시면 앱을 끄고 받아주세요.',
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    };
    return localnotification;
  }



  render() {
    return (
      <View style={styles.container}>

        <Button
          title="Please wait 3 Seconds"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
