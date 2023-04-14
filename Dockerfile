# Base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port that the application will listen on
EXPOSE 3000

# Start the application when the container is launched
CMD ["npm", "start"]
