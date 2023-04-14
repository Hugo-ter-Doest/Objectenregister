const express = require('express');
const bodyParser = require('body-parser');
const JsonLdObjectStore = require('./JsonLdObjectStore');

const app = express();
const port = 3000;

// Initialize the JSON-LD object store
const store = new JsonLdObjectStore('mongodb://localhost:27017', 'mydb', 'objects');
store.init().then(() => {
  console.log('JSON-LD object store initialized');
}).catch((error) => {
  console.error('Error initializing JSON-LD object store', error);
});

// Parse JSON request bodies
app.use(bodyParser.json());

// Create a new JSON-LD object
app.post('/objects', async (req, res) => {
  try {
    const objectId = await store.createObject(req.body);
    res.status(201).json({ id: objectId });
  } catch (error) {
    console.error('Error creating JSON-LD object', error);
    res.sendStatus(500);
  }
});

// Retrieve a JSON-LD object by ID
app.get('/objects/:id', async (req, res) => {
  try {
    const object = await store.getObject(req.params.id);
    res.json(object);
  } catch (error) {
    console.error(`Error retrieving JSON-LD object with ID ${req.params.id}`, error);
    res.sendStatus(404);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
