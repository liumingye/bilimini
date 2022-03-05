import { addStyle } from '@/utils'
import style from './style.less?inline'

let unloadStyle: () => void

const searchObserver = new MutationObserver((mutations) => {
  mutations.forEach(({ addedNodes }) => {
    if (addedNodes.length === 0) return
    const node = <HTMLElement>addedNodes[0]
    if (node.className === 'v-dialog') {
      const cancel = document.querySelector<HTMLElement>('.open-app-dialog-btn.cancel')
      cancel?.click()
      searchObserver.disconnect()
    }
  })
})

const module = {
  start: () => {
    module.stop()
    // 打开app弹窗自动点击取消
    const styleEntry = addStyle(style)
    unloadStyle = styleEntry.unload
    searchObserver.observe(document.body, {
      childList: true,
    })
  },

  stop: () => {
    // 断开 observer
    searchObserver.disconnect()
    unloadStyle && unloadStyle()
  },
}

export default module
