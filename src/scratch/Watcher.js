import { NativeModules } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const { Watcher } = NativeModules;

export const addListener = handler => {
  DeviceEventEmitter.addListener(WATCHER_EVENT, handler);
};

export const { showFiles, emit, WATCHER_EVENT } = Watcher;
