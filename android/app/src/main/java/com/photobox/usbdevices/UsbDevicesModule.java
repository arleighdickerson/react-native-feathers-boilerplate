package com.photobox.usbdevices;

import android.content.Context;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import javax.annotation.Nonnull;

public class UsbDevicesModule extends ReactContextBaseJavaModule {

  public UsbDevicesModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Nonnull
  @Override
  public String getName() {
    return "UsbDevices";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    return constants;
  }

  @ReactMethod
  public void getDeviceList(Promise promise) {
    UsbManager manager = (UsbManager)
      getReactApplicationContext()
        .getSystemService(Context.USB_SERVICE);

    WritableMap map = Arguments.createMap();

    for (Entry<String, UsbDevice> entry : manager.getDeviceList().entrySet()) {
      String name = entry.getKey();
      UsbDevice device = entry.getValue();

      WritableMap deviceParams = Arguments.createMap();

      deviceParams.putString("deviceName", device.getDeviceName());
      /*
      map.putString("manufacturerName", device.getManufacturerName());
      map.putString("productName", device.getProductName());
      map.putString("version", device.getVersion());
      map.putString("serialNumber", device.getSerialNumber());
      map.putString("deviceId", device.getDeviceId());
      map.putString("vendorId", device.getVendorId());
      map.putString("productId", device.getProductId());
      map.putString("deviceSubclass", device.getDeviceSubclass());
      map.putString("deviceProtocol", device.getDeviceProtocol());
      */

      map.putMap(name, deviceParams);

      promise.resolve(map);
    }
  }
}
