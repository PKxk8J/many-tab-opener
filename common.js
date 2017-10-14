'use strict'

// 共通処理

var _export

{
  const {
    i18n,
    storage
  } = browser

  const KEY_DEBUG = 'debug'

  const DEBUG = (i18n.getMessage(KEY_DEBUG) === 'debug')

  const storageArea = storage.local

  function debug (message) {
    if (DEBUG) {
      console.log(message)
    }
  }

  async function asleep (msec) {
    return new Promise(resolve => setTimeout(resolve, msec))
  }

  // 設定値を取得する
  async function getValue (key, defaultValue) {
    const {
      [key]: value = defaultValue
    } = await storageArea.get(key)
    return value
  }

  _export = Object.freeze({
    KEY_NUMBER: 'number',
    KEY_URL: 'url',
    KEY_INTERVAL: 'interval',
    KEY_MILLISECOND: 'millisecond',
    KEY_SAVE: 'save',
    KEY_PINNED: 'pinned',
    DEFAULT_NUMBER: 1000,
    DEFAULT_URL: 'http://localhost:8080/{i}',
    DEFAULT_INTERVAL: 0,
    DEFAULT_PINNED: false,
    DEBUG,
    storageArea,
    debug,
    onError: console.error,
    getValue,
    asleep
  })
}

const common = _export
