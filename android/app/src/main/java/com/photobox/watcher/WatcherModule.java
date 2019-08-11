package com.photobox.watcher;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class WatcherModule extends ReactContextBaseJavaModule {

  private static final String E_WATCHER_ERROR = "E_WATCHER_ERROR";
  private static final String WATCHER_EVENT = "WATCHER_EVENT";

  public WatcherModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Nullable
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(E_WATCHER_ERROR, E_WATCHER_ERROR);
    constants.put(WATCHER_EVENT, WATCHER_EVENT);
    return constants;
  }

  @Nonnull
  @Override
  public String getName() {
    return "Watcher";
  }

  private WritableMap createEventParams() {
    WritableMap eventParams = Arguments.createMap();
    eventParams.putArray("files", readFilesAsArray());
    return eventParams;
  }

  @ReactMethod
  public void emit(Promise promise) {

    getReactApplicationContext()
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(WATCHER_EVENT, createEventParams());

    WritableMap resolveParams = Arguments.createMap();
    resolveParams.putString("name", WATCHER_EVENT);
    resolveParams.putMap("payload", createEventParams());
    promise.resolve(resolveParams);
  }

  @ReactMethod
  public void showFiles(Promise promise) {
    try {
      promise.resolve(readFilesAsArray());
    } catch (RuntimeException e) { // gotta catchem all
      promise.reject(E_WATCHER_ERROR, e);
    }
  }

  private List<String> readFiles() {
    List<String> files = new ArrayList<>();
    files.add("mockfile0.txt");
    files.add("mockfile1.txt");
    files.add("mockfile2.txt");
    return files;
  }

  private WritableArray readFilesAsArray() {
    WritableArray array = Arguments.createArray();

    for (String filename : readFiles()) {
      array.pushString(filename);
    }

    return array;
  }

}
