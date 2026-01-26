// src/reverse_sync.js
// スライドからMarkdownへの逆変換機能

/**
 * 指定されたプレゼンテーションをMarkdown形式にエクスポート
 * Drive上の同名Markdownファイルに保存（上書きまたは新規作成）
 *
 * @param {string} presentationFileName - プレゼンテーションファイル名（.gslides拡張子は省略可）
 * @returns {string} エクスポート結果のメッセージ
 */
function exportSlidesToMarkdown(presentationFileName) {
  try {
    // Driveフォルダの取得
    const folderId = CONFIG.getDriveFolderId();
    if (!folderId) {
      throw new Error('Drive Folder IDが設定されていません。Settings メニューから設定してください。');
    }

    const folder = DriveApp.getFolderById(folderId);

    // プレゼンテーションファイルを検索
    const presentationFile = findPresentationFile(folder, presentationFileName);
    if (!presentationFile) {
      throw new Error('プレゼンテーションファイルが見つかりません: ' + presentationFileName);
    }

    console.log('Starting export for presentation: ' + presentationFile.getName());

    // プレゼンテーションを開く
    const presentation = SlidesApp.openById(presentationFile.getId());
    const slides = presentation.getSlides();
    const presentationName = presentation.getName();

    // Markdownテキストを生成
    const markdownText = generateMarkdownFromSlides(slides);

    // ファイル名を決定（プレゼンテーション名.md）
    const fileName = presentationName.replace(/\.gslides?$/i, '') + '.md';

    // 既存Markdownファイルを検索
    const existingFiles = folder.getFilesByName(fileName);

    if (existingFiles.hasNext()) {
      // 既存ファイルを上書き
      const existingFile = existingFiles.next();
      existingFile.setContent(markdownText);
      console.log('✓ Markdown file updated: ' + fileName);

      return '✓ Markdownファイルを更新しました:\n\n' +
             'ファイル名: ' + fileName + '\n' +
             'フォルダ: ' + folder.getName() + '\n' +
             'スライド数: ' + slides.length;
    } else {
      // 新規ファイルを作成
      folder.createFile(fileName, markdownText, MimeType.PLAIN_TEXT);
      console.log('✓ Markdown file created: ' + fileName);

      return '✓ Markdownファイルを新規作成しました:\n\n' +
             'ファイル名: ' + fileName + '\n' +
             'フォルダ: ' + folder.getName() + '\n' +
             'スライド数: ' + slides.length;
    }

  } catch (e) {
    console.error('Export failed: ' + e.message);
    throw e;
  }
}

/**
 * Driveフォルダ内でプレゼンテーションファイルを検索
 * ファイル名の .gslides 拡張子はあり/なし両方に対応
 *
 * @param {GoogleAppsScript.Drive.Folder} folder
 * @param {string} fileName
 * @returns {GoogleAppsScript.Drive.File|null}
 */
function findPresentationFile(folder, fileName) {
  // .gslides拡張子を除去
  const baseName = fileName.replace(/\.gslides?$/i, '');

  // フォルダ内のすべてのプレゼンテーションファイルを検索
  const files = folder.getFilesByType(MimeType.GOOGLE_SLIDES);

  while (files.hasNext()) {
    const file = files.next();
    const fileBaseName = file.getName().replace(/\.gslides?$/i, '');

    // ファイル名が一致するか確認（大文字小文字を区別しない）
    if (fileBaseName.toLowerCase() === baseName.toLowerCase()) {
      return file;
    }
  }

  return null;
}

/**
 * スライド配列からMarkdownテキストを生成
 *
 * @param {Array<GoogleAppsScript.Slides.Slide>} slides
 * @returns {string} Markdown形式のテキスト
 */
function generateMarkdownFromSlides(slides) {
  const lines = [];
  let sectionCounter = 0;
  let contentCounter = 0;

  slides.forEach((slide, index) => {
    const layout = slide.getLayout();
    const layoutName = layout.getLayoutName();

    console.log('Processing slide ' + (index + 1) + ': ' + layoutName);

    // レイアウト名からCONFIG.LAYOUTSの対応を逆引き
    const layoutType = getLayoutTypeByName(layoutName);

    if (!layoutType) {
      console.warn('Unknown layout: ' + layoutName + ', skipping...');
      return;
    }

    // レイアウトタイプごとに処理
    switch (layoutType) {
      case 'TITLE':
        // 表紙: # Title \n## Subtitle
        const titleData = extractTitleSlideData(slide);
        if (titleData.title) {
          lines.push('# ' + titleData.title);
        }
        if (titleData.subtitle) {
          lines.push('## ' + titleData.subtitle);
        }
        lines.push(''); // 空行を追加
        // カウンターをリセット
        sectionCounter = 0;
        contentCounter = 0;
        break;

      case 'SECTION':
        // セクション: 1. Title
        sectionCounter++;
        contentCounter = 0; // コンテンツカウンターをリセット
        const sectionTitle = extractTitle(slide);
        if (sectionTitle) {
          lines.push(sectionCounter + '. ' + sectionTitle);
          lines.push(''); // 空行を追加
        }
        break;

      case 'BODY':
        // 通常スライド:   1. Title
        contentCounter++;
        const bodyData = extractContentSlideData(slide);
        if (bodyData.title) {
          lines.push('  ' + contentCounter + '. ' + bodyData.title);
          if (bodyData.body) {
            // 本文を箇条書きとして追加
            const bodyLines = formatBodyAsListItems(bodyData.body);
            lines.push(...bodyLines);
          }
          lines.push(''); // 空行を追加
        }
        break;

      case 'BULLETS':
        // 箇条書きスライド:   1. [L] Title
        contentCounter++;
        const bulletData = extractContentSlideData(slide);
        if (bulletData.title) {
          lines.push('  ' + contentCounter + '. [L] ' + bulletData.title);
          if (bulletData.body) {
            // 本文を箇条書きとして追加
            const bulletLines = formatBodyAsListItems(bulletData.body);
            lines.push(...bulletLines);
          }
          lines.push(''); // 空行を追加
        }
        break;

      case 'MESSAGE':
        // メッセージスライド:   1. [M] Title
        contentCounter++;
        const messageTitle = extractMessageTitle(slide);
        if (messageTitle) {
          lines.push('  ' + contentCounter + '. [M] ' + messageTitle);
          lines.push(''); // 空行を追加
        }
        break;

      default:
        console.warn('Unhandled layout type: ' + layoutType);
    }
  });

  return lines.join('\n');
}

