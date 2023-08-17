import { todos } from "./todoStore";
import { lists } from "./listStore";

export const updateTodoFile = (file: string) => {
    let newData: Array<string>;
    const unsub = todos.subscribe((data)=>{
        newData = data
    })
    window.api.updateTodo(file + ".txt", newData)
    unsub()
}

export const fetchTodos = async (file: string) => {
    let data: Array<string> = await window.api.getTodos(file + ".txt");
    todos.set(data)
};


export const fetchLists = async () => {
    let newLists: Array<string> = await window.api.getLists()

    console.log(newLists)

    const test = newLists.map((list)=>{
        return list.split(".txt")[0]
    })

    console.log("dfaa",test)
    lists.set(test)
}
