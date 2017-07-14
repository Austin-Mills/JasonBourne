//var electron = require('electron');
//var app = electron.app;
//var BrowserWindow = electron.BrowserWindow;

//Global reference of window object
var mainWindow = null;

const path = require('path');
const { app, BrowserWindow, globalShortcut } = require('electron');

app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.on('ready', () => {

  mainWindow = new BrowserWindow({offscreen: true, webview: true, blurable: false, blur: false, skiptaskbar: true, y: 0, x: 0, focusable: true, title: 'Screenshot'});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  const shortcut = globalShortcut.register('Control+Space', () => {
    mainWindow.show();
  });

  if (!shortcut) { console.log('Registration failed.'); }
  mainWindow.emit('focus')

  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

});


app.on('window-all-closed', (event) => {
  event.preventDefault();
});
