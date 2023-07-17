# 以下のコマンドを実行してください。

```bash
$ docker compose -f docker-compose.prod.yml up -d

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
