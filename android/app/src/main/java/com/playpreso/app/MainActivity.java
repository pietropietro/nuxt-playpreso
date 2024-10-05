package com.playpreso.app;

import android.os.Bundle;
import android.util.Log;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		try {
			// Check if FirebaseApp is already initialized, avoid reinitializing
			if (FirebaseApp.getApps(this).isEmpty()) {
				FirebaseApp.initializeApp(this);  // Initialize Firebase
				Log.i("FirebaseInit", "Firebase initialized successfully.");
			}
		} catch (Exception e) {
			Log.e("FirebaseInitError", "Error initializing Firebase: " + e.getMessage());
		}
	}
}
