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
        :label="$t('register.form.name')"
        input-id="name"
        type="text"
        autocomplete="name"
        :placeholder="$t('register.form.name')"
        :rules="[isRequired, max50]"
      />
      <FormInputText
        v-model="email"
        :label="$t('register.form.email')"
        input-id="email"
        type="email"
        autocomplete="email"
        :placeholder="$t('register.form.email')"
        :rules="[validateEmail]"
      />
      <FormInputPassword
        v-model="password"
        :label="$t('register.form.password')"
        input-id="password"
        :placeholder="$t('register.form.password')"
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

<style scope lang="sass"></style>
