# Use an official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy files to the container
COPY package*.json ./
RUN npm install --only=production

COPY . .

# Expose port 3000 and run the app
EXPOSE 3000
CMD ["npm", "start"]
