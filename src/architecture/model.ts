import { writable, type Subscriber, type Unsubscriber, type Updater } from 'svelte/store';
import type Entity from './entity';
import type { EntityProps } from './entity';

export default abstract class Model<T extends Entity<EntityProps>> {
    /** Subscribe to value changes. */
    readonly subscribe: (this: void, run: Subscriber<T>, invalidate?: (value?: T) => void) => Unsubscriber;

    /** Replaces the data in the model and notifies subscribers. */
    protected readonly set: (this: void, value: T) => void;

    /** Updates the data in the model using the previous state. */
    private readonly _update: (this: void, updater: Updater<T>) => void;

    /** Unsubscribe to value changes. */
    private readonly unsubscribe: Unsubscriber;

    /** The state of the app. */
    private _state: T;

    /** The state of the app. */
    get state(): T {
        return this._state;
    }

    constructor(initialValue: T) {
        const { subscribe, set, update } = writable(initialValue);
        this.subscribe = subscribe;
        this.set = set;
        this._update = update;

        this._state = initialValue;
        this.unsubscribe = this.subscribe((value: T) => (this._state = value));
    }

    /**
     * Updates the state of the app using the previous value. You can register
     * this update as an undoable action by setting the "registerUndo" flag to
     * true (which is false by default).
     */
    protected update(updater: Updater<T>, callOnUpdate = true): void {
        // Update state
        this._update(updater);
        if (callOnUpdate) {
            // Call onUpdate after the state has been updated
            setTimeout(() => this.onUpdate(this.state), 1);
        }
    }

    /**
     * Wrapper for easy optimistic updating. Provides a "revert" callback that
     * can be used to reset the state and automatically display a message to
     * the user if the state needs to be reverted (for example, if an API call
     * fails).
     */
    protected optimisticallyUpdate(action: (revert: (message?: string) => void) => Promise<void>): Promise<void> {
        const oldState = this.state.copyWith({}) as T;
        const revert = (message?: string): void => {
            this.set(oldState);
            if (message) {
                console.log(message);
            }
        };

        return action(revert);
    }

    /**
     * Notifies all listeners to react without needing to change the current
     * state.
     */
    refresh(): void {
        this.update((state) => state);
    }

    /** Disposes of this model's resources. */
    dispose(): void {
        this.unsubscribe();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    onUpdate(_state: T): void { }
}
