const {contextBridge, ipcRenderer} = require ('electron');

contextBridge.exposeInMainWorld('api', {
    setKey: (data) => ipcRenderer.invoke('keySetter', data),
    getKey: () => ipcRenderer.invoke('keyGetter'),
    validApi: (key) => ipcRenderer.invoke('apireader', key),
    getData: (city) => ipcRenderer.invoke('dataGetter', city)
})