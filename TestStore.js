const JsonLdObjectStore = require('./JsonLdObjectStore');

const store = new JsonLdObjectStore('mongodb://localhost:27017', 'mydb', 'objects');
await store.init();

// Create a new object
const objectId = await store.createObject({
  "@context": "https://schema.org/",
  "@type": "Person",
  "name": "John Doe",
  "jobTitle": "Software Engineer"
});

// Retrieve the object
const object = await store.getObject(objectId);

console.log(object);

// Close the connection to the database
await store.close();
