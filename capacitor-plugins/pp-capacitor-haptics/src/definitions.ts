export interface PPHapticsPlugin {
	triggerHaptic(): Promise<void>;
}
