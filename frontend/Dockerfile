# Stage 1: Build the React app
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Add build arguments for environment variables
ARG REACT_APP_API_URL
ARG REACT_APP_BUILD_VERSION
ARG REACT_APP_BUILD_TIME

# Set environment variables
ENV REACT_APP_API_URL=${REACT_APP_API_URL:-/api}
ENV REACT_APP_BUILD_VERSION=${REACT_APP_BUILD_VERSION:-dev}
ENV REACT_APP_BUILD_TIME=${REACT_APP_BUILD_TIME:-0}
ENV NODE_ENV=production

# Generate timestamp if not provided
RUN if [ "$REACT_APP_BUILD_TIME" = "0" ]; then export REACT_APP_BUILD_TIME=$(date +%s) && echo "Build time: $REACT_APP_BUILD_TIME"; fi

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the app's code
COPY . .

# Add version info to index.html to prevent caching
RUN sed -i "s/<head>/<head>\n  <meta http-equiv=\"Cache-Control\" content=\"no-cache, no-store, must-revalidate\" \/>\n  <meta http-equiv=\"Pragma\" content=\"no-cache\" \/>\n  <meta http-equiv=\"Expires\" content=\"0\" \/>\n  <meta name=\"version\" content=\"${REACT_APP_BUILD_VERSION}\" \/>/g" public/index.html

# Create a version file for debugging
RUN echo "Build version: ${REACT_APP_BUILD_VERSION}" > public/version.txt && \
    echo "Build time: ${REACT_APP_BUILD_TIME}" >> public/version.txt && \
    echo "Build date: $(date)" >> public/version.txt

# Build the app
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app from the first stage
COPY --from=build /app/build /usr/share/nginx/html

# Add a custom script to update Nginx configuration at runtime
RUN echo '#!/bin/sh\n\
# Create a dynamic version file\n\
echo "Container started at: $(date)" > /usr/share/nginx/html/runtime-info.txt\n\
echo "Container ID: $(hostname)" >> /usr/share/nginx/html/runtime-info.txt\n\
\n\
# Update Nginx cache control if environment variable is set\n\
if [ -n "$NGINX_CACHE_CONTROL" ]; then\n\
  echo "Setting custom cache control: $NGINX_CACHE_CONTROL"\n\
  sed -i "s/add_header Cache-Control .*;/add_header Cache-Control \"$NGINX_CACHE_CONTROL\";/g" /etc/nginx/conf.d/default.conf\n\
fi\n\
\n\
# Start Nginx\n\
exec nginx -g "daemon off;"\n' > /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Use our custom entrypoint
CMD ["/docker-entrypoint.sh"]