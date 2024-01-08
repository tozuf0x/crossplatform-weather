const {app, BrowserWindow, ipcMain} = require ('electron');
const Store = require('electron-store');
const path = require ('path');
const axios = require('axios');

const store = new Store();

function createWindow () {
    const win = new BrowserWindow({
        width: 1000,
        height: 750,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    store.set("test", "test");

    ipcMain.handle('keyGetter', (req) =>{
        return store.get('key');
    });

    ipcMain.handle('keySetter', (req, data) =>{
        store.set('key', data);
        return;
    });

    ipcMain.handle('apireader', async (req, key) =>{
        var value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${key}&units=metric`;
        try{
            const response = await axios.get(url);
            const data = response.data;
            value = true;
        }
        catch(error){
            value = false;
        }
        return value;
    });

    ipcMain.handle('dataGetter', async (req, city) =>{
        var data;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${store.get('key')}&units=metric`;
        try{
            const response = await axios.get(url);
            data = response.data;
        }
        catch(error){
            data = false;
        }
        return data;
    });


    win.loadFile('title.html');
}


app.whenReady().then(createWindow);

app.on('window-all-closed', () =>{
    if(process.platform !== 'darwin') app.quit();
})