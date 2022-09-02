const electron = require("electron")
const { app, BrowserWindow, ipcMain } = electron
const ffmpeg = require("fluent-ffmpeg")


let mainWindow;
app.on("ready",()=>{
    console.log("Video Duration")
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    //mainWindow.loadURL("https://www.youtube.com/")
    mainWindow.loadURL(`file://${__dirname}/index.html`)
})

ipcMain.on("input:from",( event, path )=>{
    ffmpeg.ffprobe(path, ( err, metadata )=>{
        mainWindow.webContents.send("output:to", metadata.format.duration)
    })
})