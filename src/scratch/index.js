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

export const runScratch = async () => {
  await usbDevicesExample();
};

const noOp = async () => {};

export default __DEV__ ? runScratch : noOp;
