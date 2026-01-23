# nonpro-core

株式会社プランノーツの「ナレッジベース」兼「AIエージェントリポジトリ」です。
このリポジトリは、プロジェクト参加メンバーおよびAIエージェント（Antigravity / Claude Code）と協働するための「第二の脳」の構造、およびそれを運用するためのエージェント定義を共有・公開するものです。

## 🏛️ Core Concept

このリポジトリは以下の2つの要素で構成されています。

### 1. Company Knowledge (憲法・歴史・アセット)
企業のアイデンティティ、戦略、ブランド資産など、不変的かつ根源的な情報を管理します。
AIエージェントはこれらを「Context（文脈）」として参照し、一貫性のあるアウトプットを生成します。

### 2. AI Agents (頭脳・スキル)
ナレッジを活用し、実務を遂行するAIエージェントの定義ファイルです。
Google Antigravityなどのエージェントが、ここで定義されたペルソナ（CBO, CCO, CEDOなど）に従って活動します。

## 📍 Directory Structure

主な公開ディレクトリは以下の通りです。

### `.agent/`
AIエージェントの「頭脳」にあたる定義ファイル群です。
- **Skills**: 各CXO（最高責任者）クラスのエージェントペルソナ定義。
- **Workflows**: 定型業務の手順書。

### `00_Context_Library/`
エージェントが参照すべき「ルールブック」兼「知識の源泉」です。
- **10_Knowledge**:
    - **00_Core**: 企業の憲法、システム設計、エージェント組織図。
    - **01_Business**: 事業計画、マーケティング戦略。
    - **02_Assets**: ブランド・アセット。

## 🚀 Navigation

AIエージェントおよびコラボレーターは、まず以下のドキュメントを参照してください。

### System Architecture
**👉 [`00_Context_Library/10_Knowledge/00_Core/system_design.md`](00_Context_Library/10_Knowledge/00_Core/system_design.md)**
- 「Headless Obsidian Workflow」のコンセプト
- 人間とAIの役割分担

### Agent Role Architecture
**👉 [`00_Context_Library/10_Knowledge/00_Core/Agent_Role_Architecture.md`](00_Context_Library/10_Knowledge/00_Core/Agent_Role_Architecture.md)**
- 「拡張された経営チーム（Augmented C-Suite）」のコンセプト
- 各エージェント（CSO, CEDO, CCOなど）の役割と責任範囲

---
*Created by Antigravity & User*
