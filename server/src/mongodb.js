// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import { MongoClient } from 'mongodb'

export const mongodb = (app) => {
  // const connection = app.get('mongodb')
  const connection = process.env.MONGO_URL;
  const database = new URL(connection).pathname.substring(1)
  const mongoClient = MongoClient.connect(connection).then((client) => client.db(database))

  app.set('mongodbClient', mongoClient)
}
