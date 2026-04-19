# AIエージェント定義

このディレクトリは、nonpro-core の「頭脳」であるAIエージェントの定義を管理します。

## 📂 ディレクトリ構造

```
.agent/
├── skills/          # CXOレベルのペルソナ定義
├── workflows/       # 自動化ワークフロー（スラッシュコマンド）
└── tools/           # 実行スクリプト・ツール群
```

---

## 🎭 Skills - AIペルソナ定義

Antigravity / Claude Code が特定の専門家として振る舞うためのペルソナ定義。

### 利用可能なスキル

| スキル名 | 役割 | 専門領域 |
|:---|:---|:---|
| **CSO_Strategy** | 最高戦略責任者 | 戦略立案、ビジネスモデル設計、全体方針 |
| **CMO_Marketing_Architect** | 最高マーケティング責任者 | マーケティング戦略、Noble Heat Framework、施策統括 |
| **CCO_Community_Architect** | 最高コミュニティ責任者 | コミュニティ設計、文化醸成、イベント企画 |
| **CEDO_Editor** | 最高編集責任者 | コンテンツ編集、表現磨き込み、原稿レビュー |
| **CLO_Learning_Architect** | 最高学習責任者 | 学習体験設計、カリキュラム開発、教育プログラム |
| **CPO_Cross_Border_Architect** | 最高パートナーシップ責任者 | 外部連携、越境学習、パートナーシップ構築 |
| **CBO_Brand_Architect** | 最高ブランド責任者 | ブランディング、象徴的価値の定義、理念体現 |
| **UX_Researcher** | UXリサーチャー | UX/UI分析、ヒューリスティック評価、課題発見 |
| **Frontend_Prototyper** | フロントエンドプロトタイパー | 高速UI実装、LP制作、インタラクティブモックアップ |
| **sounding_board** | 壁打ち相手 | アイデアの整理、思考の言語化支援 |

### 使い方（エンドユーザー向け）

Antigravity のチャット欄で `@` を入力し、スキル名の一部（例: `CCO`）を入力すると呼び出せます。

```
@CCO コミュニティイベントの企画について相談したい
```

### 開発ガイド

新規スキルの作成方法や既存スキルの修正については、[skills/README.md](skills/README.md) を参照してください。

---

## ⚙️ Workflows - 自動化ワークフロー

定型業務を自動化するスラッシュコマンド形式のワークフロー。

### 利用可能なワークフロー

| コマンド | 説明 | 主な出力 |
|:---|:---|:---|
| `/init_workspace` | 新規プロジェクト初期化 | Git初期化、README、AGENTS.md、.gitignore |
| `/cxo_summit` | CXO会議の開催 | 各専門家の意見集約、議事録 |
| `/create_event_plan` | イベント企画書の生成 | 企画書、Peatix説明文案 |
| `/create_peatix_page` | Peatixページ作成 | イベントページ用テキスト |
| `/create_slide_draft` | スライド草案の生成 | Markdown形式のスライド案 |
| `/create_event_sns_post` | SNS投稿文の作成 | X、Note、Podcast用投稿文 |
| `/generate_event_header` | ヘッダー画像デザイン指示 | 画像生成AI用プロンプト |
| `/send_event_followup` | イベントフォローアップ | お礼メール、アンケート案内 |

### 使い方（エンドユーザー向け）

Antigravity のチャット欄で `/` を入力すると利用可能なワークフローが表示されます。

```
/create_event_plan "ノンプログラマーのためのAI活用入門"
```

詳細な使い方は [99_Guide/00_Playbook/](../99_Guide/00_Playbook/) を参照してください。

### 開発ガイド

新規ワークフローの作成方法については、[workflows/README.md](workflows/README.md) を参照してください。

---

## 🛠️ Tools - 実行スクリプト・ツール

ワークフローから呼び出される実行スクリプトや、単独で使用できるツール群。

### 利用可能なツール

| ツール名 | 説明 | 言語 |
|:---|:---|:---|
| **slide-generator** | Markdown → Google Slides 変換 | Google Apps Script |
| **image_utils.py** | 画像キャンバス拡張（920x450px） | Python |
| **Slide_Comment_Extractor** | スライドコメント抽出 | (未実装) |

### 使い方（エンドユーザー向け）

各ツールの使い方は [99_Guide/01_Tools/](../99_Guide/01_Tools/) を参照してください。

### 開発ガイド

ツールの技術仕様や開発方法については、[tools/README.md](tools/README.md) を参照してください。

---

## 🔗 関連ドキュメント

- **エンドユーザー向けガイド**: [99_Guide/](../99_Guide/)
- **ナレッジベース**: [00_Context_Library/](../00_Context_Library/)
- **リソース・テンプレート**: [80_Resources/](../80_Resources/)

---

**Last Updated**: 2026-04-19
**Maintained by**: Antigravity & Team
