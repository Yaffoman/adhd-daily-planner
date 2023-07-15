<script lang="ts">
    import { ChatRole } from "../domain/message";

    export let role: ChatRole;
    export let content: string;
</script>

{#if role === ChatRole.ASSISTANT}
  <div class="chat chat-start">
    <div class="chat-bubble">{content}</div>
  </div>
{:else}
  <div class="chat chat-end">
    <div class="chat-bubble">{content}</div>
  </div>
{/if}

