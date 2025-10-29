import { useState, useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export function usePermissions() {
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);

  async function requestPermissions() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone for voice commands',
            buttonPositive: 'OK',
          }
        );
        const grantedBool = granted === PermissionsAndroid.RESULTS.GRANTED;
        setMicPermissionGranted(grantedBool);
        return grantedBool;
      } else if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.MICROPHONE);
        const grantedBool = result === RESULTS.GRANTED;
        setMicPermissionGranted(grantedBool);
        return grantedBool;
      }
      setMicPermissionGranted(false);
      return false;
    } catch (err) {
      setMicPermissionGranted(false);
      return false;
    }
  }

  useEffect(() => {
    requestPermissions();
  }, []);

  return {
    micPermissionGranted,
    requestPermissions,
  };
}
