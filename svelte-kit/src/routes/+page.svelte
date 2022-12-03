<script lang="ts">
    import { GradientHeading } from '@brainandbones/skeleton';
</script>

<div class="container gap-5 grid mx-auto p-8">
    <GradientHeading
        tag="h1"
        direction="bg-gradient-to-tl"
        from="from-primary-500"
        to="to-tertiary-500"
    >
        Homepage
    </GradientHeading>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <section class="card card-body">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </section>
    <section class="flex space-x-2">
        <a
            class="btn btn-filled-primary"
            href="https://kit.svelte.dev/"
            target="_blank"
            rel="noreferrer">SvelteKit</a
        >
        <a
            class="btn btn-filled-accent"
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noreferrer">Tailwind</a
        >
        <a
            class="btn btn-filled-tertiary"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer">GitHub</a
        >
    </section>
</div>
