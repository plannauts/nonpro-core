// src/parser.js
// Note: CONFIG はグローバル変数として config.js から参照されます

/**
 * Markdownテキストを解析し、スライド生成用オブジェクトの配列を返す
 *
 * @param {string} markdownText - 解析対象のMarkdownテキスト
 * @returns {Array<{layout: string, title: string, subtitle?: string, body?: string}>}
 *
 * 解析ルール:
 * 1. 冒頭の # (H1) と ## (H2) を TITLE レイアウトの表紙スライドとして抽出
 * 2. Level 1 (数字リスト `1.`) -> SECTION レイアウトのスライド
 * 3. Level 2 (インデント + 数字リスト `  1.`) -> BODY レイアウトのスライド
 * 4. Level 3 (インデント + 箇条書き `    -`) -> 直前のスライドの body に追加
 * 5. ショートコード [M], [B] などまたは <!-- layout: Message --> を検出してレイアウトを上書き
 */
function parseMarkdown(markdownText) {
  const lines = markdownText.split(/\r\n|\r|\n/);
  const slides = [];
  let currentSlide = null;

  // 表紙用の変数
  let titleH1 = null;
  let titleH2 = null;
  let titleFound = false;

  lines.forEach((line, lineIndex) => {
    // 1. 表紙の検出 (最初に見つかった # と ##)
    if (!titleFound) {
      // H1 の検出
      if (line.match(/^#\s+(.+)$/)) {
        titleH1 = line.replace(/^#\s+/, '').trim();
        return;
      }
      // H2 の検出
      if (line.match(/^##\s+(.+)$/)) {
        titleH2 = line.replace(/^##\s+/, '').trim();

        // H1とH2が揃ったら表紙スライドを作成
        if (titleH1) {
          slides.push({
            layout: 'TITLE',
            title: titleH1,
            subtitle: titleH2
          });
          titleFound = true;
        }
        return;
      }
    }

    // HTMLコメント行は処理をスキップ（ショートコードとして別途処理）
    if (line.match(/^\s*<!--.*-->$/)) {
      return;
    }

    // 空行はスキップ
    if (line.trim() === '') {
      return;
    }

    // 2. リスト構造の解析
    // インデントレベルとリストタイプの判定
    const match = line.match(/^(\s*)(\d+\.|-)\s+(.+)$/);
    if (!match) {
      return; // リスト形式でない行はスキップ
    }

    const [, indent, marker, content] = match;
    const indentLevel = indent.length;

    // リストのレベルを判定（インデント幅に基づく）
    let listLevel;
    if (indentLevel === 0 && marker.match(/^\d+\.$/)) {
      listLevel = 1; // Level 1: 数字リスト、インデントなし
    } else if (indentLevel >= 2 && indentLevel <= 4 && marker.match(/^\d+\.$/)) {
      listLevel = 2; // Level 2: 数字リスト、インデントあり
    } else if (indentLevel >= 4 && marker === '-') {
      listLevel = 3; // Level 3: 箇条書き、深いインデント
    } else {
      return; // 想定外の形式はスキップ
    }

    // ショートコードの検出と除去
    let cleanContent = content;
    let detectedLayout = null;

    // <!-- layout: Message --> 形式のHTMLコメント（同じ行内から検出）
    const inlineLayoutMatch = cleanContent.match(/<!--\s*layout:\s*(\w+)\s*-->/);
    if (inlineLayoutMatch) {
      const layoutName = inlineLayoutMatch[1].toUpperCase();
      if (CONFIG.LAYOUTS[layoutName]) {
        detectedLayout = layoutName;
        cleanContent = cleanContent.replace(/<!--\s*layout:\s*\w+\s*-->/, '').trim();
      }
    }

    // <!-- layout: Message --> 形式のHTMLコメント（前の行から検出）
    if (!detectedLayout && lineIndex > 0) {
      const prevLine = lines[lineIndex - 1];
      const layoutCommentMatch = prevLine.match(/<!--\s*layout:\s*(\w+)\s*-->/);
      if (layoutCommentMatch) {
        const layoutName = layoutCommentMatch[1].toUpperCase();
        if (CONFIG.LAYOUTS[layoutName]) {
          detectedLayout = layoutName;
        }
      }
    }

    // [M], [B] などの角括弧形式のショートコード
    if (!detectedLayout) {
      const shortcodeMatch = cleanContent.match(/\[([A-Z])\]/);
      if (shortcodeMatch) {
        const shortcodeKey = `[${shortcodeMatch[1]}]`;
        if (CONFIG.SHORTCODES[shortcodeKey]) {
          detectedLayout = CONFIG.SHORTCODES[shortcodeKey];
          cleanContent = cleanContent.replace(/\[([A-Z])\]/, '').trim();
        }
      }
    }

    // Level 1: Section Slide (セクション区切り)
    if (listLevel === 1) {
      const sectionSlide = {
        layout: detectedLayout || 'SECTION',
        title: cleanContent
      };
      slides.push(sectionSlide);
      currentSlide = null; // セクションスライドには body を追加しない
      return;
    }

    // Level 2: Content Slide (本文スライド)
    if (listLevel === 2) {
      currentSlide = {
        layout: detectedLayout || 'BODY',
        title: cleanContent,
        body: ''
      };
      slides.push(currentSlide);
      return;
    }

    // Level 3: Body Content (箇条書き本文)
    if (listLevel === 3) {
      if (currentSlide && currentSlide.layout !== 'SECTION') {
        // 既存の body に改行を追加して追記
        if (currentSlide.body) {
          currentSlide.body += '\n' + cleanContent;
        } else {
          currentSlide.body = cleanContent;
        }
      }
      return;
    }
  });

  return slides;
}

// GAS環境とNode.js環境の両方で動作するようにエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { parseMarkdown };
}
