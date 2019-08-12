import { NativeModules } from 'react-native';

const { UsbDevices } = NativeModules;

const { getDeviceList } = UsbDevices;

export const find = (params) => {
  return getDeviceList(...params)
    .then(devices => ({ data: Object.values(devices) }));
};
