package com.playpreso.plugin.haptics;

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

	@PluginMethod
	public void echo(PluginCall call) {
		String value = call.getString("value");  // Get the value from PluginCall

		JSObject ret = new JSObject();           // Create a new JSObject to send back
		ret.put("value", echo(value));           // Call echo method directly
		call.resolve(ret);                       // Send the response back to JavaScript
	}
}
