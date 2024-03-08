# Use the Nginx image from Docker Hub
FROM nginx:alpine

# Copy static content into place.
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]