import * as Watcher from './Watcher';
import ToastExample from './ToastExample';
import * as UsbDevices from './UsbDevices';

async function watcherExample() {
  const files = await Watcher.showFiles();
  ToastExample.show('return: ' + files.join(', '), ToastExample.SHORT);

  Watcher.addListener(evt => {
    ToastExample.show('event: ' + evt.files.join(', '), ToastExample.SHORT);
  });

  Watcher.emit();
}

async function usbDevicesExample() {
  const deviceList = await UsbDevices.getDeviceList();
  console.log(deviceList);
  ToastExample.show(JSON.stringify(deviceList), ToastExample.LONG);
}

const examples = [
  watcherExample,
  usbDevicesExample,
];

export const runScratch = async () => {
  for (let i = 0; i < examples.length; i += 1) {
    await examples[i]();
  }
};

const noOp = async () => {};

export default __DEV__ ? runScratch : noOp;
