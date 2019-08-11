import { NativeModules } from 'react-native';

const { UsbDevices } = NativeModules;

export const { getDeviceList } = UsbDevices;
