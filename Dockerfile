# Base on offical Node.js Alpine image
FROM node:14.18.0

# Set working directory
WORKDIR /usr/app

RUN npm i -g npm

# Install PM2 globally
RUN npm install --global pm2

# Setting environment variables
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_BACKEND_IMAGES_URL

ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NEXT_PUBLIC_BACKEND_IMAGES_URL=${NEXT_PUBLIC_BACKEND_IMAGES_URL}

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package.json ./

# Copy all files
COPY ./ ./

# Install dependencies
RUN npm install --production

# Build app
RUN npm run build

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]