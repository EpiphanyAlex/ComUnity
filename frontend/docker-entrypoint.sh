#!/bin/sh
# Create a dynamic version file
echo "Container started at: $(date)" > /usr/share/nginx/html/runtime-info.txt
echo "Container ID: $(hostname)" >> /usr/share/nginx/html/runtime-info.txt

# Update Nginx cache control if environment variable is set
if [ -n "$NGINX_CACHE_CONTROL" ]; then
  echo "Setting custom cache control: $NGINX_CACHE_CONTROL"
  sed -i "s/add_header Cache-Control .*;/add_header Cache-Control \"$NGINX_CACHE_CONTROL\";/g" /etc/nginx/conf.d/default.conf
fi

# Start Nginx
exec nginx -g "daemon off;" 