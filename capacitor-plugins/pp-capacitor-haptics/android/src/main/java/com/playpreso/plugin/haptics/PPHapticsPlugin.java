package com.playpreso.plugin.haptics;

import android.content.Context;
import android.os.Vibrator;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "PPHapticsPlugin")
public class PPHapticsPlugin extends Plugin {

	// Your echo method that returns a String
	public String echo(String value) {
		Log.i("Echo", value); // Log the value
		return value;         // Return the value as a String
	}

	// Haptic feedback method
	@PluginMethod
	public void triggerHapticFeedback(PluginCall call) {
		Context context = getContext(); // Get the app context
		Vibrator vibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE); // Get Vibrator service

		if (vibrator != null && vibrator.hasVibrator()) {
			vibrator.vibrate(100); // Vibrate for 100 milliseconds
			JSObject ret = new JSObject();
			ret.put("result", "Haptic feedback triggered");
			call.resolve(ret); // Send success response
		} else {
			call.reject("Device does not support vibration");
		}
	}

	// Echo method to send data back
	@PluginMethod
	public void echo(PluginCall call) {
		String value = call.getString("value");  // Get the value from PluginCall

		JSObject ret = new JSObject();           // Create a new JSObject to send back
		ret.put("value", echo(value));           // Call echo method directly
		call.resolve(ret);                       // Send the response back to JavaScript
	}
}
