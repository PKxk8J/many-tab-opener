'use strict'

const {
  i18n
} = browser
const {
  storageArea,
  KEY_NUMBER,
  KEY_URL,
  KEY_INTERVAL,
  KEY_PINNED,
  KEY_MILLISECOND,
  KEY_SAVE,
  DEFAULT_NUMBER,
  DEFAULT_URL,
  DEFAULT_INTERVAL,
  DEFAULT_PINNED,
  debug,
  onError
} = common

const LABEL_KEYS = [KEY_NUMBER, KEY_URL, KEY_INTERVAL, KEY_MILLISECOND, KEY_PINNED, KEY_SAVE]

/*
 * {
 *   "number": 1000,
 *   "url": "https://example.com/#",
 *   "interval": 1000,
 *   "pinned": false
 * }
 */

// 現在の設定を表示する
async function restore () {
  const data = await storageArea.get()
  debug('Loaded ' + JSON.stringify(data))

  const {
    [KEY_NUMBER]: number = DEFAULT_NUMBER,
    [KEY_URL]: url = DEFAULT_URL,
    [KEY_INTERVAL]: interval = DEFAULT_INTERVAL,
    [KEY_PINNED]: pinned = DEFAULT_PINNED
  } = data

  document.getElementById(KEY_NUMBER).value = number
  document.getElementById(KEY_URL).value = url
  document.getElementById(KEY_INTERVAL).value = interval
  document.getElementById(KEY_PINNED).checked = pinned
}

// 設定を保存する
async function save () {
  const number = document.getElementById(KEY_NUMBER).value
  const url = document.getElementById(KEY_URL).value
  const interval = document.getElementById(KEY_INTERVAL).value
  const pinned = document.getElementById(KEY_PINNED).checked

  const data = {
    [KEY_NUMBER]: number,
    [KEY_URL]: url,
    [KEY_INTERVAL]: interval,
    [KEY_PINNED]: pinned
  }
  // 古い形式のデータを消す
  await storageArea.clear()
  await storageArea.set(data)
  debug('Saved ' + JSON.stringify(data))
}

// 初期化
(async function () {
  LABEL_KEYS.forEach((key) => {
    document.getElementById('label_' + key).textContent = ' ' + i18n.getMessage(key) + ' '
  })

  document.addEventListener('DOMContentLoaded', () => restore().catch(onError))
  document.getElementById(KEY_SAVE).addEventListener('click', (e) => save().catch(onError))
})().catch(onError)
