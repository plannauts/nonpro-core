# Skills - AIペルソナ定義（開発ガイド）

AIエージェント（Antigravity / Claude Code）が特定の専門家として振る舞うためのペルソナ定義ファイル群。

---

## 📋 既存スキル一覧

| ディレクトリ | 役割 | ペルソナ |
|:---|:---|:---|
| `CSO_Strategy/` | 最高戦略責任者 | 戦略思考、ビジネスモデル設計 |
| `CTO_Karpathy/` | 最高技術責任者 | 第一原理思考、バイブコーディング、LLM OS |
| `CCO_Community_Architect/` | 最高コミュニティ責任者 | コミュニティ文化、イベント企画 |
| `CEDO_Editor/` | 最高編集責任者 | 編集力、表現の磨き込み |
| `CLO_Learning_Architect/` | 最高学習責任者 | 学習体験設計、教育理論 |
| `CPO_Cross_Border_Architect/` | 最高パートナーシップ責任者 | 外部連携、越境学習 |
| `CBO_Brand_Architect/` | 最高ブランド責任者 | ブランド哲学、象徴的価値 |
| `myai-manager/` | LLM Wiki運用・構築 | 一次ソース収集、Wikiコンパイル、新規CxO生成 |
| `sounding_board/` | 壁打ち相手 | 傾聴、思考整理支援 |

---

## 🏗️ スキルファイルの構造

各スキルは独立したディレクトリに `SKILL.md` として定義されます。

### ディレクトリ構造

```
skills/
└── [Skill_Name]/
    └── SKILL.md          # スキル定義ファイル
```

### SKILL.md の基本フォーマット

```markdown
# [スキル名]

## Role（役割）
あなたは[役職名]として振る舞います。

## Expertise（専門領域）
- 専門領域1
- 専門領域2
- ...

## Responsibilities（責任範囲）
1. 責任1
2. 責任2
...

## Approach（アプローチ）
- アプローチの特徴1
- アプローチの特徴2
...

## Knowledge Base（参照すべきナレッジ）
このスキルは以下のナレッジを常に参照します：
- `00_Context_Library/10_Knowledge/00_Core/Identity.md`
- ...

## Output Style（出力スタイル）
- 口調や文体の指定
- 出力形式の指定
```

---

## 🆕 新規スキルの作成手順

### 1. ディレクトリを作成

```bash
mkdir .agent/skills/[New_Skill_Name]
```

### 2. SKILL.md を作成

テンプレートを使用してスキル定義を記述します。

```markdown
# [New Skill Name]

## Role
あなたは[具体的な役職名]として振る舞います。

## Expertise
- [専門領域1]
- [専門領域2]

## Responsibilities
1. [責任1]
2. [責任2]

## Approach
- [アプローチの特徴]

## Knowledge Base
- `00_Context_Library/10_Knowledge/...`

## Output Style
- [出力スタイルの指定]
```

### 3. ナレッジベースとの連携

スキルが参照すべき企業知識やビジネスコンテキストを明示的にリンクします。

```markdown
## Knowledge Base
このスキルは以下のドキュメントを常に参照し、整合性を保ちます：
- [Corporate Identity](../../00_Context_Library/10_Knowledge/00_Core/Identity.md)
- [Business Model](../../00_Context_Library/10_Knowledge/01_Business/Business_Model.md)
```

### 4. 動作確認

Antigravity で `@` を入力し、新規スキルが候補に表示されることを確認します。

```
@New_Skill_Name 自己紹介をして
```

---

## ✏️ 既存スキルの修正

1. 対象スキルの `SKILL.md` を編集
2. Antigravity を再起動（スキル定義の再読み込み）
3. 動作確認

---

## 🎯 スキル設計のベストプラクティス

### 1. 役割の明確化
スキルの責任範囲を明確に定義し、他のスキルと重複しないようにします。

### 2. ナレッジベースの活用
企業固有の知識は SKILL.md に直接書かず、`00_Context_Library/` を参照します。

### 3. 一貫性のある口調
スキルごとに異なるペルソナを持たせるため、口調や出力スタイルを明確に指定します。

### 4. 実行可能な出力
抽象的なアドバイスではなく、具体的なアクションアイテムや実行可能な提案を出力するよう設計します。

---

## 🔗 関連ドキュメント

- **エンドユーザー向けスキル説明**: [../.agent/README.md](../README.md)
- **ワークフロー開発ガイド**: [../workflows/README.md](../workflows/README.md)
- **ナレッジベース索引**: [../../00_Context_Library/INDEX.md](../../00_Context_Library/INDEX.md)

---

**Last Updated**: 2026-03-22
**For Developers**: このドキュメントは開発者・保守担当者向けです。
