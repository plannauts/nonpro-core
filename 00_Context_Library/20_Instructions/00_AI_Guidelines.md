# AI Agent Guidelines & Rules

このファイルは、本プロジェクト（Vault）を操作するすべてのAIエージェントが遵守すべき「行動規範」と「実務ルール」を定めたものです。
作業を開始する前に、必ずこのファイルを確認してください。

## 1. 🚨 Core Rules (行動規範)

### Rule 1: Context First
- 作業を開始する際は、必ず **`00_Context_Library/`** 内の関連する知識や指示書を参照してください。
- 特に記事作成時は `20_Instructions/` 内のプロンプトや、`10_Knowledge/` 内のトーン＆マナーを確認すること。
- **「推測するな、参照せよ」** が合言葉です。

### Rule 2: Structure Compliance
- 新規ファイルを作成する際は、後述の **Directory Map** に従い、適切な場所に配置してください。
- 配置場所に迷った場合は、勝手に新規フォルダを作らず、一時的に **`10_Inbox/`** に置いてください（後でClaude Codeが整理します）。

### Rule 3: YAML Frontmatter
- コンテンツファイル（.md）を作成する際は、必ず冒頭にメタデータを付与してください。
- 必須項目: `status`, `tags`, `created_at`

---

## 2. 🗺️ Directory Map (住所録)

### `00_Context_Library/` (The Brain)
ここには「成果物」ではなく「資産（ルール・知識）」のみを格納します。
- **10_Knowledge/**: 会社情報、サービス仕様、用語集。
  - `00_Core/`: システム設計書など、プロジェクトの根幹。
- **20_Instructions/**: **(Current Dir)** AIへの役割定義、作業プロンプト、チェックリスト。
- **30_Formats/**: JSONスキーマ、スライド雛形、コード規約。

### `10_Inbox/` (Drafts)
- 受信トレイ。整理されていないメモ、AIによる文字起こし生データ、分類前のアイデア。

### `20_Production/` (Studio)
コンテンツ制作のメイン作業場です。
- **10_Series/** (連載・企画もの)
  - 構造: `{Series_Name}/Ep{XX}_{Title}/`
  - ルール: シリーズ直下の `00_Planning.md` に全体構成があるため、必ず整合性を取ること。
- **20_Singles/** (単発エピソード)
  - 構造: `{Year}/{Year-Month}/{Date}_{Title}/`

### `30_Projects/` (Long-term)
大学院の授業や長期的な研究開発など、Production（コンテンツ制作）とは異なる長期スパンのプロジェクトを管理します。
- 構造: `{Project_Name}/00_Planning.md` を起点に各ファイルを配置。

### `99_Archives/` (Storage)
- 完了したプロジェクトや、古くなった情報。

---

## 3. 📝 Basic Workflow
1. **Planning**: `00_Context_Library` の型を使い、`20_Production` 内にドラフトを作成。
2. **Execution**: Antigravity と共に執筆。画像生成や図解作成もここで行う。
3. **Review/Ops**: Claude Code がファイル整理やGit操作を行う。
