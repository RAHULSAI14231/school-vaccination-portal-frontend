# Step 1: Build Angular app
FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build --configuration=production
 
# Step 2: Serve with NGINX
FROM nginx:alpine
COPY --from=build /app/dist/school-vaccination-portal /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf