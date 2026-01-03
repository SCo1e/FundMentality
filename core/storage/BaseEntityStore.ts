/**
 * BaseEntityStore
 * ----------------
 * Generic in-memory store backed by a Map.
 *
 * Responsibilities:
 * - Act as the single source of truth for an entity type
 * - Provide fast lookup by ID
 * - Encapsulate mutation of the underlying Map
 *
 * Non-responsibilities:
 * - Persistence
 * - Caching
 * - Cross-entity coordination
 * - Business rules
 */
export abstract class BaseEntityStore<T extends { id: string }> {
    /**
     * Internal map of entities keyed by ID.
     * The reference to the map never changes.
     */
    protected readonly entities: Map<string, T> = new Map();

    /**
     * Add or replace an entity in the store.
     */
    add(entity: T): void {
        this.entities.set(entity.id, entity);
    }

    /**
     * Retrieve an entity by ID.
     */
    get(id: string): T | undefined {
        return this.entities.get(id);
    }

    /**
     * Retrieve multiple entities by their IDs.
     * Missing IDs are ignored.
     */
    getMany(ids: readonly string[]): T[] {
        return ids
            .map(id => this.entities.get(id))
            .filter((e): e is T => e !== undefined);
    }

    /**
     * Remove an entity from the store by ID.
     */
    remove(id: string): void {
        this.entities.delete(id);
    }

    /**
     * Check whether an entity exists.
     */
    has(id: string): boolean {
        return this.entities.has(id);
    }

    /**
     * Get all entities as an array.
     * Useful for dashboards, projections, and views.
     */
    getAll(): T[] {
        return Array.from(this.entities.values());
    }

    /**
     * Number of entities in the store.
     */
    size(): number {
        return this.entities.size;
    }

    /**
     * Clear all entities.
     * Intended for teardown, reloads, or test scenarios.
     */
    clear(): void {
        this.entities.clear();
    }


    //update entity


}
