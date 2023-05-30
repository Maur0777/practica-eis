const { BrowserWindow, Menu } = require('electron');
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

if (process.env.NODE_ENV !== 'production') {
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

function createWindows() {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('src/index.html');
    const mainMenu = Menu.buildFromTemplate(templeteMenu);
    Menu.setApplicationMenu(mainMenu);

}

module.exports = { createWindows }