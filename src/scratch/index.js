import * as Watcher from '../util/Watcher';
import ToastExample from '../util/ToastExample';

export const scratch = async () => {
  const files = await Watcher.showFiles();
  ToastExample.show('return: ' + files.join(', '), ToastExample.SHORT);

  Watcher.addListener(evt => {
    ToastExample.show('event: ' + evt.files.join(', '), ToastExample.LONG);
  });

  Watcher.emit();
};

export default __DEV__ ? scratch : async () => {};
