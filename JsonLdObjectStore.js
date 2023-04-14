const { MongoClient } = require('mongodb');
const { JsonLdProcessor } = require('jsonld');

class JsonLdObjectStore {
  constructor(dbUrl, dbName, collectionName) {
    this.dbUrl = dbUrl;
    this.dbName = dbName;
    this.collectionName = collectionName;
  }

  async init() {
    this.client = await MongoClient.connect(this.dbUrl);
    this.db = this.client.db(this.dbName);
    this.collection = this.db.collection(this.collectionName);
  }

  async createObject(jsonLdObject) {
    // Convert the JSON-LD object to a regular JavaScript object
    const object = await JsonLdProcessor.toRDF(jsonLdObject, { format: 'application/nquads' });
    const parsedObject = await JsonLdProcessor.fromRDF(object, { format: 'application/nquads' });

    // Store the object in the database
    const result = await this.collection.insertOne(parsedObject);

    return result.insertedId;
  }

  async getObject(id) {
    const objectId = new ObjectId(id);
    const object = await this.collection.findOne({ _id: objectId });

    if (!object) {
      throw new Error(`Object with id ${id} not found`);
    }

    // Convert the object back to JSON-LD format
    const jsonLdObject = await JsonLdProcessor.fromRDF(object, { format: 'application/nquads' });

    return jsonLdObject;
  }

  async close() {
    await this.client.close();
  }
}

module.exports = JsonLdObjectStore;
