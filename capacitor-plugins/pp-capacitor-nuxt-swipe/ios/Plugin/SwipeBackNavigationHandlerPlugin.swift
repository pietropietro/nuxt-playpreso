import Foundation
import Capacitor


// EdgeSwipeGestureRecognizer definition
class EdgeSwipeGestureRecognizer: UISwipeGestureRecognizer {
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

    @objc func addSwipeGesture(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let swipeRight = EdgeSwipeGestureRecognizer(target: self, action: #selector(self.respondToSwipeGesture))
            swipeRight.direction = .right
            self.bridge?.getWebView()?.addGestureRecognizer(swipeRight)
            call.resolve()
        }
    }

    @objc func respondToSwipeGesture(gesture: UIGestureRecognizer) {
        if let swipeGesture = gesture as? UISwipeGestureRecognizer {
            switch swipeGesture.direction {
            case .right:
                self.notifyListeners("onSwipeRight", data: [:])
            default:
                break
            }
        }
    }

    @objc public func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        print("Echo method called: \(value)")
        call.resolve([
            "value": value
        ])
    }
    
}
