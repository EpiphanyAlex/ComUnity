# Stage 1: Build the React app
FROM node:18-alpine as build
WORKDIR /app

# Copy only package.json and package-lock.json for dependency installation
COPY package*.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code into the container
COPY . .
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the built app from the first stage to Nginx's default directory
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"] 