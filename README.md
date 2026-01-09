# AI Creative Vault

このリポジトリは、ObsidianとAIエージェント（Google Antigravity / Claude Code）が協働してコンテンツ制作を行うための「第二の脳」兼「制作スタジオ」です。

## 🤖 For AI Agents (Instructions)
このプロジェクトを操作するAIエージェントは、以下のルールを厳守してください。

1. **Context First**: 
   - 作業を開始する際は、必ず `00_Context_Library/` 内の関連する知識や指示書を参照すること。
   - 特に記事作成時は `00_Context_Library/20_Instructions/` 内のプロンプトや、`10_Knowledge/` 内のトーン＆マナーを確認すること。
2. **Structure Compliance**: 
   - 新規ファイルを作成する際は、以下のディレクトリマップに従い、適切な場所に配置すること。迷ったら `10_Inbox/` に置くこと。
3. **YAML Frontmatter**: 
   - コンテンツファイル（.md）を作成する際は、必ず冒頭にメタデータ（status, tags, date等）を付与すること。

---

## 📂 Directory Structure (Map)

### `00_Context_Library/` (The Brain)
ここには「成果物」ではなく「資産（ルール・知識）」のみを格納する。
- **10_Knowledge/**: 会社情報、サービス仕様、用語集。
- **20_Instructions/**: AIへの役割定義、作業プロンプト、チェックリスト。
- **30_Formats/**: JSONスキーマ、スライド雛形、コード規約。

### `10_Inbox/` (Drafts)
- 受信トレイ。整理されていないメモ、AIによる文字起こし生データ、分類前のアイデア。
- AIは、配置場所に迷ったファイルを一時的にここに置くこと。

### `20_Production/` (Studio)
コンテンツ制作のメイン作業場。

- **10_Series/** (連載・企画もの)
  - 構造: `{Series_Name}/Ep{XX}_{Title}/`
  - ルール: シリーズ直下の `00_Planning.md` に全体構成があるため、必ず参照して整合性を取ること。
  
- **20_Singles/** (単発エピソード)
  - 構造: `{Year}/{Year-Month}/{Date}_{Title}/`
  - 用途: 日々のPodcast放送、単発のnote記事など。

### `99_Archives/` (Storage)
- 完了したプロジェクトや、古くなった情報。

---

## 📝 Workflow
1. **企画**: `00_Context_Library` の型を使い、`20_Production` 内にドラフトを作成。
2. **執筆**: Antigravity と共に執筆。画像生成や図解作成もここで行う。
3. **出力**: Claude Code 等を使用し、媒体（note, SNS）に合わせてフォーマット変換して出力。
