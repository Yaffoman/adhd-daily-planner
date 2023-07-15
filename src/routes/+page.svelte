<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    // import { user } from '$lib/store';

    let currentUser;

    $: {
        if(currentUser != null) {
            if(currentUser.authenticated) {
                goto('/taskList');
            } else {
                goto('/resume');
            }
        }
    }

    onMount(async () => {
        // This is where you would fetch your user data or validate auth status
        goto('/resume')
        // goto('/taskList')
    });
</script>

<p>Loading...</p>