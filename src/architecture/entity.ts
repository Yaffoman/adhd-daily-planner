
export enum FetchState {
    none,
    loading,
    success,
    error,
}


/** Default properties for an entity */
export interface EntityProps {
    fetchState?: FetchState;
}

/**
 * An Entity in the app's architecture is a structured unit of immutable data.
 * Entities themselves usually are created from unstructured data like JSONs.
 * In general, Repositories receive unstructured data, convert them to
 * Entities, then pass them onto the domain layer where they are consumed by
 * models that represent the app's state.
 *
 * Since an Entity almost always originates from the data layer, they have a
 * fetchState property by default.
 *
 * Since an Entity is a unit of immutable data, it needs a simple way to create
 * new state with modified properties of the old state. So it overrides the
 * copyWith function.
 */
export default abstract class Entity<T extends EntityProps> {
    /** The FetchState of the entity from the data source. */
    readonly fetchState: FetchState;

    constructor(fetchState: FetchState = FetchState.none) {
        this.fetchState = fetchState;
    }

    /**
     * Allows incrementable modifications of state on this immutable entity by
     * performing modifications and returning a new version of the state.
     */
    abstract copyWith(params: Partial<T>): Entity<T>;
}
