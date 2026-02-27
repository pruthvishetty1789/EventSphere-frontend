# Use Nginx server
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files
COPY dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose web port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]