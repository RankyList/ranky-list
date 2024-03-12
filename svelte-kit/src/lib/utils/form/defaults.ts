import { toast } from 'svelte-sonner';

import type { FormOptions } from 'sveltekit-superforms';

export const defaultFormOptions = {
  taintedMessage: null,
  onError() {
    toast.error('Oops! Something went wrong. Please try again.');
  },
  onUpdated({ form: updatedForm }) {
    if (!updatedForm.valid) {
      if (typeof updatedForm.message === 'string') {
        toast.error(updatedForm.message);
      } else {
        toast.error('The form is invalid. Please check the fields and try again.');
      }
    } else if (typeof updatedForm.message === 'string') {
      toast.success(updatedForm.message);
    }
  },
  delayMs: 500,
  timeoutMs: 5000,
} satisfies FormOptions;
