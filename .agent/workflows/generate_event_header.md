---
description: ペルソナとPythonを活用し、PeatixやNote用のアイキャッチ画像を生成するフロー
---

# Event Header Image Generation Flow

イベントや記事の「顔」となるアイキャッチ画像を作成するワークフローです。
AIによる画像生成と、Pythonスクリプトによる「余白拡張（Canvas Extension）」を組み合わせ、テキストを載せやすい高品質な画像を作成します。

---

## 1. コンセプト定義 (Concept)

画像のプロンプトを作成する前に、以下の要素を言語化します。

*   **Subject:** 何を描くか（例：実験室、キャンプファイヤー、登山）
*   **Mood:** 雰囲気（例：未来的、温かい、プロフェッショナル）
*   **Colors:** ブランドカラーやテーマカラー（例：ノンプロ研オレンジ、テックブルー）
*   **Composition:** 「右側にイラスト、左側に余白」が鉄則。

## 2. 画像生成 (Generation)

AIエージェントを使用し、以下の要件で画像を生成します。
生成ツールはデフォルトで正方形が出力されることが多いため、まずは正方形で構いません。

**基本プロンプト構成:**
```text
A conceptual illustration of [Subject].
Style: [Mood/Style], isometric 3D, high quality.
Composition: The main element is positioned on the RIGHT side. The LEFT side is clean negative space or simple background.
Colors: [Colors].
```

**実行コマンド例:**
/generate_image prompt="A conceptual illustration... (以下略)"

## 3. 画像加工 (Extension)

生成された画像を、16:9 (920x450) に最適化し、左側の余白を拡張します。
`nonpro-core/.agent/scripts/image_utils.py` にあるスクリプトを使用します。

### 3-1. スクリプトの実行

1.  生成された画像を作業フォルダに配置します。
2.  以下のコマンドを実行し、画像を加工します。

```powershell
python c:\Users\ntaka\nonpro-core\.agent\scripts\image_utils.py [画像パス]
```

※ 引数なしで実行すると、同フォルダ内の `_original.png` を探して処理する等の仕様（要調整）。
現状は `process_extend.py` として実装されたロジックを使用。

---

## 4. 仕上げ (Finishing)

出力された画像（`_extended_920x450.png`）を確認し、必要に応じてCanva等で以下を追加します。

*   イベントタイトル
*   開催日時
*   登壇者写真

---
