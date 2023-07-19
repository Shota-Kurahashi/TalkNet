# 以下のコマンドを実行してください。(環境によって 10 分以上かかる場合があります。)

```bash
$ docker compose -f docker-compose.prod.yml up -d

# prismaのマイグレーションを実行してください。(初回のみ)

$ docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy

# prismaのgenerateを実行してください。(初回のみ)

$ docker compose -f docker-compose.prod.yml exec app npx prisma generate

# prismaのseedを実行してください。(初回のみ)

$ docker compose -f docker-compose.prod.yml exec app npx prisma db seed


# localhost:3000 にアクセスしてください。

open http://localhost:3000

# 終了するときは以下のコマンドを実行してください。

$ docker compose -f docker-compose.prod.yml down
```

### データベースの起動のタイミングによっては、エラーが発生する場合があります。その場合は一度コンテナを停止してから再度起動してください。

```bash
$ docker compose -f docker-compose.prod.yml down

$ docker compose -f docker-compose.prod.yml up -d
```

### 画像投稿のエラーが発生している場合は、以下のコマンドを実行してください。

```bash
$ sh ./createbuckets.sh
```
