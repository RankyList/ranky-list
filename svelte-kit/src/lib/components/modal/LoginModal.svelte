<script lang="ts">
    import LoginForm from '$components/form/LoginForm.svelte';

    import type { ModalParent } from '$types/modal';
    import type { LoginSchema } from '$types/schemas/login';
    import type { Validation } from 'sveltekit-superforms/index';

    export let loginForm: Validation<LoginSchema>;
    export let parent: ModalParent;
</script>

<div class="card flex w-full flex-col gap-5 p-4 sm:w-96">
    <LoginForm
        data={loginForm}
        options={{
            onUpdated({ form }) {
                if (form.valid) {
                    parent.onClose();
                }
            },
        }}
    />
</div>
