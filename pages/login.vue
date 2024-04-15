<script setup lang="ts">
import { useValidators } from "~/helpers/validators";
import { useLoginPage } from "~/composables/pages/login";

const { validateEmail } = useValidators();
let { handleSubmit, email, password } = useLoginPage();
</script>

<template>
  <AuthForm :title="$t('login.title')">
    <Form :handle-submit="handleSubmit">
      <FormInputText
        v-model="email"
        :label="$t('forms.input.email')"
        input-id="email"
        type="email"
        autocomplete="email"
        :placeholder="$t('forms.input.email')"
        :rules="[validateEmail]"
      />
      <FormInputPassword
        v-model="password"
        :label="$t('forms.input.password')"
        input-id="password"
        :placeholder="$t('forms.input.password')"
      />
      <FormInputSubmit :value="$t('register.form.login')" />
      <FormMessage
        :message="$t('login.message')"
        href="/register"
        :text="$t('login.messageText')"
      />
    </Form>
  </AuthForm>
</template>
