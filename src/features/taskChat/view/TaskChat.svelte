<script lang="ts">
    import { slide } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import type { TaskChatEntity, TaskChatModel } from '../domain/taskChat';
    import Message from './Message.svelte';
    const dispatch = createEventDispatcher();
  
    export let showChat = false;
    export let taskChat: TaskChatModel;

    function handleClose() {
        showChat = false;
        dispatch('closeChat');
    }
    
  </script>
  
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  {#if showChat}
    <div
    transition:slide={{duration: 250}}
    class="fixed bottom-0 left-0 right-0 z-50 h-3/4 md:h-3/4"
    class:hidden={!showChat}
    >
        <div class="flex flex-col h-full w-full bg-secondary rounded-t-xl">
            <div class="flex items-center justify-between p-3 pl-6 pr-4 border-b dark:border-gray-600">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Task Chat</h2>
                <button class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none focus:text-gray-700 dark:focus:text-white material-icons" on:click={handleClose}>
                    close
                </button>
            </div>
            <div class="flex-1 p-4 overflow-y-auto">
                <!-- Messages -->
                {#each $taskChat.messages as chatBubble}
                    <Message role={chatBubble.state.role} content={chatBubble.state.content} />
                {:else}
                    <span>No Chats</span>
                {/each}

            </div>
            <div class="mt-auto p-3">
                <div class="relative flex items-center">
                    <input
                    type="text"
                    class="block w-full py-2 pl-4 pr-10 text-gray-900 border border-gray-300 rounded-md bg-primary dark:text-white dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Type your message..."
                    />
                    <button
                    class="absolute right-0 p-2 text-white text-opacity-50 hover:text-opacity-100 material-icons">
                        keyboard_arrow_right
                    </button>
                </div>
            </div>
        </div>
    </div>

{/if}
  