import fs from 'fs';
import path from 'path';

export class JsonDB {
    private filePath: string;

    constructor(filePath: string = 'db.json') {
        this.filePath = path.resolve(process.cwd(), filePath);

        // Initialize the file with an empty object if it doesn't exist
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify({}, null, 2), 'utf-8');
        }
    }

    private readData(): Record<string, any[]> {
        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(fileContent);
    }

    private writeData(data: Record<string, any[]>): void {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    }

    /**
     * Get a reference to a specific collection (like 'users' or 'products')
     * @param collectionName The name of the collection/table
     */
    public collection<T extends { id: string | number }>(collectionName: string) {
        return {
            /** Retrieves all records in the collection */
            getAll: (): T[] => {
                const data = this.readData();
                return (data[collectionName] || []) as T[];
            },

            /** Finds a specific record by its ID */
            getById: (id: string | number): T | undefined => {
                const items = this.collection<T>(collectionName).getAll();
                return items.find(item => item.id === id);
            },

            /** Finds records by a specific field */
            getByField: <K extends keyof T>(field: K, value: T[K]): T[] => {
                const items = this.collection<T>(collectionName).getAll();
                return items.filter(item => item[field] === value);
            },

            /** Inserts a new record into the collection */
            insert: (item: T): T => {
                const data = this.readData();
                if (!data[collectionName]) {
                    data[collectionName] = [];
                }
                data[collectionName].push(item);
                this.writeData(data);
                return item;
            },

            /** Updates an existing record in the collection */
            update: (id: string | number, updates: Partial<T>): T | undefined => {
                const data = this.readData();
                if (!data[collectionName]) return undefined;

                const index = data[collectionName].findIndex(item => item.id === id);
                if (index === -1) return undefined;

                const updatedItem = { ...data[collectionName][index], ...updates };
                data[collectionName][index] = updatedItem;
                this.writeData(data);

                return updatedItem as T;
            },

            /** Deletes a record from the collection */
            delete: (id: string | number): boolean => {
                const data = this.readData();
                if (!data[collectionName]) return false;

                const initialLength = data[collectionName].length;
                data[collectionName] = data[collectionName].filter((item: any) => item.id !== id);

                if (data[collectionName].length !== initialLength) {
                    this.writeData(data);
                    return true; // Deleted successfully
                }
                return false; // Record not found
            }
        };
    }
}