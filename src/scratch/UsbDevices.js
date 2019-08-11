import { NativeModules } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const { UsbDevices } = NativeModules;

export const { getDeviceList } = UsbDevices;
