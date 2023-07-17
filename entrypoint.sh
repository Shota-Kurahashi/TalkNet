#!/bin/sh
set -e

# MySQLデータベースが起動し、接続を受け付ける準備ができるのを待つ
echo "Waiting for MySQL..."
while ! nc -z db 3306; do
  sleep 1
done
echo "MySQL is up - executing command"

# Prismaのマイグレーションを実行
npx prisma migrate deploy

npx prisma generate

# Prismaのシードを実行
npx prisma db seed

# アプリケーションを起動
npm run start
