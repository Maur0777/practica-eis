const setupEvents = require('../installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');

const templeteMenu = [
  {
    label: 'EIS-PRACTICAS',
    submenu: [
      {
        label: 'Salir',
        accelerator: 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (process.env.NODE_ENV === 'production') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    ignored: /data|[\/\\]\./
  });

  templeteMenu.push({
    label: 'DevTools',
    submenu: [
      {
        label: 'Show/Hide Dev Tools',
        click(item, focusedWindows) {
          focusedWindows.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}



let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }));

  const mainMenu = Menu.buildFromTemplate(templeteMenu);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on('closed', () => {
    app.quit();
  });

});




