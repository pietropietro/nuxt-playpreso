import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(PPHapticsPlugin)
public class PPHapticsPlugin: CAPPlugin {

    @objc func triggerHaptic(_ call: CAPPluginCall) {
        let generator = UIImpactFeedbackGenerator(style: .medium)
        generator.impactOccurred()

        call.resolve()
    }
}
