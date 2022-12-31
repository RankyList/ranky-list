<script lang="ts">
    import ButtonIcon from '$component/icon/ButtonIcon.svelte';

    export let isTitle = false;
    export let text: string;

    let active = false;
    let input: HTMLElement;

    $: inputValue = text;

    const cancel = () => {
        inputValue = text;
        active = false;
    };

    const edit = () => {
        active = true;
        input.focus();
    };

    const submit = (e: Event) => {
        e.preventDefault();

        text = inputValue;
        active = false;
    };
</script>

<div class:active class="input-group | flex flex-grow items-center justify-between gap-2">
    {#if isTitle}
        <h2 class="input-group__text | flex-shrink-0">{text}</h2>
    {:else}
        <span class="input-group__text | flex-shrink-0 text-lg">{text}</span>
    {/if}
    <input bind:this={input} bind:value={inputValue} class="input-group__input | h-full" type="text" />

    {#if active}
        <ButtonIcon action={submit} classes="h-full" padding={3} variant="ok" ariaLabel="Submit" />
        <ButtonIcon action={cancel} classes="h-full" padding={3} variant="cancel" ariaLabel="Cancel" />
    {:else}
        <ButtonIcon action={edit} padding={3} variant="edit" ariaLabel="Edit" />
    {/if}
</div>

<style lang="scss">
    .input-group {
        &__text {
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 200ms;
        }

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
                height: 0;
                opacity: 0;
                overflow: hidden;
                width: 0;
            }

            .input-group__input {
                opacity: 1;
                transition-property: all;
                transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                transition-duration: 200ms;
            }
        }
    }
</style>
