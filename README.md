# myTreasure

# ローカルでのインストール手順
 とりあえずの、参考に…

1. DB作成
```
psql
CREATE DATABASE my_treasure
```
2. npm install
```
cd frontend
npm install
cd ../backend
npm install
```

3. .envファイル作成
```
//バックエンドディレクトリにいることを確認
touch .env

//ファイル内に下記コードを追加
DB_USER=user
DB_PASSWORD=
DB_NAME=my_treasure
```


4. migrate & seed 実行
```
//backendディレクトリにいることを確認

npm run migrate
npm run seed
```
