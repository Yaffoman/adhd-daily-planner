<script lang="ts">
    import { slide, fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import type { TaskChatModel } from '../domain/taskChat';
    import ChatBubble from './ChatBubble.svelte';
    import { MessageModel, Message, ChatRole } from '../domain/message';
    import LoadingIndicator from '../../shared/components/LoadingIndicator.svelte';
    const dispatch = createEventDispatcher();
  
    export let showChat = false;
    export let taskChat: TaskChatModel;

    let chatInput = '';
    let assistantLoading = false;
    let chatComplete = null;
    let taskBreakdown = false;

    async function handleChatInput() {
        if (chatInput === '') return;
        const message = new MessageModel(new Message({role: ChatRole.USER, content: chatInput}));
        chatInput = '';
        assistantLoading = true;
        chatComplete = await taskChat.addMessageAndGetAssistantResponse(message);
        console.log('Breakdown:', chatComplete)
        assistantLoading = false;


        // Check if chat is complete
        if (chatComplete !== null) {
            taskBreakdown = true;
            await taskChat.breakdownTask(chatComplete);
            taskBreakdown = false;
        }
    }

    function handleClose() {
        showChat = false;
        dispatch('closeChat');
    }

    function handleKeypress(event: KeyboardEvent) {
        if (!showChat) return;
        if (event.key === 'Enter') {
            handleChatInput();
        }
    }
    
  </script>
  
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <svelte:window on:keypress={handleKeypress}/>
  {#if showChat}
   
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
    transition:fade={{duration: 250}}
    class="fixed inset-0 z-40 bg-black bg-opacity-50"
    class:hidden={!showChat}
    on:click={handleClose}
    />
    <div
    transition:slide={{duration: 250}}
    class="fixed bottom-0 left-0 right-0 z-50 h-3/4 md:h-3/4"
    class:hidden={!showChat}
    >
        <div class="flex flex-col h-full w-full bg-secondary rounded-t-xl">
            <div class="flex items-center justify-between p-3 pl-6 pr-4 border-b dark:border-gray-600">
                <h2 class="text-lg font-semibold text-gray-300 dark:text-white">Task Chat</h2>
                <button class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none focus:text-gray-700 dark:focus:text-white material-icons" on:click={handleClose}>
                    close
                </button>
            </div>
            <div class="flex-1 p-4 overflow-y-auto flex-col-reverse flex justify-start">
               {#if assistantLoading}
                    <div class="rounded-[50px] h-8 flex flex-row bg-primary animate-pulse p-1.5 px-2 loader items-center">
                        <div class="rounded-full h-2 w-2 bg-white bg-opacity-75 animate-bounce" />
                        <div class="rounded-full h-2 w-2 bg-white bg-opacity-75 animate-bounce mx-1 dot-2" />
                        <div class="rounded-full h-2 w-2 bg-white bg-opacity-75 animate-bounce dot-3" />
                    </div>
                {/if}
                 <!-- Messages -->
                {#each [...$taskChat.messages].reverse() as chatBubble}
                    <ChatBubble role={chatBubble.state.role} content={chatBubble.state.content} />
                {:else}
                    <span>No Chats</span>
                {/each}
                

            </div>
            <div class="mt-auto p-3 w-full align-center flex">
                {#if !taskBreakdown}
                    <div class="relative flex items-center w-full">
                        <input
                        bind:value={chatInput}
                        type="text"
                        class="block w-full py-2 pl-4 pr-10 text-gray-300 border border-gray-300 rounded-md bg-primary dark:text-white dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Type your message..."
                        />
                        <button
                        class="absolute right-0 p-2 text-white text-opacity-50 hover:text-opacity-100 material-icons" on:click={handleChatInput}>
                            keyboard_arrow_right
                        </button>
                    </div>
                {:else}
                    <div class="flex flex-row items-center animate-pulse relative mx-auto">
                        <span class="font-medium">Generating Task Breakdown </span>
                        <LoadingIndicator positioning='block ml-3 mb-1.5'/>
                    </div>
                {/if}
            </div>
        </div>
    </div>

{/if}
  
<style>
    .loader {
        width: fit-content;
    }

    .dot-2 {
        animation-delay: 0.1s;
    }

    .dot-3 {
        animation-delay: 0.2s;
    }
    
</style>