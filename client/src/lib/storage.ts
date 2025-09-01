export class Storage {
  private static instance: Storage;
  
  static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }
  
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }
  
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }
  
  mergeArrayUnique<T>(
    key: string, 
    newItems: T[], 
    byKeyFn: (item: T) => string
  ): void {
    const existing = this.get<T[]>(key, []);
    const existingKeys = new Set(existing.map(byKeyFn));
    
    const uniqueNewItems = newItems.filter(item => 
      !existingKeys.has(byKeyFn(item))
    );
    
    this.set(key, [...existing, ...uniqueNewItems]);
  }
  
  remove(key: string): void {
    localStorage.removeItem(key);
  }
  
  clear(): void {
    localStorage.clear();
  }
}

export const storage = Storage.getInstance();
