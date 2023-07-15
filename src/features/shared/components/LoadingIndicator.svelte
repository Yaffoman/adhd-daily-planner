<script>
    export let height = 'h-4 mt-2.5';
    export let positioning = 'absolute right-2 top-5';
</script>

<div class="animate-pulse {positioning} flex items-start justify-end pointer-events-none">
    <div class="animate-spin flex flex-col {height} mr-4">
        <div class="bg-white rounded-full h-1 w-1 mb-auto" />
        <div class="bg-white rounded-full h-1 w-1 mt-auto" />
    </div>
</div>
