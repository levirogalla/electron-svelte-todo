const { app, BrowserWindow, ipcMain } = require("electron")
const { join } = require("path")
const path = require('path')
const fs = require("fs")

// try {
//     require('electron-reloader')(module, {
//         debug: true,
//         watchRenderer: true,
//         // ignored: ['../lists']
//     });
// } catch (_) { console.log('Error'); } 

app.whenReady().then(main);


const isDev = !app.isPackaged;
function main(){
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        x:0,
        y:0,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: join(__dirname, "./preload.ts")
        }
    });

    window.loadFile(join(__dirname, "../public/index.html"))
    window.on("ready-to-show", window.show)
    
    if (isDev) window.webContents.openDevTools();

}

ipcMain.on("updateTodo", (event, [file, data]) => {
    const dataString = data.join("\n")
    let dir = app.getAppPath();
    let path = dir + "/lists/" + file
    fs.writeFileSync(path, dataString)
})

ipcMain.on("addList", (event, list)=>{
    let dir = app.getAppPath();
    let path = dir + "/lists/" + list + ".txt"

    fs.writeFileSync(path, "")
})


ipcMain.handle("getTodos", async (event, list = "todos.txt") => {
    let dir = app.getAppPath();
    let path = dir + "/lists/" + list
    let data = fs.readFileSync(path);
    console.log(data.toString())
    return data.toString().split(/\r?\n/)
})

ipcMain.handle("getLists", async (event, args) => {
    let dir = app.getAppPath() + "/lists/";
    let lists = fs.readdirSync(dir);
    return lists;

})


    

