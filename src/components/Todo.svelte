<script lang="ts">
    export let todo: string;
    export let index: number;
    import { todos } from "../todoStore";
    import { updateTodoFile } from "../utils";
    import { currentList } from "../currentListStore";

    let text = todo.split("¡")[0];
    let complete = false;
    if (todo.split("¡")[1] === "true") complete = true;

    const deleteTodo = () => {
        try {
            $todos.splice(index, 1);
            $todos = $todos;
            updateTodoFile($currentList);
        } catch (error) {
            console.log(error);
        }
    };

    const completeTodo = () => {
        try {
            complete = !complete;
            $todos[index] = text + "¡" + String(complete);
            $todos = $todos;
            updateTodoFile($currentList);
        } catch (error) {
            console.log(error);
        }
    };
</script>

<div class="todo">
    <p class:complete>{text}</p>
    <div>
        <button
            class="todo-button"
            on:click={() => {
                completeTodo();
            }}>Complete ToDo</button
        >
        <button
            class="todo-button"
            on:click={() => {
                deleteTodo();
            }}>Delete ToDo</button
        >
    </div>
</div>

<style>
    .complete {
        text-decoration: line-through;
    }

    .todo {
        margin: 1rem;
        height: 5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: rgb(241, 241, 241);
        box-shadow: 0px 0px 10px 1px lightgray;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: 3px;
        border-color: black;
    }

    .todo-button {
        background-color: lightgray;
        border-radius: 40px;
        border: none;
        height: 2rem;
        margin: 0;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }

    .todo-button:hover {
        box-shadow: 3px 3px 10px 1px gray;
        border: solid;
        border-width: 1px;
        border-color: lightgrey;
    }
</style>
