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

      deviceParams.putString("manufacturerName", device.getManufacturerName());
      deviceParams.putString("productName", device.getProductName());
      deviceParams.putString("version", device.getVersion());
      deviceParams.putString("serialNumber", device.getSerialNumber());

      deviceParams.putInt("deviceId", device.getDeviceId());
      deviceParams.putInt("vendorId", device.getVendorId());
      deviceParams.putInt("productId", device.getProductId());
      deviceParams.putInt("deviceSubclass", device.getDeviceSubclass());
      deviceParams.putInt("deviceProtocol", device.getDeviceProtocol());

      map.putMap(name, deviceParams);

      promise.resolve(map);
    }
  }
}
