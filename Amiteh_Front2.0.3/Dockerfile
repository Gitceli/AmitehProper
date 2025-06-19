# Use an official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose Vite's default port
EXPOSE 5173

# Start development server with host set to 0.0.0.0 to allow external access
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]