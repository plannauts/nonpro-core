---
name: myai-manager
description: Management workflows for MyAI (Multi-Persona LLM Wiki) and CxO skills in nonpro-core, including ingesting primary sources, compiling/updating Wiki knowledge bases, running integrity lints, and scaffolding new persona/CxO skill instances. Activate when the user wants to add/ingest sources, recompile or update a persona's wiki, or add a new person/CxO skill.
associated: [Identity.md, Agent_Role_Architecture.md]
---

# MyAI Manager Skill (CxO & Persona Wiki Manager)

本スキルは、**nonpro-coreにおけるマルチペルソナLLM WikiおよびCxOスキル**のナレッジ運用・ペルソナ管理のための統合ワークフローです。
Andrej Karpathyの提唱する **"Stop Retrieving, Start Compiling"** の思想に基づき、一次ソースの完全保存、言語ポリシーに沿ったWikiコンパイル、相互リンク検証、新規CxOスキルの構築を自動化・標準化します。

---

## ワークフロー一覧

1. [Workflow 1: 一次情報インジェスト (Ingest Primary Source)](#workflow-1-一次情報インジェスト-ingest-primary-source)
2. [Workflow 2: Wikiコンパイル・差分更新 (Compile & Lint Wiki)](#workflow-2-wikiコンパイル差分更新-compile--lint-wiki)
3. [Workflow 3: 新規CxO・人物スキルの作成 (Create New CxO Skill / Person)](#workflow-3-新規cxo人物スキルの作成-create-new-cxo-skill--person)

---

## Workflow 1: 一次情報インジェスト (Ingest Primary Source)

ユーザーから「記事を取り込んで」「このURLをソースに追加して」「○○の一次テキストを保存して」と依頼された場合に実行します。

### ステップ
1. **対象スキルの特定**:
   - 対象となるCxOスキル（例: `CTO_Karpathy`, `CLO_Shoin`, `CSO_SunTzu` 等）のディレクトリ（`.agent/skills/<Skill_Name>/`）を特定する。
2. **一次情報の取得 & 原文完全保持**:
   - URLの場合はWebツールやHTTPリクエスト等で全文を取得する。
   - **【最重要】要約・改変・翻訳は一切禁止**。一次情報は将来の再コンパイルにおける「唯一の真実（Source of Truth）」であるため、原文のまま保持する。
3. **ファイル作成 (`.agent/skills/<Skill_Name>/sources/YYYYMMDD_<slug>.md`)**:
   - ファイル名規則: `YYYYMMDD_<英語小文字スネークケース>.md`
   - `./templates/source_template.md` に基づき、必ず冒頭にYAML Frontmatterを付与する。
   ```markdown
   ---
   title: "タイトル"
   source_url: "URLまたは出典書籍名"
   author: "著者・発言者"
   published_date: "YYYY-MM-DD"
   type: "article | video | paper | podcast | book | x_post"
   topics:
     - "Topic1"
     - "Topic2"
   ingested_at: "YYYY-MM-DD"
   compiler_status: "raw | compiled"
   ---
   
   （ここに原文全文をそのまま配置）
   ```
4. **ソースカタログ (`.agent/skills/<Skill_Name>/sources/index.md`) の更新**:
   - カタログのMarkdownテーブルに新しいソースの行を追加する（日付、タイトルへの相対リンク、タイプ、トピック）。
5. **後続アクションの提案 / 実行**:
   - 続けてWikiへのコンパイルを行うかユーザーに確認、または指示に含まれている場合は直ちに [Workflow 2](#workflow-2-wikiコンパイル差分更新-compile--lint-wiki) を実行する。

---

## Workflow 2: Wikiコンパイル・差分更新 (Compile & Lint Wiki)

ユーザーから「Wikiを更新して」「Wikiへコンパイルして」「リコンパイルして」と依頼された場合に実行します。

### ステップ
1. **コンパイル対象言語の確認**:
   - 対象スキルの `AGENTS.md` または `SKILL.md` の言語ポリシーを確認。
   - 海外人物（Karpathy等）は **英語（English）**、日本人（吉田松陰等）や漢文現代語訳（孫子等）は **日本語** で執筆する（一次ソースのニュアンス・言い回し・用語を100%活かすため）。
2. **ナレッジの抽出と分類**:
   - 未コンパイルのソース（`compiler_status: raw`）から、以下の3区分でファイルを生成・更新する。
     - `wiki/concepts/`: 原理・アルゴリズム・メンタルモデル（例: `Software_2_0.md`, `LLM_OS.md`, `Chiko_Goitsu.md`）
     - `wiki/topics/`: 思想・哲学・横断的テーマ（例: `First_Principles_AI.md`, `Stop_Retrieving_Start_Compiling.md`, `Shoka_Sonjuku_Model.md`）
     - `wiki/entities/`: 関連人物・組織・プロジェクト（例: `Li_Fei_Fei.md`, `Shoka_Sonjuku.md`）
3. **高品質なMarkdown編集**:
   - `./templates/concept_template.md` を参考に、第一原理（First Principles）に基づく明晰な構造化を行う。
   - 本人の特徴的なフレーズ（例: *"Become one with the data"*, *"志を立てて以て万事の源と為す"* など）を引用。
   - ソースへの明確な引用・参照リンクを含める。
4. **高密度な相互リンク（Cross-linking）**:
   - 関連する概念同士を相互にリンクする（`[[Software 2.0]](../concepts/Software_2_0.md)` など）。
   - 孤立したページ（Orphan page）を作らない。
5. **MOC (Map of Content) & Log の同期**:
   - `wiki/index.md` の各セクションに新規項目を追加。
   - `wiki/log.md` にタイムスタンプ付きで変更履歴を追記。
   - 対象ソースの `compiler_status` を `compiled` に更新。
6. **整合性検証 (Lint & Verification)**:
   - 新規作成・更新したMarkdown内のすべての内部リンクが実在するか検証する。
   - リンク切れ（Broken link）が0件であることを確認して完了を報告する。

---

## Workflow 3: 新規CxO・人物スキルの作成 (Create New CxO Skill / Person)

ユーザーから「○○のMyAIを作って」「○○のCxOスキルを追加して」と依頼された場合に実行します。

### ステップ
1. **仕様の決定**:
   - スキル名（例: `CLO_Shoin`, `CSO_SunTzu`, `CCO_Adler`, `CPO_Carnegie`）
   - 役職・専門領域・コア哲学・対話トーン
   - 一次ソースの主言語（日本語 / 英語）
2. **ディレクトリの作成**:
   - `.agent/skills/<Skill_Name>/sources/`
   - `.agent/skills/<Skill_Name>/wiki/concepts/`
   - `.agent/skills/<Skill_Name>/wiki/entities/`
   - `.agent/skills/<Skill_Name>/wiki/topics/`
3. **初期ファイルの生成**:
   - `sources/index.md`: ソースカタログ初期ファイル
   - `wiki/index.md`: Map of Content初期ファイル
   - `wiki/log.md`: コンパイルログ初期ファイル
   - `README.md`: プロフィール、思想概要、マイルストーン
   - `AGENTS.md`: `./templates/persona_agents_template.md` を基に、思考トーン・一次言語・運用ルールを記述
   - **`SKILL.md`（Antigravity連携指示書）**:
     - 役職のミッション、ペルソナの哲学、ノンプロ研の憲法（`Identity.md`）との接続、および `./wiki/index.md` を参照するプロトコルを統合して生成する。
4. **管理ファイルの更新**:
   - `.agent/skills/README.md` のスキル一覧テーブルに新しいスキルを追加。
   - 必要に応じて `00_Context_Library/10_Knowledge/00_Core/Agent_Role_Architecture.md` への反映を提案。
5. **完了報告 & 最初のソース受付**:
   - スキャフォールディングの完了を報告し、最初の一次情報（URL、青空文庫テキスト、発言録など）の取り込みをユーザーに促す。

---

## ユーザーからの主な呼び出し指示例

本スキルは、ユーザーの以下のような発話に対して自動的に適用されます：

- **ソース追加・取り込み**:
  - 「このURL（またはテキスト）をカーパシーのソースに追加して」
  - 「松陰先生に新しい手紙のテキストを取り込んでおいて」
- **Wikiコンパイル・更新**:
  - 「カーパシーのWikiをリコンパイルして」
  - 「さっき追加したソースをWikiに反映して」
  - 「リンク切れがないかWikiを検証して」
- **新規CxO・人物スキル作成**:
  - 「吉田松陰のCLOスキルを新しく作って」
  - 「孫子のCSOスキルをセットアップして」
