FROM node:20-alpine

WORKDIR /app

# Install production deps first for better layer caching.
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY src ./src

# Generated sites + state live here; mount a volume at this path in production.
ENV DATA_DIR=/data
RUN mkdir -p /data

# Default process is the Telegram bot. The preview server overrides the command.
CMD ["node", "src/index.js"]
