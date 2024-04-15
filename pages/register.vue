<script setup lang="ts">
import { useValidators } from "~/helpers/validators";
import { useRegisterPage } from "~/composables/pages/register";

const { isRequired, validateEmail, validateMax } = useValidators();
let { handleSubmit, name, email, password } = useRegisterPage();

const max50 = validateMax(50);
</script>

<template>
  <AuthForm :title="$t('register.title')">
    <Form :handle-submit="handleSubmit">
      <FormInputText
        v-model="name"
        :label="$t('forms.input.name')"
        input-id="name"
        type="text"
        autocomplete="name"
        :placeholder="$t('forms.input.name')"
        :rules="[isRequired, max50]"
      />
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
        :message="$t('register.form.message')"
        href="/login"
        :text="$t('register.form.messageText')"
      />
    </Form>
  </AuthForm>
</template>
