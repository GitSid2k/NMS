#!/bin/bash
set -e

echo "=== NMS Web Deployment ==="
echo "Starting at $(date)"

cd /root/nms-web

echo "1. Pulling latest changes from Git..."
git pull origin main

echo "2. Installing dependencies..."
npm install

echo "3. Setting up database..."
npx prisma generate
npx prisma migrate deploy

echo "4. Seeding database (if empty)..."
node prisma/seed.js || true
node prisma/seed-content.js || true
node prisma/seed-projects.js || true

echo "5. Building project..."
npm run build

echo "6. Restarting application..."
pm2 restart nms-web || pm2 start npm --name "nms-web" -- start

echo "7. Checking status..."
pm2 status

echo "=== Deployment completed at $(date) ==="
echo "Site: http://95.81.117.216:3000"
