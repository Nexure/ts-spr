/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/compiler-types" />

declare namespace spr {
	export type Tweenable =
		| number
		| NumberRange
		| UDim
		| UDim2
		| Vector2
		| Vector3
		| CFrame
		| ColorSequence
		| boolean
		| Color3;

	export type Properties<T extends Instance> = ExtractMembers<WritableInstanceProperties<T>, spr.Tweenable> &
		(T extends PVInstance ? { Pivot: CFrame } : {}) &
		(T extends Model ? { Scale: number } : {});
}

interface spr {
	/**
	 * Animates the given properties towardes the target values,
	 * given damping ratio and undamped frequency.
	 */
	target: <T extends Instance>(
		obj: T,
		dampingRatio: number,
		undampedFrequency: number,
		targetProperties: Partial<spr.Properties<T>>,
	) => void;

	/**
	 * Stops the specified property on an Instance from animating.
	 * If no property is specified, all properties of the Instance
	 * will stop animating.
	 */
	stop: <T extends Instance>(obj: T, property?: keyof spr.Properties<T>) => void;

	/**
	 * Registers a callback function that will be called the next time the instance stops animating. The callback is
	 * only called once. This is useful for tracking instance lifetime, such as destroying a part when it becomes
	 * invisible.
	 */
	completed: <T extends Instance>(obj: T, callback: () => void) => void;
}

declare const spr: spr;
export = spr;
