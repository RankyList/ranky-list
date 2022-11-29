<script lang="ts">
    export let parent: Record<string, any>;
    export let description: string;
    export let image: string;
    export let title: string;
</script>

<div class="card | grid gap-5">
    <h3>{ title }</h3>
    <img alt={ `${title}-image`} class="w-full" src={ image }>
    <p>{ description }</p>
</div>
