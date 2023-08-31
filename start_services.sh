#!/bin/bash

# Start the product-microservice port 8080
cd product-microservice
yarn start:dev &
cd ..

# Start the web service port 4200
cd web
yarn start &
cd ..

# Start the api service port 3000
cd api
yarn start &
cd ..

echo "All services started in the background."
