import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * Generic cache manager
 * T = Type of entity stored (e.g., Account, Transaction)
 */
export abstract class BaseCache<T extends { id: string }> {
    protected cache: Map<string, T> = new Map();
    protected abstract fileName: string; // each subclass sets its own file
    protected storageDir: string;

    constructor(storageDir: string) {
        this.storageDir = storageDir;
        this.ensureCacheFile();
        this.loadCache();
    }

    /** Ensure folder and cache file exist */
    private ensureCacheFile() {
        const cacheDir = join(this.storageDir, 'cache');
        if (!existsSync(cacheDir)) mkdirSync(cacheDir, { recursive: true });

        const filePath = join(cacheDir, this.fileName);
        if (!existsSync(filePath)) writeFileSync(filePath, JSON.stringify({}));
    }

    /** Load cache from disk */
    private loadCache() {
        const filePath = join(this.storageDir, 'cache', this.fileName);
        const data = readFileSync(filePath, 'utf-8');
        const parsed: Record<string, T> = JSON.parse(data);
        Object.values(parsed).forEach((item) => this.cache.set(item.id, item));
    }

    /** Persist cache to disk */
    persistCache() {
        const filePath = join(this.storageDir, 'cache', this.fileName);
        const obj: Record<string, T> = {};
        this.cache.forEach((item, id) => (obj[id] = item));
        writeFileSync(filePath, JSON.stringify(obj, null, 2));
    }

    /** CRUD operations */
    get(id: string): T | undefined {
        return this.cache.get(id);
    }

    getAll(): T[] {
        return Array.from(this.cache.values());
    }

    add(item: T) {
        this.cache.set(item.id, item);
        this.persistCache();
    }

    update(id: string, updates: Partial<T>) {
        const item = this.cache.get(id);
        if (!item) return;
        Object.assign(item, updates);
        this.cache.set(id, item);
        this.persistCache();
    }

    remove(id: string) {
        this.cache.delete(id);
        this.persistCache();
    }
}
