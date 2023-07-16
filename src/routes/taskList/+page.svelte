<script lang="ts">
    import { ChatRole, Message, MessageModel } from "../../features/taskChat/domain/message";
    import { TaskChatModel, TaskChatEntity } from "../../features/taskChat/domain/taskChat";
    import TaskChat from "../../features/taskChat/view/TaskChat.svelte";
    import TaskList from "../../features/taskList/view/TaskList.svelte";
    import { CurrentUser } from "../../features/user/domain/user";

    let showChat = false;

    let taskChatModel = null;

    function openAddTaskChat() {
        taskChatModel = new TaskChatModel(new TaskChatEntity({messages: [new MessageModel(new Message({role: ChatRole.ASSISTANT, content: 'Hello! Please enter the task you would like to work on today as well as the time you plan to allocate for it.'}))]}));
        showChat = true; 
    }

</script>

<div class="h-full w-full flex flex-col px-10">
    <h1 class="text-white text-4xl font-medium pt-10">Hello {$CurrentUser.state.name.split(' ')[0]}!</h1>
    <p class="text-white text-lg mt-1.5">Let's work on planning out your day, start by entering a task you would like to accomplish below</p>
    <div class="w-full h-px min-h-[1px] bg-white opacity-10 my-5" />
    <div class="overflow-auto flex-grow">
        <TaskList />     
    </div>
    <button class="px-3 py-1.5 bg-blue-base rounded hover:bg-blue-hover text-white h-[40px] w-full sm:w-3/4 md:w-1/2 mb-4 mx-auto" on:click={openAddTaskChat}>Add Task</button>
    <TaskChat {showChat} taskChat={taskChatModel} on:closeChat={() => showChat = false}  />
</div>



