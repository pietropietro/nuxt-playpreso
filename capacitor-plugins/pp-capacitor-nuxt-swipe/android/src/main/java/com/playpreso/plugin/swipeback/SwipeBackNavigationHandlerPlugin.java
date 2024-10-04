package com.playpreso.plugin.swipeback;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.util.Log;
import android.view.GestureDetector;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.widget.FrameLayout;
import android.widget.TextView;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "SwipeBackNavigationHandler")
public class SwipeBackNavigationHandlerPlugin extends Plugin {

	private GestureDetector gestureDetector;
	private FrameLayout swipeBackIndicator;

	@Override
	public void load() {
		super.load();
		gestureDetector = new GestureDetector(getContext(), new SwipeGestureListener());
		setupSwipeGesture();
	}

	// Set up swipe gesture on the WebView
	private void setupSwipeGesture() {
		getBridge().getWebView().setOnTouchListener(new View.OnTouchListener() {
			@Override
			public boolean onTouch(View v, MotionEvent event) {
				gestureDetector.onTouchEvent(event);

				// Handle ACTION_UP or ACTION_CANCEL to hide the indicator
				int action = event.getActionMasked();
				if (action == MotionEvent.ACTION_UP || action == MotionEvent.ACTION_CANCEL) {
					hideSwipeBackIndicator();
				}

				// Return false to allow other events (like scrolling) to proceed
				return false;
			}
		});
	}

	// Check if the current view is the homepage
	private boolean isHomepage() {
		// Check if the WebView can go back; if not, it's the homepage
		WebView webView = getBridge().getWebView();
		boolean canGoBack = webView.canGoBack();
		Log.d("SwipeBackNavigation", "Can WebView go back? " + canGoBack);
		return !canGoBack;
	}

	// Show swipe back indicator
	public void showSwipeBackIndicator(View view) {
		// Safely get the root view from the WebView
		View rootView = view.getRootView();

		if (rootView != null) {
			// If swipeBackIndicator exists, remove it
			if (swipeBackIndicator != null && swipeBackIndicator.getParent() != null) {
				((ViewGroup) swipeBackIndicator.getParent()).removeView(swipeBackIndicator);
			}

			// Create the swipe back indicator (rounded corners)
			swipeBackIndicator = new FrameLayout(rootView.getContext());
			FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams(
				dpToPx(50), // Width
				dpToPx(50)  // Height
			);

			// Set the layout parameters and position the indicator on the screen
			layoutParams.gravity = Gravity.CENTER_VERTICAL | Gravity.START;
			layoutParams.leftMargin = dpToPx(16); // Margin from the left edge of the screen
			swipeBackIndicator.setLayoutParams(layoutParams);

			// Style the container (rounded corners)
			GradientDrawable background = new GradientDrawable();
			background.setColor(Color.parseColor("#880000FF")); // Semi-transparent blue background
			background.setCornerRadius(dpToPx(25)); // Half of width/height to make it a circle
			swipeBackIndicator.setBackground(background);

			// Add a visible TextView to indicate swiping (centered and white `<` symbol)
			TextView swipeIndicator = new TextView(rootView.getContext());
			swipeIndicator.setText("<");
			swipeIndicator.setTextSize(30); // Adjust text size as needed
			swipeIndicator.setGravity(Gravity.CENTER); // Center the text within the TextView
			swipeIndicator.setTextColor(Color.WHITE); // White text
			swipeIndicator.setIncludeFontPadding(false); // Remove default font padding
			swipeIndicator.setSingleLine(true); // Ensure single line
			swipeIndicator.setPadding(0, 0, 0, 0); // Remove padding

			// Optionally, set a custom font or typeface if needed
			// Typeface typeface = Typeface.create("sans-serif-medium", Typeface.NORMAL);
			// swipeIndicator.setTypeface(typeface);

			// Set layout parameters for the TextView
			FrameLayout.LayoutParams textLayoutParams = new FrameLayout.LayoutParams(
				FrameLayout.LayoutParams.MATCH_PARENT,
				FrameLayout.LayoutParams.MATCH_PARENT
			);
			textLayoutParams.gravity = Gravity.CENTER; // Center within parent FrameLayout
			swipeIndicator.setLayoutParams(textLayoutParams);

			// Add the TextView to the container
			swipeBackIndicator.addView(swipeIndicator);

			// Add the container to the root view
			if (rootView instanceof ViewGroup) {
				((ViewGroup) rootView).addView(swipeBackIndicator);
				Log.d("SwipeBackNavigation", "Swipe back indicator added to the view.");
			} else {
				Log.e("SwipeBackNavigation", "Root view is not a ViewGroup, cannot add swipe indicator.");
			}
		} else {
			Log.e("SwipeBackNavigation", "Root view is null, unable to show swipe indicator.");
		}
	}

