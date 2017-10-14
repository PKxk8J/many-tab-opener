'use strict'

const {
  browserAction,
  tabs
} = browser
const {
  KEY_NUMBER,
  KEY_URL,
  KEY_INTERVAL,
  KEY_PINNED,
  DEFAULT_NUMBER,
  DEFAULT_URL,
  DEFAULT_INTERVAL,
  DEFAULT_PINNED,
  debug,
  onError,
  getValue,
  asleep
} = common

async function create (windowId) {
  const n = await getValue(KEY_NUMBER, DEFAULT_NUMBER)
  const url = await getValue(KEY_URL, DEFAULT_URL)
  const interval = await getValue(KEY_INTERVAL, DEFAULT_INTERVAL)
  const pinned = await getValue(KEY_PINNED, DEFAULT_PINNED)

  const index = (pinned ? 0 : undefined)
  for (let i = 0; i < n; i++) {
    const openUrl = url.replace(/\{i\}/g, i)
    debug('Open new tab ' + openUrl)
    await tabs.create({
      active: false,
      windowId,
      url: openUrl,
      index,
      pinned
    })
    await asleep(interval)
  }
}

browserAction.onClicked.addListener((tab) => (async () => {
  debug('Clicked')
  await create(tab.windowId)
})().catch(onError))
