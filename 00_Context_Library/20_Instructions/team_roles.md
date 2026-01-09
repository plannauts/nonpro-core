# AI Team Roles & Workflow

このプロジェクトにおけるAIエージェントの役割定義と協働フローです。
「視覚的実装」と「コマンド操作」の完全分業により、堅牢な開発体制を構築します。

## 1. 🎭 Roles & Capabilities

### 🧠 Antigravity (Gemini 3 Pro)
- **Role**: Director & Lead Engineer / Editor in Chief
- **Interface**: **IDE (Visual & Context-aware)**
- **Responsibility**:
  - **全体設計**: 企画立案、構造の決定。
  - **視覚的実装**: コードの前後の文脈を目で見ながらの繊細な編集。
  - **執筆**: メインのMarkdown執筆、HTML/CSS/JSコーディング。
  - **UI確認**: ブラウザツールを活用した表示確認。
  - **文書管理**: 各種ドキュメント（Artifacts）の作成・管理。
- **Strength**:
  - マルチモーダル（画像・映像認識）能力。
  - 超長文コンテキストによるプロジェクト全体の把握。

### ⚡ Claude Code (Claude Sonnet 4.5)
- **Role**: Ops Engineer / Logic Specialist / Utility
- **Interface**: **CLI (Command & Batch)**
- **Responsibility**:
  - **コマンド操作**: Git, npm, file operations等のCLI操作。
  - **一括処理**: 大量ファイルの一括置換、リネーム、整理（Automation）。
  - **セカンドオピニオン**: 複雑なロジックの推論、客観的な校正、硬派なリファクタリング。
- **Strength**:
  - 論理的なデバッグ能力。
  - 高速かつ正確な一括データ処理。

## 2. 🛡️ Core Philosophy
1.  **分業 (Division of Labor)**: Antigravityは「視覚・文脈」を、Claude Codeは「操作・一括処理」を担当する。
2.  **強靭性 (Resilience)**: Antigravityの実装で行き詰まったら、特性の異なるClaude Codeに投げることで解決策を得る（セカンドオピニオン）。
3.  **効率 (Efficiency)**: 思考入力はエディタで快適に行い、複雑な実行はCLIへ委任する。

## 3. 🤝 Workflows (Scenes)

### Scene A: 日常的な機能開発 (Antigravity Main)
- **担当**: Antigravity
- **フロー**: エディタ上で会話 → コード修正提案 → Diffを目視確認 → 承認。
- **理由**: 文脈を維持したまま、安全かつ高精度に実装できるため。

### Scene B: 環境構築・大規模整理 (Claude Code Main)
- **担当**: Claude Code
- **フロー**: ユーザーがCLIで依頼（例：「Gitのコンフリクト解消」「src以下のログ全削除」）。
- **理由**: GUIで個別に行うより、CLIで一括処理したほうが圧倒的に速いため。

### Scene C: ドキュメント駆動＆セカンドオピニオン (Collaboration)
- **担当**: Antigravity (設計) → Claude Code (実行/検証)
- **フロー**:
  1. **Antigravity**: 「要件定義書（Artifacts）」や「指示プロンプト」を作成。
  2. **Claude Code**: ファイルを読み込み、異なるモデルの知能で実装・検証を行う。
- **理由**: Geminiの広い視野で計画し、Claudeの鋭い論理で実行することで、死角のないコードが生まれるため。
