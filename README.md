# API for managing JSON objects specified in JSON-LD

This repository contains code fragments for building an API using Node.js and a NoSQL database, and connecting it to an API gateway for authentication and authorization.

## Components

The repository includes the following components:

* `app.js`: A Node.js application that defines the API endpoints and handles the database interactions.
* `package.json`: A file that lists the dependencies required by the Node.js application.
* `Dockerfile`: A file that defines the Docker image for the Node.js application.
* `README.md`: A file that provides an overview of the repository and its components.

## Setup

To run the API, you'll need to perform the following steps:

1. Install Node.js and Docker on your system.
2. Clone the repository to your local machine.
3. Install the dependencies by running `npm install`.
4. Start the database by running `docker-compose up -d`.
5. Start the API by running `npm start`.
