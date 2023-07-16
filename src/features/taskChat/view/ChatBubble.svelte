<script lang="ts">
    import { CurrentUser } from "../../user/domain/user";
    import { ChatRole } from "../domain/message";

    export let role: ChatRole;
    export let content: string;
</script>

{#if role === ChatRole.ASSISTANT}
  <div class="chat chat-start">
    <div class="chat-header ml-1">
      AI Assistant
    </div>
    <div class="chat-bubble bg-primary drop-shadow">{content}</div>
  </div>
{:else}
  <div class="chat chat-end">
    <div class="chat-header mr-1">
      You
    </div>
    <div class="chat-bubble drop-shadow">{content}</div>
  </div>
{/if}

