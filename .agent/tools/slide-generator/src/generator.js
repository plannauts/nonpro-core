// src/generator.js
// Markdownファイルを読み込み、Google Slidesを生成する

/**
 * Markdownファイルからスライドを生成する
 * @param {string} fileName - Drive内のMarkdownファイル名（例: "Slide_Outline.md"）
 */
function generateSlides(fileName) {
  try {
    console.log('=== Antigravity Slides Generator ===');
    console.log('Target file: ' + fileName);

    // 1. ファイル取得
    const file = getMarkdownFile(fileName);
    if (!file) {
      throw new Error('ファイルが見つかりません: ' + fileName);
    }

    console.log('✓ File found: ' + file.getName());

    // 2. ファイル内容を読み込み
    const markdownContent = file.getBlob().getDataAsString();
    console.log('✓ File content loaded (' + markdownContent.length + ' characters)');

    // 3. パース
    const slides = parseMarkdown(markdownContent);
    console.log('✓ Parsed ' + slides.length + ' slides');

    // 4. 新規プレゼンテーションを作成（テンプレートをコピー）
    const presentation = createNewPresentation(fileName);
    console.log('✓ New presentation created: ' + presentation.getName());
    console.log('✓ URL: ' + presentation.getUrl());

    // 5. スライド生成
    let successCount = 0;
    slides.forEach(function(slideData, index) {
      try {
        createSlide(presentation, slideData, index + 1);
        successCount++;
      } catch (e) {
        console.error('Error creating slide ' + (index + 1) + ': ' + e.message);
      }
    });

    console.log('=== Generation Complete ===');
    console.log('Success: ' + successCount + '/' + slides.length + ' slides');

    // ユーザーへの通知
    const ui = SlidesApp.getUi();
    ui.alert(
      'スライド生成完了',
      successCount + '/' + slides.length + ' 枚のスライドを生成しました。\n\n' +
      'プレゼンテーション名: ' + presentation.getName() + '\n\n' +
      'URLをコピーしてブラウザで開いてください:\n' + presentation.getUrl(),
      ui.ButtonSet.OK
    );

  } catch (error) {
    console.error('=== Generation Failed ===');
    console.error(error.message);
    console.error(error.stack);

    SlidesApp.getUi().alert(
      'エラー',
      'スライド生成に失敗しました:\n' + error.message,
      SlidesApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * 新規プレゼンテーションを作成する
 * 現在開いているプレゼンテーション（テンプレート）をコピーして、指定フォルダに配置する
 * @param {string} markdownFileName - Markdownファイル名
 * @returns {GoogleAppsScript.Slides.Presentation}
 */
function createNewPresentation(markdownFileName) {
  // 1. テンプレートプレゼンテーション（現在開いているもの）を取得
  const templatePresentation = SlidesApp.getActivePresentation();
  if (!templatePresentation) {
    throw new Error('テンプレートとなるプレゼンテーションを開いてください');
  }

  const templateFile = DriveApp.getFileById(templatePresentation.getId());
  console.log('Template: ' + templateFile.getName());

  // 2. 新しいプレゼンテーション名を生成
  const baseName = markdownFileName.replace(/\.md$/i, '');
  const newName = baseName + ' (Generated)';

  // 3. テンプレートをコピー
  const copiedFile = templateFile.makeCopy(newName);
  console.log('✓ Template copied: ' + copiedFile.getName());

  // 4. 指定フォルダに移動
  const folderId = CONFIG.getDriveFolderId();
  if (folderId) {
    const targetFolder = DriveApp.getFolderById(folderId);

    // 元のフォルダから削除
    const parents = copiedFile.getParents();
    while (parents.hasNext()) {
      parents.next().removeFile(copiedFile);
    }

    // 新しいフォルダに追加
    targetFolder.addFile(copiedFile);
    console.log('✓ Moved to target folder: ' + targetFolder.getName());
  } else {
    console.warn('⚠ Folder ID not configured. File remains in default location.');
  }

  // 5. 新しいプレゼンテーションを開く
  const newPresentation = SlidesApp.openById(copiedFile.getId());

  // 6. 既存のスライドをすべて削除
  const existingSlides = newPresentation.getSlides();
  existingSlides.forEach(function(slide) {
    slide.remove();
  });
  console.log('✓ Cleared existing slides (' + existingSlides.length + ' slides removed)');

  return newPresentation;
}

/**
 * プロパティストアに保存されたフォルダからファイルを取得する
 * @param {string} fileName
 * @returns {GoogleAppsScript.Drive.File|null}
 */
function getMarkdownFile(fileName) {
  try {
    const folderId = CONFIG.getDriveFolderId();

    if (!folderId) {
      throw new Error('Drive フォルダが設定されていません。\n\nAntiGravity > Settings からフォルダIDを設定してください。');
    }

    const folder = DriveApp.getFolderById(folderId);
    const files = folder.getFilesByName(fileName);

    if (files.hasNext()) {
      return files.next();
    }

    return null;
  } catch (e) {
    console.error('Error getting file: ' + e.message);
    throw e;
  }
}

/**
 * 1枚のスライドを生成する
 * @param {GoogleAppsScript.Slides.Presentation} presentation
 * @param {Object} slideData - {layout: string, title: string, subtitle?: string, body?: string}
 * @param {number} slideNumber - デバッグ用のスライド番号
 */
function createSlide(presentation, slideData, slideNumber) {
  console.log('Creating slide ' + slideNumber + ': ' + slideData.layout + ' - ' + slideData.title);

  // 1. レイアウトを取得
  const layoutConfig = CONFIG.LAYOUTS[slideData.layout];
  if (!layoutConfig) {
    throw new Error('Unknown layout: ' + slideData.layout);
  }

  // 2. マスターからレイアウトを取得
  const masters = presentation.getMasters();
  let targetLayout = null;

  for (var i = 0; i < masters.length; i++) {
    const layouts = masters[i].getLayouts();
    for (var j = 0; j < layouts.length; j++) {
      if (layouts[j].getLayoutName() === layoutConfig.NAME) {
        targetLayout = layouts[j];
        break;
      }
    }
    if (targetLayout) break;
  }

  if (!targetLayout) {
    throw new Error('Layout not found: ' + layoutConfig.NAME);
  }

  // 3. スライドを追加
  const slide = presentation.appendSlide(targetLayout);

  // 4. プレースホルダに内容を流し込む
  fillPlaceholder(slide, slideData, layoutConfig, slideNumber);

  console.log('✓ Slide ' + slideNumber + ' created');
}

/**
 * プレースホルダに内容を流し込む
 * @param {GoogleAppsScript.Slides.Slide} slide
 * @param {Object} slideData
 * @param {Object} layoutConfig
 * @param {number} slideNumber
 */
function fillPlaceholder(slide, slideData, layoutConfig, slideNumber) {
  const placeholders = layoutConfig.PLACEHOLDERS;

  // タイトルを設定
  if (placeholders.TITLE && slideData.title) {
    try {
      const placeholder = slide.getPlaceholder(
        SlidesApp.PlaceholderType[placeholders.TITLE.type],
        placeholders.TITLE.index
      );
      if (placeholder) {
        const textRange = placeholder.asShape().getText();
        textRange.setText(slideData.title);
      } else {
        console.warn('Slide ' + slideNumber + ': TITLE placeholder not found');
      }
    } catch (e) {
      console.warn('Slide ' + slideNumber + ': Error setting title - ' + e.message);
    }
  }

  // サブタイトルを設定
  if (placeholders.SUBTITLE && slideData.subtitle) {
    try {
      const placeholder = slide.getPlaceholder(
        SlidesApp.PlaceholderType[placeholders.SUBTITLE.type],
        placeholders.SUBTITLE.index
      );
      if (placeholder) {
        const textRange = placeholder.asShape().getText();
        textRange.setText(slideData.subtitle);
      } else {
        console.warn('Slide ' + slideNumber + ': SUBTITLE placeholder not found');
      }
    } catch (e) {
      console.warn('Slide ' + slideNumber + ': Error setting subtitle - ' + e.message);
    }
  }

  // 本文を設定
  if (placeholders.BODY && slideData.body) {
    try {
      const placeholder = slide.getPlaceholder(
        SlidesApp.PlaceholderType[placeholders.BODY.type],
        placeholders.BODY.index
      );
      if (placeholder) {
        const textRange = placeholder.asShape().getText();
        // \n を改行として扱う
        const bodyText = slideData.body.replace(/\n/g, '\n');
        textRange.setText(bodyText);
      } else {
        console.warn('Slide ' + slideNumber + ': BODY placeholder not found');
      }
    } catch (e) {
      console.warn('Slide ' + slideNumber + ': Error setting body - ' + e.message);
    }
  }
}
