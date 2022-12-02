<script lang="ts">
    export let isTitle = false;
    export let text: string;

    let active = false;
    let input: HTMLElement;
    let inputValue = text;

    const cancel = () => {
        inputValue = text;
        active = false;
    };

    const toggleField = () => {
        active = true;
        input.focus();
    };

    const submit = (e: Event) => {
        e.preventDefault();

        text = inputValue;
        active = false;
    };
</script>

<div class:active class="input-group | flex items-center gap-5 justify-between">
    {#if isTitle}
        <h2 class="input-group__text">{text}</h2>
    {:else}
        <span class="input-group__text | text-lg">{text}</span>
    {/if}
    <input
        bind:this={input}
        bind:value={inputValue}
        class="input-group__input | flex-1 h-full"
        type="text"
    />

    {#if active}
        <button class="btn | font-mono bg-tertiary-600" type="submit" on:click={submit}>v</button>
        <button class="btn | font-mono bg-warning-600" on:click={cancel}>x</button>
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
