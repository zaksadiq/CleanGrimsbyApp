import React from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';

const createTwoButtonAlert = () =>
    Alert.alert('Add Marker?', 'This will flag litter at your current location.\nPlease only use this if there is litter here.\nFor high volumes of litter, do this multiple times.\nThank you.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Flag Litter', onPress: () => console.log('Flag Litter Pressed')},
    ]);

export default createTwoButtonAlert;