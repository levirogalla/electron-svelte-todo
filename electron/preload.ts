const { contextBridge, ipcRenderer } = require("electron")


// DO NOT PUT TYPE HINTS HERE, it breaks for some reason
const API = {
    updateTodo: (file, data) => ipcRenderer.send("updateTodo", [file, data]),
    getTodos: (list) => ipcRenderer.invoke("getTodos", list),
    addList: (name) => ipcRenderer.send("addList", name),
    getLists: () => ipcRenderer.invoke("getLists")
}

contextBridge.exposeInMainWorld("api", API)

