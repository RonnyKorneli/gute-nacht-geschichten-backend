# Use a base image with Node.js and npm
FROM node:18

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which the app is running
EXPOSE 2000

# Specify environment variables (replace with your actual values)


# Start the application
CMD ["npm", "start"]
