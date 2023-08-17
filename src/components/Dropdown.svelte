<script lang="ts">
    import { slide } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { currentList } from "../currentListStore";
    import { lists } from "../listStore";
    import { todos } from "../todoStore";
    import { fetchTodos, fetchLists } from "../utils";
    $: clicked = false;

    let listName = "";

    const changeList = async (list: string) => {
        $currentList = list;
        $todos = [];
        await fetchTodos($currentList);
        console.log("tods", $todos);
        clicked = !clicked;
    };

    const addList = async () => {
        adding = false;
        clicked = false;
        try {
            if (listName === "") {
                throw Error("Empty Name");
            }

            await window.api.addList(listName);
            await fetchLists();
            await fetchTodos(listName);
            $currentList = listName;
            listName = "";
        } catch (error) {
            console.log(error);
        }
    };

    $: adding = false;
</script>

<button
    class="btn"
    on:click={() => {
        clicked = !clicked;
    }}>Drop</button
>
{#if clicked}
    <div
        class={"clicked"}
        transition:slide={{
            delay: 50,
            duration: 500,
            easing: quintOut,
            axis: "x",
        }}
    >
        <h3>Lists</h3>
        {#each $lists as list}
            <li>
                <button
                    class="list"
                    class:current-list={list === $currentList}
                    on:click={() => {
                        changeList(list);
                    }}
                >
                    {list}
                </button>
            </li>
        {/each}

        <div class="add-list">
            {#if !adding}
                <button
                    class="add-list-btn"
                    class:adding
                    on:click={() => {
                        adding = true;
                    }}>Add list</button
                >
            {:else}
                <form
                    on:submit|preventDefault={addList}
                    class="list-form"
                    action="submit"
                    class:adding={!adding}
                >
                    <input
                        bind:value={listName}
                        class="add-list-input"
                        type="text"
                        placeholder="List name..."
                    />

                    <button type="submit">Add</button>
                </form>
            {/if}
        </div>
    </div>
{/if}

<style>
    .list-form {
        display: flex;
        justify-content: space-around;
    }

    .add-list-input {
        width: 100%;
    }

    .adding {
        visibility: hidden;
    }

    h3 {
        display: flex;
        align-self: flex-start;
    }

    .current-list {
        box-shadow: 0px 0px 10px 1px gray inset;
    }

    .add-list {
        display: flex;
        justify-content: center;
        text-align: center;
        width: 100%;
    }

    .add-list-btn {
        width: 100%;
        /* display: flex; */
        justify-content: center;
        text-align: center;
    }

    .add-list-btn:hover {
        cursor: pointer;
        box-shadow: 0px 0px 10px 1px gray inset;
    }

    .btn {
        height: 50px;
        margin: 5px;
        border-radius: 5px;
        z-index: 2;
        border: solid;
        border-color: lightgray;
    }

    li {
        display: flex;
        width: 100%;
        align-self: flex-start;
        height: fit-content;
    }

    .list {
        display: flex;
        align-self: flex-start;
        height: fit-content;
        width: 100%;
        margin-bottom: 5px;
        margin-top: 5px;
        padding: 8px;
        background-color: lightsalmon;
        border-color: gray;
    }
    .list:hover {
        cursor: pointer;
        box-shadow: 0px 0px 10px 1px gray inset;
    }

    .clicked {
        top: -10px;
        left: -10px;
        visibility: visible;
        position: absolute;
        background-color: lightsalmon;
        width: 150px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        padding: 20px;
        padding-top: 100px;
        box-shadow: 0px 10px 10px 2px gray;
    }
    .btn:hover {
        border: none;
        box-shadow: 0px 0px 10px 1px lightgray;
    }
</style>
