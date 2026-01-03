import { Plugin } from 'obsidian';
import path from 'path';

export class StorageHandler {
    private plugin: Plugin;
    private basePath: string;

    constructor(plugin: Plugin) {
        this.plugin = plugin;

        // Default storage path inside plugin's data folder
        this.basePath = path.join('data');

        // Ensure folders exist
        this.ensureFolder(this.basePath);

    }

    private async ensureFolder(folderPath: string) {
        try {
            await this.plugin.app.vault.adapter.mkdir(folderPath);
        } catch (e) {
            // Folder might already exist; ignore error
        }
    }

    getEntityCachePath(entityName: string) {
        const cachePath = path.join(this.basePath, entityName, 'cache');
        this.ensureFolder(cachePath); // make sure cache folder exists
        return cachePath;
    }

    getEntityPersistentPath(entityName: string) {
        const persistentPath = path.join(this.basePath, entityName, 'persistent');
        this.ensureFolder(persistentPath); // make sure persistent folder exists
        return persistentPath;
    }







}
