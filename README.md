# GitHub Labels export import
Originally published by [HidakaRintaro/github-labels-export-import](https://github.com/HidakaRintaro/github-labels-export-import)

## 概要
GitHubのリポジトリに登録されているラベルをエクスポートし、別のリポジトリにインポートすることができます。

## 説明
- インポート先のリポジトリに登録されているラベルは全て削除されます。
- エクスポート元のリポジトリからラベルを取得し、インポート先のリポジトリに登録します。
- GitHubのアクセストークンが必要です。
  - [トークン生成はこちらから](https://github.com/settings/tokens)
  - トークンには`repo`の権限が必要です。
- エクスポート元、インポート先共に、プライベートリポジトリの場合はアクセス権限が必要です。

## 使い方
1. [https://ryota-k0827.github.io/github-labels-export-import-web](https://ryota-k0827.github.io/github-labels-export-import-web)にアクセスします。
2. エクスポート元のリポジトリオーナー名を入力します。（例: `HidakaRintaro`）
3. エクスポート元のリポジトリ名を入力します。（例: `github-labels-export-import`）
4. インポート先のリポジトリオーナー名を入力します。（例: `ryota-k0827`）
5. インポート先のリポジトリ名を入力します。（例: `github-labels-export-import-web`）
6. GitHubのアクセストークンを入力します。
7. `Run`ボタンを押します。
8. `Check the Result`ボタンを押すと、インポート先のリポジトリに登録されているラベルを確認できます。

## LICENSE
[MIT](LICENSE)