/**
 * レイアウト名からCONFIG.LAYOUTSのキーを逆引き
 *
 * @param {string} layoutName - Google Slidesのレイアウト名
 * @returns {string|null} レイアウトタイプ（TITLE, SECTION, BODYなど）
 */
function getLayoutTypeByName(layoutName) {
  for (const [type, config] of Object.entries(CONFIG.LAYOUTS)) {
    if (config.NAME === layoutName) {
      return type;
    }
  }
  return null;
}

/**
 * 表紙スライドからタイトルとサブタイトルを抽出
 *
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @returns {{title: string, subtitle: string}}
 */
function extractTitleSlideData(slide) {
  const shapes = slide.getShapes();
  let title = '';
  let subtitle = '';

  shapes.forEach(shape => {
    const placeholder = shape.getPlaceholderType();

    if (placeholder === SlidesApp.PlaceholderType.TITLE ||
        placeholder === SlidesApp.PlaceholderType.CENTERED_TITLE) {
      const textRange = shape.getText();
      title = textRange.asString().trim();
    } else if (placeholder === SlidesApp.PlaceholderType.SUBTITLE) {
      const textRange = shape.getText();
      subtitle = textRange.asString().trim();
    }
  });

  return { title, subtitle };
}

/**
 * スライドからタイトルテキストを抽出
 *
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @returns {string}
 */
function extractTitle(slide) {
  const shapes = slide.getShapes();

  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    const placeholder = shape.getPlaceholderType();

    if (placeholder === SlidesApp.PlaceholderType.TITLE ||
        placeholder === SlidesApp.PlaceholderType.CENTERED_TITLE) {
      const textRange = shape.getText();
      return textRange.asString().trim();
    }
  }

  return '';
}

/**
 * メッセージスライドからサブタイトルテキストを抽出
 * （MESSAGE レイアウトはサブタイトルプレースホルダを使用）
 *
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @returns {string}
 */
function extractMessageTitle(slide) {
  const shapes = slide.getShapes();

  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    const placeholder = shape.getPlaceholderType();

    if (placeholder === SlidesApp.PlaceholderType.SUBTITLE) {
      const textRange = shape.getText();
      return textRange.asString().trim();
    }
  }

  return '';
}

/**
 * コンテンツスライドからタイトルと本文を抽出
 *
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @returns {{title: string, body: string}}
 */
function extractContentSlideData(slide) {
  const shapes = slide.getShapes();
  let title = '';
  let body = '';

  shapes.forEach(shape => {
    const placeholder = shape.getPlaceholderType();

    if (placeholder === SlidesApp.PlaceholderType.TITLE ||
        placeholder === SlidesApp.PlaceholderType.CENTERED_TITLE) {
      const textRange = shape.getText();
      title = textRange.asString().trim();
    } else if (placeholder === SlidesApp.PlaceholderType.BODY) {
      const textRange = shape.getText();
      body = textRange.asString().trim();
    }
  });

  return { title, body };
}

/**
 * 本文テキストを箇条書きリスト形式に整形
 * 各行を "    - " で始まる形式に変換
 *
 * @param {string} bodyText
 * @returns {Array<string>}
 */
function formatBodyAsListItems(bodyText) {
  if (!bodyText) {
    return [];
  }

  const lines = bodyText.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  return lines.map(line => {
    // 既に箇条書き記号がある場合はそのまま、ない場合は追加
    if (line.match(/^[-*•]\s+/)) {
      return '    - ' + line.replace(/^[-*•]\s+/, '');
    } else {
      return '    - ' + line;
    }
  });
}

// GAS環境とNode.js環境の両方で動作するようにエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    exportSlidesToMarkdown,
    generateMarkdownFromSlides,
    getLayoutTypeByName,
    extractTitleSlideData,
    extractTitle,
    extractContentSlideData,
    formatBodyAsListItems
  };
}