	// Hide the swipe back indicator
	public void hideSwipeBackIndicator() {
		if (swipeBackIndicator != null && swipeBackIndicator.getParent() != null) {
			((ViewGroup) swipeBackIndicator.getParent()).removeView(swipeBackIndicator);
			swipeBackIndicator = null;
			Log.d("SwipeBackNavigation", "Swipe back indicator removed.");
		}
	}

	// Handle swipe gestures
	private class SwipeGestureListener extends GestureDetector.SimpleOnGestureListener {

		private final int SWIPE_THRESHOLD;
		private final int SWIPE_VELOCITY_THRESHOLD;
		private boolean isSwipeFromEdge = false;

		public SwipeGestureListener() {
			SWIPE_THRESHOLD = dpToPx(100);
			SWIPE_VELOCITY_THRESHOLD = dpToPx(100);
		}

		@Override
		public boolean onDown(MotionEvent e) {
			// Reset the flag at the start of each gesture
			isSwipeFromEdge = false;

			// Only start swipe gesture and show indicator if touch is near the left edge
			if (!isHomepage()) {
				int edgeThreshold = dpToPx(30); // Adjust as needed
				if (e.getX() <= edgeThreshold) {
					isSwipeFromEdge = true;
					showSwipeBackIndicator(getBridge().getWebView());
					Log.d("SwipeBackNavigation", "Swipe from edge detected. Indicator shown.");
				} else {
					Log.d("SwipeBackNavigation", "Touch not near the edge. X: " + e.getX());
				}
			} else {
				Log.d("SwipeBackNavigation", "On homepage. Swipe back not allowed.");
			}
			return true; // Return true to indicate that we want to handle touch events
		}

		@Override
		public void onLongPress(MotionEvent e) {
			// Reset the flag if long press occurs
			isSwipeFromEdge = false;
			super.onLongPress(e);
		}

		@Override
		public boolean onSingleTapUp(MotionEvent e) {
			// Reset the flag on single tap up
			isSwipeFromEdge = false;
			return super.onSingleTapUp(e);
		}

		@Override
		public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
			if (!isSwipeFromEdge) {
				return false;
			}

			float diffX = e2.getX() - e1.getX();
			float diffY = e2.getY() - e1.getY();

			if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > SWIPE_THRESHOLD && Math.abs(velocityX) > SWIPE_VELOCITY_THRESHOLD) {
				if (diffX > 0) {
					Log.d("SwipeBackNavigation", "Swipe to the right detected");

					// Check if it's not the homepage
					if (!isHomepage()) {
						JSObject ret = new JSObject();
						ret.put("direction", "right");
						notifyListeners("onSwipeRight", ret);
					}

					hideSwipeBackIndicator(); // Hide indicator after swipe completes
				}
				isSwipeFromEdge = false; // Reset the flag
				return true;
			}
			isSwipeFromEdge = false; // Reset the flag
			return false;
		}

		@Override
		public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY) {
			// Return false to allow scrolling
			return false;
		}
	}

	// Helper method to convert dp to pixels
	private int dpToPx(int dp) {
		float density = getContext().getResources().getDisplayMetrics().density;
		return Math.round((float) dp * density);
	}
}
