import Database from './services/DataAccess';
import MongoDBDataAccess from './services/MongoDBDataAccess';

export const database: Database = new MongoDBDataAccess();

export const getDatabase = (): Database => {
  return database;
};
