<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { getPersona } from '../features/firestore/firestore';
    import { CurrentUser, User, UserModel } from '../features/user/domain/user';

    onMount(async () => {
        // This is where you would fetch your user data or validate auth status
        getPersona().then((persona) => {
            console.log(persona);
            if (!persona) {
                goto('/resume');
            } else {
                CurrentUser.set(new UserModel(new User(persona)));
                goto('/taskList');
            }
        }).catch((e) => {
            console.log(e);
            goto('/resume');
        })
    });
</script>

<p>Loading...</p>