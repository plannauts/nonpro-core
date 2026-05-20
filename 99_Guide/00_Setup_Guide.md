# チーム開発環境構築・オンボーディングガイド

ノンプロ研の開発プロジェクト（`nonpro-core` および各個別プロジェクト）に参加するための環境構築手順です。
本プロジェクトでは、「AIファースト」な開発を推進するため、専用クライアントとCLIツールの利用を推奨しています。

## 1. 開発ツールのインストール (Windows/Mac共通)

以下の4つのツールを順にインストール・セットアップしてください。

### [1] Antigravity IDE のインストール
AIエージェントを統合した統合開発環境（IDE）です。
- **入手方法**: [https://antigravity.google/](https://antigravity.google/) から「Antigravity IDE」をダウンロードしてインストールしてください。
- **備考**: VS Codeベースのエディタとして動作します。既存のVS Code設定を引き継ぐことも可能です。
- **重要 (ログイン認証)**: インストール完了後、**IDE内でGoogleアカウントにログイン（認証）を済ませてください**。これは後述する「Antigravity CLI」を動作させるための必須前提条件となります。

### [2] Node.js のインストール
本プロジェクト共通の管理ツール（安全装備など）の実行に必要です。
- **入手方法**: [公式サイト](https://nodejs.org/) から「LTS（推奨版）」をダウンロードしてインストールしてください。
- **備考**: 後述する「Antigravity CLI」の動作自体はNode.jsなしでも動きますが、プロジェクト全体の安全な運用のために必ずインストールしてください。

### [3] AI CLIツールの導入
ターミナルからAIを活用するためのCLIツールです。

- **Antigravity CLI**
  - Google製のターミナル向けAI CLIツール（旧Gemini CLIの後継）です。
  - **Windows (PowerShell) 推奨インストールコマンド**:
    ```powershell
    irm https://antigravity.google/cli/install.ps1 | iex
    ```
  - **macOS / Linux 推奨インストールコマンド**:
    ```bash
    curl -fsSL https://antigravity.google/cli/install.sh | bash
    ```
  - **代替のインストール方法 (npm)**:
    ```bash
    npm install -g @google/antigravity-cli
    ```
  - **起動コマンド**:
    ```bash
    agy
    ```

- **Claude Code**
  - Anthropic製のAIコーディングアシスタントです。
  - インストールコマンド:
    ```bash
    npm install -g @anthropic-ai/claude-code
    ```

### [4] Git / GitHub のセットアップ (AI CLIを活用)
AI CLIを使って、対話的にセットアップを進めます。以下の通りに依頼してみてください。

#### 1. Gitのインストール
ターミナルで `agy` (または `claude`) を起動し、以下のように入力します。

> **依頼プロンプト**:
> 「WindowsでGitをインストールして」
> (Macの場合は homebrew経由を依頼)

AIは、以下のようなコマンドを提案・実行します。
- **Windows**: `winget install --id Git.Git -e --source winget` など
- **Mac**: `brew install git`

#### 2. GitHubの初期設定
インストール完了後、続けて以下のように依頼します。

> **依頼プロンプト**:
> 「Gitのユーザー名とメールアドレスを設定して。ユーザー名は [あなたの名前]、メールは [あなたのメールアドレス] で」

AIが実行するコマンド:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 3. GitHub認証（SSH設定など）
最後に、GitHubとの連携設定を依頼します。

> **依頼プロンプト**:
> 「GitHubに接続するためのSSH鍵を作成して、GitHubに登録する手順を教えて（もしくはghコマンドでログインして）」

AIが案内する手順の例:
1. `ssh-keygen` コマンドで鍵を作成
2. 公開鍵 (`.pub`ファイル) の内容を表示
3. GitHubの設定ページに貼り付けるよう案内

※ うまくいかない場合は、以下のリンクから手動で設定してください。
- [Git for Windows](https://gitforwindows.org/)
- [GitHub公式サイト](https://github.co.jp/) (アカウント名: `miyakoda-system` などを管理者に連絡)

#### 4. 安全装備（セーフティギア）の設定 【必須】
共同開発において、誤って `main` ブランチに直接プッシュしてしまうのを防ぐための「安全装備」を導入します。一度設定すれば、plannauts組織のすべてのプロジェクト（Sandboxや個別プロジェクト）に自動的に適用されます。

1. **インストール**
   ターミナルで以下のコマンドを順に実行してください（`nonpro-core` フォルダに移動して実行します）。
   ```bash
   cd nonpro-core
   npm run protect-main
   ```
   ※AIに「セーフティギアをインストールして」と依頼して実行してもらうことも可能です。

2. **設定の確認**
   正しく設定されたか、以下のコマンドで確認してください。
   ```bash
   npm run check-protection
   ```
   **「✅ 状態: 有効 (Active)」** と表示されれば完了です。

設定後は、`main` ブランチへ直接プッシュしようとした際にエラーが表示され、自動的にブロックされるようになります。

---

## 2. プロジェクトへの参加手順

環境構築が完了したら、以下の手順でプロジェクトに参加してください。

### ステップ1: ワークスペースの作成
任意の場所に作業用フォルダ（例: `nonpro-projects`）を作成し、その中で作業を行います。

### ステップ2: リポジトリのクローン (`nonpro-core` / パブリック)
本プロジェクトでは、共通基盤である `nonpro-core` が全ドキュメントの中核となります。まずはこれをクローンします。（パブリックリポジトリのため、誰でもすぐに可能です）
ターミナルで作業フォルダに移動し、`agy` (または `claude`) を起動して依頼します。

> **依頼プロンプト**:
> 「GitHubから `plannauts/nonpro-core` をこのフォルダにクローンして」

AIが実行するコマンド:
```bash
git clone https://github.com/plannauts/nonpro-core.git
```
※ SSH接続を設定済みの場合は、AIが自動的に `git@github.com:...` 形式を選択してくれます。

### ステップ3: 練習用リポジトリ (`nonpro-sandbox`) への参加とクローン
実際のプロジェクトに入る前に、体験用リポジトリ `nonpro-sandbox` を使って、チーム開発の一連の流れを練習します。

1. **アクセス権限をもらう**
   Slack等で管理者（タカハシさん）にGitHubのアカウント名（例: `miyakoda-system`）を伝え、`nonpro-sandbox` への招待を依頼してください。
2. **招待を承認する**
   GitHubから招待メールが届く、または [GitHubのNotifications](https://github.com/notifications) に招待が届くので、**"Accept invitation"** をクリックして参加を承認します。
3. **リポジトリのクローン**
   再度ターミナルを開き、AI（agy または claude）に以下のように依頼して `nonpro-core` と同じ階層にクローンします。

> **依頼プロンプト**:
> 「続けて、GitHubから `plannauts/nonpro-sandbox` のリポジトリをクローンして」

実行されるコマンド例: `git clone https://github.com/plannauts/nonpro-sandbox.git`

### ステップ4: Antigravity IDE でワークスペースを作成する
必要なリポジトリ（`nonpro-core` と `nonpro-sandbox`）が揃ったら、Antigravity IDEで「マルチルートワークスペース」を作成して一つにまとめます。

1. Antigravity IDE を起動し、`File` > `Open Folder...` で `nonpro-sandbox` フォルダを開く。
2. `File` > `Add Folder to Workspace...` を選択し、`nonpro-core` フォルダを追加する。
3. `File` > `Save Workspace As...` を選択し、`nonpro-sandbox.code-workspace` として保存する。

以降は、この `.code-workspace` ファイルを開くことで、両方のリポジトリが読み込まれた状態で作業を開始できます。

### ステップ5: Antigravity IDE のセキュリティ設定
安全に開発を行うため、以下のガイドラインに従ってセキュリティ設定を確認してください。
- [Antigravity セキュリティ・プライバシー 利用ガイドライン](./01_Security_Guidelines.md)

特に Antigravity IDE の **Settings** 画面で以下の点を確認しましょう:
- `Account > Enable Telemetry`: **OFF** (推奨)
- `Agent > Terminal Command Auto Execution`: **Request Review** (推奨)

---

## 3. 動作確認 (Skill Verification)
環境構築ができたら、`nonpro-core` のAIスキルが正しく読み込まれているか確認しましょう。
Antigravity IDEのチャット欄で **`@`** (アットマーク) を入力すると、利用可能なスキルの一覧が表示されます。

> **依頼プロンプト**:
> 「`@CCO` と入力して候補から `nonpro-core/CCO_Community_Architect` を選択し、『簡単な自己紹介をして』と依頼」

CCO（最高コミュニティ責任者）として振る舞うAIから応答があれば、設定は成功です！

#### 利用可能なAIスキル一覧
本プロジェクトでは、以下の専門家AI（ペルソナ）を呼び出して相談できます。
チャット欄で `@` の後に名前の一部（例: `CBO`）を入力すると素早く呼び出せます。

- **`@.../CCO_Community_Architect`**: コミュニティ設計、文化醸成、イベントの空気を読む。
- **`@.../CBO_Brand_Architect`**: ブランディング、コミュニティの「魂」や象徴的価値の定義。
- **`@.../CEDO_Editor`**: 編集・表現、記事や原稿のレビュー。
- **`@.../CLO_Learning_Architect`**: 学習体験のデザイン、カリキュラム設計。
- **`@.../CPO_Cross_Border_Architect`**: パートナーシップ、外部連携、越境学習。
- **`@.../CSO_Strategy`**: 戦略立案、全体方針の壁打ち。

---

## 4. Sandboxを用いたGit/GitHub体験 (チュートリアル)

Antigravity IDEとワークスペースの準備が整ったら、`nonpro-sandbox` を使って、チーム開発の一連の流れ（Git/GitHubの基本操作）をCLI（ターミナル）上で練習してみましょう。参加者自身が自ら課題（イシュー）を立てて解決する流れを体験します。

### [1] イシュー（課題）を立てる
チーム開発では「何をするか」を明確にするため、作業前にイシューを作ります。
GitHub CLI (`gh`コマンド) を使うとターミナルから直接作成できます。

> **依頼プロンプト**:
> 「GitHub CLIを使って、『[あなたの名前] の練習用イシュー』というタイトルで新しくイシューを作成して。内容は『GitとGitHubの操作練習です』として」

※ 実行されるコマンド例: `gh issue create --title "タカハシの練習用イシュー" --body "GitとGitHubの操作練習です"`

### [2] 作業用ブランチを切る
`main` ブランチはチーム全員の共有スペースです。個人の作業用ルートとして「ブランチ（分岐）」を作成して切り替えます。

> **依頼プロンプト**:
> 「nonpro-sandboxフォルダに移動してから、現在のmainから `practice/あなたの名前` というブランチを作成して切り替えて」

※ 実行されるコマンド例: `cd nonpro-sandbox` その後 `git checkout -b practice/takahashi`

### [3] コミットを進める（変更の保存）
エディタ（Antigravity IDE）でファイルを作成・編集します。
（例: `nonpro-sandbox` フォルダ内に `members` フォルダを作成し、その中に `あなたの名前.md` という自己紹介ファイルを作ってみましょう）
作業が終わったら、変更を「コミット（セーブ）」します。

> **依頼プロンプト**:
> 「作成した自己紹介ファイルをGitに追加して、『自己紹介ファイルを追加』というメッセージでコミットして」

※ 実行されるコマンド例: `git add .` その後 `git commit -m "自己紹介ファイルを追加"`

### [4] プッシュする（GitHubへ送信）
あなたのPC上の変更（コミット）を、GitHub上のサーバーにアップロードします。

> **依頼プロンプト**:
> 「現在のブランチの内容をGitHubにプッシュして」

※ 実行されるコマンド例: `git push -u origin practice/takahashi`

### [5] プルリクエスト (PR) を作成する
「私の作業が終わったので、共有スペースであるmainに合流（マージ）させてください」という依頼（プルリクエスト）を管理者に送ります。
この時、先ほど作成したイシューの番号（例: `#1`）をPRの説明文に含める（例: `Closes #1` や `Fixes #1`）ことで、**マージされた瞬間にイシューも自動で完了（Close）** されるように紐付けを行います。

> **依頼プロンプト**:
> 「GitHub CLIを使って、現在のブランチからmainへのプルリクエストを作成して。タイトルは『[あなたの名前]の練習成果』として。また、先ほど作成したイシューを自動でクローズするように紐付けて」

※ 実行されるコマンド例: `gh pr create --title "タカハシの練習成果" --body "レビューとマージをお願いします。 Closes #1"`

作成後、Slackなどでチームの管理者（タカハシさん）に「プルリクエストを出しました」と伝えてください。
管理者が内容を確認し、修正の依頼（レビュー）をする場合があります。その場合はコメントに従って元のブランチで再度ファイルを修正し、コミットとプッシュを行ってください（プッシュすると自動でプルリクエストに反映されます）。問題がなければマージ（合流）されます。

### [6] 最新の main をプルする（取り込む）
管理者がマージを完了したら、自分のPCの `main` も最新状態に更新します。

> **依頼プロンプト**:
> 「mainブランチに切り替えて、GitHubから最新の状態をプル（取得）して」

※ 実行されるコマンド例: `git checkout main` その後 `git pull origin main`

これで一連の開発サイクルは完了です！

---

## 5. 本番プロジェクトでの開発フロー (Development Workflow)
Sandboxで流れを掴んだら、いよいよ `nonpro-core` や各個別プロジェクトでの作業です。基本のサイクルはSandboxで練習したものと同じです。ここでもAI CLIを活用しましょう。

### [1] 作業用ブランチの作成
`main` ブランチで直接作業せず、タスクごとにブランチを作成します。
本プロジェクトでは、チーム名をプレフィックスにすることを推奨します（例: `planning/`, `marketing/`）。

> **依頼プロンプト**:
> 「最新のmainから `planning/update-concept` というブランチを作って切り替えて」

AI実行コマンド例:
```bash
git checkout main
git pull
git checkout -b planning/update-concept
```

### [2] nonpro-core の定期的な更新 (重要)
**※これは各個別プロジェクト作業時における重要なルールです。**

共通基盤である `nonpro-core` は、管理者や他のチームによって日々アップデートされます（新しいAIプロンプトや、新しいガイドラインなど）。
一日の作業の始まりや、管理者のアナウンスがあった際は、ターミナルで `nonpro-core` フォルダに移動し、最新の状態を取り込んでください。

> **依頼プロンプト**:
> 「nonpro-coreフォルダに移動して、最新のmainブランチをpullして」

※ 実行されるコマンド例: `cd nonpro-core` その後 `git pull origin main`

### [3] 実装・コミット・プッシュ
コードを編集した後、変更を保存（コミット）してGitHubへ送信（プッシュ）します。

> **依頼プロンプト**:
> 「変更内容をコミットして。メッセージは "Update concept draft for 2026" で。その後プッシュして」

AI実行コマンド例:
```bash
git add .
git commit -m "Update concept draft for 2026"
git push origin planning/update-concept
```

### [4] プルリクエスト (PR) の作成
GitHub上で、あなたのブランチから `main` ブランチへ「プルリクエスト」を作成します。
AIに依頼して、PR作成用のURLを発行してもらうことも可能です。

> **依頼プロンプト**:
> 「プルリクエストを作成するためのURLを教えて（ghコマンドがあれば作成して）」

PRを作成したら、Slackで管理者にレビュー依頼を投げてください。
承認されれば、あなたの成果物（ドキュメントや企画）が `main` にマージされます！
## 6. 困ったときは？
- 環境構築で詰まった場合は、エラーメッセージのスクリーンショットなどを添えてSlackでご相談ください。
- チームメンバーも手探りで進めています。「実験と失敗を楽しむ」スタンスでいきましょう！

---

## 7. 管理者向け手順 (Invitation & Security)

管理者（タカハシ）がメンバーを招待し、リポジトリを保護するための手順です。

### [1] メンバーの招待 (Collaborators)
各リポジトリの `Settings` > `Collaborators` > `Add people` から、メンバーのGitHubアカウント名（例: `miyakoda-system`）を入力して招待メールを送信します。

- **`nonpro-core`**: 閲覧のみのため、権限は `Read` に設定。
- **個別プロジェクト**: 開発に参加するため、権限は `Write` に設定。

### [2] メインブランチの保護 (Rulesets)
メンバーにWrite権限を与えつつ、勝手なマージや履歴改変を防ぐため、`main` ブランチを保護します。
`Settings` > `Rules` > `Rulesets` > `New branch ruleset` から以下の設定を行います。

1. **Ruleset Name**: `Main Protection` (または `Default Branch Rules`)
2. **Enforcement status**: `Active`
3. **Target branches**: `Default branch` (main)
4. **Rules to enforce**:
   - [x] **Restrict deletions** (削除禁止)
   - [x] **Block force pushes** (強制プッシュ禁止)
   - [x] **Require a pull request before merging** (マージ前PR必須)
     - [x] **Require approvals**: `1` (承認数1以上)

この設定により、「メンバーは自由に開発・Pushできるが、マージには管理者の承認が必要」という安全な運用が可能になります。

### [3] ターミナル(CLI)でのイシュー・PR管理 (管理者向け)
管理者がGitHubのブラウザ画面を開かず、CLI (`gh`コマンド) 上で完結してメンバーをサポートするためのコマンド集です。ローカル環境を汚さずに（ブラウザのUI操作の代わりに）サーバー側で直接マージ処理等を行えます。
AIにプロンプトで代わりに実行してもらうことも可能です。

- **イシューの一覧確認**: `gh issue list`
- **PRの一覧確認**: `gh pr list`
- **PRの差分（変更内容）の確認**: `gh pr diff [PR番号]`
- **PRの承認とマージ**:
  - レビュー承認: `gh pr review [PR番号] --approve`
  - マージの実行: `gh pr merge [PR番号] --merge --delete-branch`

> **AIへの依頼プロンプト例（管理者のみ）**:
> 「ghコマンドを使って、現在のプロジェクトのPR一覧を開き、最新のPRの差分を確認して。問題なければマージしてリモートのブランチも削除しておいて。」

**マージ後のお願い（ローカルの更新）**
サーバー側（GitHub上）でマージが完了したら、タカハシさんご自身のローカルPCの環境も最新状態に同期しておく必要があります。
作業の区切りで、ご自身のターミナルで以下を実行し、最新の `main` を取り込んでおいてください。
```bash
git checkout main
git pull origin main
```
