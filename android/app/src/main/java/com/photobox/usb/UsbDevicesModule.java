package com.photobox.usb;

import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
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
    WritableMap map = Arguments.createMap();

    for (Entry<String, UsbDevice> entry : getUsbManager().getDeviceList().entrySet()) {
      String name = entry.getKey();
      UsbDevice device = entry.getValue();

      map.putMap(name, asWritableMap(device));

      promise.resolve(map);
    }
  }

  @ReactMethod
  public void requestUsbPermission(String deviceName, String actionName, Promise p) {

    try {
      UsbDevice device = getUsbManager().getDeviceList().get(deviceName);
      final ReactApplicationContext context = getReactApplicationContext();

      PendingIntent pendingIntent = PendingIntent.getBroadcast(
        context, 0, new Intent(actionName), 0
      );

      registerBroadcastReceiver(actionName, p);

      getUsbManager().requestPermission(device, pendingIntent);
    } catch (Exception e) {
      p.reject(e);
    }
  }

  private UsbManager getUsbManager() {
    return (UsbManager)
      getReactApplicationContext()
        .getSystemService(Context.USB_SERVICE);
  }

  private void registerBroadcastReceiver(String actionName, final Promise p) {
    IntentFilter intFilter = new IntentFilter(actionName);

    final BroadcastReceiver receiver = new BroadcastReceiver() {

      @Override
      public void onReceive(Context context, Intent intent) {

        if (actionName.equals(intent.getAction())) {
          p.resolve(
            intent.getBooleanExtra(UsbManager.EXTRA_PERMISSION_GRANTED, false)
          );
        }

        getReactApplicationContext().unregisterReceiver(this);
      }
    };

    getReactApplicationContext().registerReceiver(receiver, intFilter);

  }

  private WritableMap asWritableMap(UsbDevice device) {
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

    return deviceParams;
  }
}
