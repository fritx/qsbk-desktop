
import { app, ipcMain, BrowserWindow } from 'electron'
import { join } from 'path'

const distDir = __dirname


app.on('ready', () => {

  const win = new BrowserWindow({
    show: false, // 窗口准备就绪才显示
    width: 1000,
    height: 700,
    webPreferences: {
      preload: join(distDir, 'preload.js'),
      nodeIntegration: false,
    },
  })

  win.loadURL('http://www.qiushibaike.com/')

  // win.webContents.on('dom-ready', () => {
  //   win.webContents.send('win:dom-ready')
  // })

  ipcMain.once('web:display-ready', () => {
    win.show()
  })
})
