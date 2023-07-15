import { writable } from 'svelte/store';

export interface PopupData {
    message: string;
    icon?: string;
    lifetime?: number;
    isError?: boolean;
    isWarning?: boolean;
}

export const POPUP_REMOVE_DELAY = 200;

interface PopupManagerProps {
    popups?: { [id: string]: PopupData };
    queue?: string[];
    locked?: boolean;
}
class PopupController {
    readonly queue: string[];
    readonly popups: { [id: string]: PopupData };
    readonly locked: boolean;

    constructor({ popups = {}, queue = [], locked = false }: PopupManagerProps = {}) {
        this.popups = popups;
        this.queue = queue;
        this.locked = locked;
    }

    get currentPopup(): PopupData | null {
        if (!this.locked && this.queue.length > 0) {
            return this.popups[this.queue[0]];
        }

        return null;
    }

    add(id: string, popup: PopupData): PopupController {
        return this.copyWith({
            popups: { [id]: popup, ...this.popups },
            queue: [...this.queue, id],
        });
    }

    remove(id: string): PopupController {
        const data = this.popups[id];
        if (!data) return this;

        const newPopups = Object.fromEntries(
            Object.entries(this.popups).filter((entry) => {
                const [pid] = entry;
                return pid != id;
            })
        );

        const newQueue = this.queue.filter((exisitingID) => exisitingID !== id);

        return this.copyWith({
            popups: newPopups,
            queue: newQueue,
            locked: true,
        });
    }

    unlock(): PopupController {
        return this.copyWith({ locked: false });
    }

    private copyWith({
        popups = this.popups,
        queue = this.queue,
        locked = this.locked,
    }: PopupManagerProps = {}): PopupController {
        return new PopupController({ popups, queue, locked });
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createPopups() {
    const { subscribe, update } = writable<PopupController>(new PopupController());

    return {
        subscribe,
        add: (popup: PopupData): string => {
            let id = 0;
            update((controller) => {
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    const stringID = id.toString();
                    if (!Object.keys(controller.popups).includes(stringID)) {
                        return controller.add(stringID, popup);
                    }
                    id++;
                }
            });

            return id.toString();
        },
        remove: (id: string) => {
            update((controller) => controller.remove(id));
            setTimeout(() => update((controller) => controller.unlock()), POPUP_REMOVE_DELAY + 50);
        },
    };
}

export const Popups = createPopups();
