import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

import { loginSchema } from '$schemas/login';
import dayjs from '$utils/dayjs';

export const load = async ({ locals }) => {
  if (locals.user) {
    throw redirect(303, '/');
  }
};

export const actions = {
  login: async ({ request, locals }) => {
    const loginForm = await superValidate(request, loginSchema);

    if (!loginForm.valid) {
      return fail(400, { loginForm });
    }

    try {
      await locals.pb.collection('users').authWithPassword(loginForm.data.usernameOrEmail, loginForm.data.password);

      try {
        locals.pb.authStore.exportToCookie({ expires: dayjs().add(1, 'year').toDate() });
      } catch (e) {
        return message(loginForm, 'Something went wrong while logging you in...', { status: 500, valid: false });
      }
    } catch (e) {
      return message(loginForm, 'Invalid credentials.', { status: 401, valid: false });
    }

    return { loginForm };
  },
};
