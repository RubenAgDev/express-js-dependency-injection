abstract class Database {
  constructor() {}
  abstract newId(value: any): any;
  abstract connect(connectionString: string, dbName: string, appName?: string): Promise<void>;
  abstract close(): Promise<void>;
  abstract query(...args: any[]): Promise<any>;
}

export default Database;
