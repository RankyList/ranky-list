<script lang="ts">
    export let isTitle = false;
    export let text: string;

    let active = false;
    let input: HTMLElement;

    const toggleField = () => {
        active = true;
        input.focus();
    };
</script>

<div class:active class="input-group | flex items-center gap-5 justify-between">
    {#if isTitle}
        <h3 class="input-group__text">{text}</h3>
    {:else}
        <label class="input-group__text" for={text}>{text}</label>
    {/if}
    <input
        bind:this={input}
        bind:value={text}
        on:blur={() => (active = false)}
        class="input-group__input | flex-1 h-full"
        name="title"
        type="text"
    />

    {#if active}
        <button class="btn | font-mono bg-tertiary-600">v</button>
        <button class="btn | font-mono bg-warning-600">x</button>
    {:else}
        <button class="btn | bg-primary-600" on:click={toggleField}>Edit</button>
    {/if}
</div>

<style lang="scss">
    .input-group {
        &__input {
            transition: none;
        }

        &:not(.active) {
            .input-group__input {
                opacity: 0;
                pointer-events: none;
            }
        }

        &.active {
            .input-group__text {
                display: none;
            }

            .input-group__input {
                opacity: 1;
            }
        }
    }
</style>
