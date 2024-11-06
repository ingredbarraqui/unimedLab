<script setup>
import { email as schema } from '@/consts/formSchema';
import { useAuthStore } from '@/store/auth.store';
import { ErrorMessage, Field, Form } from 'vee-validate';

const authStore = useAuthStore();

async function onSubmit(values) {
  await authStore.esqueciSenha(values);
}
</script>

<template>
  <div class="unimedLogin">
    <div class="unimedFormLogin">
      <img 
        src="../../assets/images/unimedLogoColor.png"
        alt="Logo unimed"
        class="unimedLogo mb-3"
      >
      <p>Insira seu e-mail para redefinir a senha</p>
      <Form
        v-slot="{ errors, isSubmitting }"
        :validation-schema="schema"
        @submit="onSubmit"
      >
        <div class="mb-2">
          <LabelFromYup 
            name="email"
            :schema="schema"
            :required="true"
          />
          <Field 
            name="email" 
            placeholder="seu_email@provedor.com" 
            type="text" 
            class="inputtext"
            :class="{ 'error': errors.email }"
          />
          <ErrorMessage 
            class="error-msg" 
            name="email"
          />
        </div>

        <div class="d-flex flex-column align-items-center mt-3">
          <button 
            class="btnLaranja" 
            :disabled="isSubmitting"
          >
            Enviar Link
          </button>
          <font-awesome-icon 
            v-show="isSubmitting" 
            icon="spinner" 
            class="spinner mt-3"
          />
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.unimedFormLogin p{
  font-size: 20px;
  text-align: center;
  font-weight: 500;
  padding: 20px 0;
}
</style>