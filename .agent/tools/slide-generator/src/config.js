// src/config.js

const CONFIG = {
  /**
   * Drive フォルダ ID を取得する（プロパティストアから）
   * @returns {string}
   */
  getDriveFolderId: function() {
    const properties = PropertiesService.getScriptProperties();
    const folderId = properties.getProperty('DRIVE_FOLDER_ID');
    return folderId || null;
  },

  /**
   * Drive フォルダ ID を設定する（プロパティストアに保存）
   * @param {string} folderId
   */
  setDriveFolderId: function(folderId) {
    const properties = PropertiesService.getScriptProperties();
    properties.setProperty('DRIVE_FOLDER_ID', folderId);
    console.log('✓ Drive Folder ID saved: ' + folderId);
  },

  // レイアウト定義 (解析ログに基づく)
  LAYOUTS: {
    // 表紙: タイトル + サブタイトル
    TITLE: {
      NAME: 'CUSTOM_2',
      PLACEHOLDERS: {
        TITLE: { type: 'TITLE', index: 0 },
        SUBTITLE: { type: 'SUBTITLE', index: 0 }
      }
    },
    // 中表紙: タイトルのみ
    SECTION: {
      NAME: 'CUSTOM_7',
      PLACEHOLDERS: {
        TITLE: { type: 'TITLE', index: 0 }
      }
    },
    // 通常: タイトル + 本文
    BODY: {
      NAME: 'CUSTOM_1',
      PLACEHOLDERS: {
        TITLE: { type: 'TITLE', index: 0 },
        BODY: { type: 'BODY', index: 0 }
      }
    },
    // 箇条書き用: タイトル + 本文 (リストに適したレイアウト)
    BULLETS: {
      NAME: 'CUSTOM_1_1',
      PLACEHOLDERS: {
        TITLE: { type: 'TITLE', index: 0 },
        BODY: { type: 'BODY', index: 0 }
      }
    },
    // メッセージ: 実体はサブタイトルプレースホルダを使用
    MESSAGE: {
      NAME: 'CUSTOM_6_2',
      PLACEHOLDERS: {
        TITLE: { type: 'SUBTITLE', index: 0 }
      }
    }
  },

  // ショートコード定義 (大文字小文字を区別しない)
  SHORTCODES: {
    '[T]': 'TITLE',
    '[S]': 'SECTION',
    '[B]': 'BODY',
    '[L]': 'BULLETS',
    '[M]': 'MESSAGE'
  }
};

// GAS環境とNode.js環境の両方で動作するようにエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
