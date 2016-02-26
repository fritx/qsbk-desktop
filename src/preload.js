
import { ipcRenderer } from 'electron'
import style from './style.css'


document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    handleDomReady()
  }
})

// ipcRenderer.on('win:dom-ready', handleDomReady)

function handleDomReady() {

  const styleNode = document.createElement('style')
  styleNode.textContent = style
  document.querySelector('head').appendChild(styleNode)

  setTimeout(() => {
    ipcRenderer.send('web:display-ready')
  }, 100)
}
