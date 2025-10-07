# Repository Guidelines

## プロジェクト構成とモジュール整理
- `manifest.json`: Obsidian がプラグインを認識するためのメタデータ。`version` と `minAppVersion` を更新する際は Obsidian 側の互換性を必ず確認すること。
- `main.js`: esbuild で生成された配布用バンドル。直接編集する場合はバンドラ由来の圧縮表現に注意し、基本は `src/` 以下の TypeScript を別ブランチまたはローカルで編集してから再ビルドする。
- `styles.css`: Gyazo ビューの UI を定義。CSS カスタマイズ時はクラス名の衝突を避けるため `gyazo-` プレフィックスを維持する。
- `data.json`: ランタイム設定のキャッシュ。実際のアクセストークンなど秘匿情報はコミット前にプレースホルダーへ差し替え、履歴に残さない。

## ビルド・テスト・開発コマンド
- TypeScript から再構築する際はローカルで `npm install esbuild obsidian` を実行し、`npx esbuild src/main.ts --bundle --outfile=main.js --format=cjs --platform=node` で配布ファイルを更新する。
- 開発中の即時反映には `npx esbuild src/main.ts --bundle --outfile=main.js --format=cjs --platform=node --watch` を用い、Obsidian の「開発者ツール → Reload app without saving」で再読込する。
- 静的チェックを導入している場合は `npx eslint src --ext .ts` を推奨。設定ファイルが未整備なら `npm init @eslint/config` でテンプレートを作成し、このリポジトリに合わせて厳格化する。

## コーディングスタイルと命名規則
- TypeScript/JavaScript は 2 スペースインデント、セミコロン省略なし、`camelCase` メソッド、`PascalCase` クラスを標準とする。Obsidian API 名は原文のまま。
- CSS は BEM ではなく接頭辞方式を使用し、コンポーネント単位で `.gyazo-element--state` のように修飾子を付与する。
- 翻訳文字列はバンドル内の `ye` マップを利用するため、言語キー追加時は `en` と `ja` をそろえてからビルドする。

## テストガイドライン
- 自動テストは未整備のため、Obsidian v1.6 以降で Gyazo ビューを開き、メディア一覧・詳細・埋め込みコピーの各操作を手動確認する。
- 設定ダイアログの変更時はアクセストークン無し／有り、Preview モードでの表示崩れ、モバイル互換性をシミュレートしてスクリーンショットを残す。
- API レート制限の検証にはテスト用トークンを使用し、失敗レスポンス時のトースト表示とリトライ動作を記録する。

## コミットとプルリクエスト
- コミットは Conventional Commits (`feat:`, `fix:`, `chore:` など) を採用し、`main.js` だけを更新した場合でも元ソースの変更点を本文で説明する。
- PR では概要、再現手順、スクリーンショットまたは Gyazo 動画、既知の制限を明記し、`manifest.json` を更新した場合はバージョンアップ理由を添える。
- シークレットの除去確認 (`git diff data.json`) と Obsidian での動作確認結果をチェックリストとして添付する。

## セキュリティと設定のヒント
- Gyazo API トークンは `data.json` ではなく Obsidian の設定 UI から入力し、コミット前に `npm run clean-config` 等で空文字へリセットするスクリプトを用意すると安全性が高まる。
- 外部コールが失敗した際のログは Obsidian デベロッパーツールのコンソールに出力されるため、個人情報を含むログは共有前に匿名化する。
