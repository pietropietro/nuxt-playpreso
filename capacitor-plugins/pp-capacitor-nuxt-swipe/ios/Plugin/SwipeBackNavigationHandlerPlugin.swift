import Foundation
import Capacitor


// EdgeSwipeGestureRecognizer definition
class EdgePanGestureRecognizer: UIPanGestureRecognizer {
    let edgeThreshold: CGFloat = 40.0 // Adjust this value as needed

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent) {
        super.touchesBegan(touches, with: event)

        if let touch = touches.first {
            let location = touch.location(in: self.view)
            if location.x > edgeThreshold {
                self.state = .failed
            }
        }
    }
}

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(SwipeBackNavigationHandlerPlugin)
public class SwipeBackNavigationHandlerPlugin: CAPPlugin {

    var swipeBackIndicator: UIView?


    @objc func addSwipeGesture(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let swipeRight = EdgePanGestureRecognizer(target: self, action: #selector(self.respondToSwipeGesture))

            swipeRight.minimumNumberOfTouches = 1
            swipeRight.maximumNumberOfTouches = 1
            if let webView = self.bridge?.webView {
                webView.addGestureRecognizer(swipeRight)
            }
            call.resolve()
        }
    }
    
    func isHomepage() -> Bool {
        guard let url = self.bridge?.webView?.url else { return false }
        // Check if the URL path is "/" which usually represents the homepage
        return url.path == "/"
    }

    @objc func respondToSwipeGesture(gesture: UIPanGestureRecognizer) {
        
        guard let view = self.bridge?.webView else { return }
        
        // Check if the current view is the homepage
        if isHomepage() {
            return
        }

        let translation = gesture.translation(in: view)
        let progress = translation.x / view.bounds.width

        switch gesture.state {
            case .began:
                showSwipeBackIndicator(in: view)
            case .changed:
                // Update the indicator based on the swipe progress
                updateSwipeBackIndicator(progress)
            case .ended, .cancelled:
            if shouldCompleteSwipe(gesture) {
                    self.notifyListeners("onSwipeRight", data: [:])
                    hideSwipeBackIndicator()
                } else {
                    hideSwipeBackIndicator()
                }
            default:
                break
        }
    }

    func showSwipeBackIndicator(in view: UIView) {
        swipeBackIndicator?.removeFromSuperview()

        // Container view
            let container = UIView(frame: CGRect(x: 10, y: view.bounds.height / 2 - 30, width: 60, height: 60))
            container.backgroundColor = UIColor(red: 0/255, green: 0/255, blue: 102/255, alpha: 1)
            container.layer.cornerRadius = 30
            view.addSubview(container)

            // Arrow label with a top margin
            let topMargin: CGFloat = 5 // Adjust this value as needed
            let indicator = UILabel(frame: CGRect(x: 0, y: topMargin, width: 60, height: 60 - topMargin))
            indicator.text = "<"
            indicator.textColor = .white
            indicator.textAlignment = .center
            if let customFont = UIFont(name: "OCRAStd", size: 20) {
                indicator.font = customFont
            } else {
                indicator.font = UIFont.systemFont(ofSize: 20) // Fallback font
            }            
            indicator.alpha = 0.5 // Starting opacity
            container.addSubview(indicator)

            swipeBackIndicator = container
    }

    func hideSwipeBackIndicator() {
        // Hide and remove the indicator
        swipeBackIndicator?.removeFromSuperview()
        swipeBackIndicator = nil
    }

    func shouldCompleteSwipe(_ gesture: UIPanGestureRecognizer) -> Bool {
        let translation = gesture.translation(in: gesture.view)
        let threshold = (gesture.view?.bounds.width  ?? 0) / 2  // Half the width of the view
        let velocity = gesture.velocity(in: gesture.view).x // Swipe velocity
        // Check both distance swiped and the velocity

        let result = translation.x > threshold && velocity > 400
        return result
    }

    func updateSwipeBackIndicator(_ progress: CGFloat) {
        guard let indicator = swipeBackIndicator?.subviews.first as? UILabel else { return }
        
        let maxFontSize: CGFloat = 30 // Maximum font size for arrow
        let fontSize = 20 + (progress * (maxFontSize - 20)) // Scale font size
        indicator.font = UIFont(name: "OCRAStd", size: fontSize)
        indicator.alpha = 0.5 + progress * 0.5 // Increase opacity with progress
        
    }
    
}
