<script lang="ts">
    import Todo from "./components/Todo.svelte";
    import Dropdown from "./components/Dropdown.svelte";
    import { todos } from "./todoStore";
    import { updateTodoFile } from "./utils";
    import { fetchTodos, fetchLists } from "./utils";
    import { currentList } from "./currentListStore";

    let todoText = "";
    $: adding = false;
    fetchTodos($currentList);
    fetchLists();

    const addTodo = async () => {
        try {
            $todos.push(todoText + "¡" + "false");
            $todos = $todos;
            todoText = "";
            updateTodoFile($currentList);
            adding = false;
        } catch (err) {
            console.log(err);
        }
    };
</script>

<main>
    <div class="drop"><Dropdown /></div>
    <div class="content">
        <h1>ToDo</h1>
        <button
            class:todo-form={adding}
            on:click={() => {
                adding = true;
            }}>Add Todo</button
        >

        <div class:todo-form={!adding}>
            <input
                type="text"
                name="todo"
                placeholder="Enter todo..."
                bind:value={todoText}
            />
            <button on:click={addTodo}>Add</button>
        </div>
    </div>

    {#each $todos as todo, index}
        <Todo {todo} {index} />
    {/each}
</main>

<style>
    .drop {
        position: absolute;
        display: flex;
        align-self: start;
        width: 50px;
        z-index: 2;
    }

    .todo-form {
        display: none;
    }

    main {
        position: relative;
        text-align: center;
        margin: 0;
        padding: 0;
    }

    h1 {
        margin: 0;
        margin-bottom: 50px;
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
