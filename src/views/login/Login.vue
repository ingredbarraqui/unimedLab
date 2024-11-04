<template>
  <div class="unimedLogin">
    <div class="unimedFormLogin">
      <img 
        src="../../assets/images/unimedLogoColor.png"
        alt="Logo unimed"
        class="unimedLogo mb-3"
      >
      <Form
        v-slot="{ errors, isSubmitting }"
        :validation-schema="schema"
        @submit="onSubmit"
      >
        <div class="mb-2">
          <LabelFromYup
            name="email"
            :schema="schema"
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

        <div class="mb-2">
          <LabelFromYup 
            name="password"
            :schema="schema"
          />
          <Field
            name="password"
            placeholder="*******"
            type="password"
            class="inputtext"
            :class="{ 'error': errors.password }"  
          />
          <ErrorMessage
            class="error-msg"
            name="password"
          />
        </div>

        <div class="d-flex flex-column align-items-center mt-3">
          <button
            class="btnLaranja"
            :disabled="isSubmitting"
          >
            Entrar
          </button>
          <font-awesome-icon 
            v-show="isSubmitting" 
            icon="spinner" 
            class="spinner mt-3"
          />
          <router-link to="esqueci-minha-senha" class="link mt-3">
            Esqueci minha senha
          </router-link> 
        </div>
      </Form>
    </div>
  </div>
</template>


<script setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { autenticação as schema } from '@/consts/formSchema';
import { useAuthStore } from '../../store/auth.store.js';

import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

async function onSubmit(values) {
  await authStore.login(values);
  if (authStore.token) {
    router.push('/');
  }
}
</script>

<style>
.unimedLogo {
  width: 260px;
  display: block;
  margin: auto;
}

.unimedFormLogin {
  min-width: 450px;
  border: 3px solid var(--roxo);
  padding: 44px;
  border-radius: 39px;
  background-color: var(--branco);
  position: relative;
}

.unimedLogin {
  background: url('/src/assets/images/image3.png');
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 80px 0;
}

.link {
  font-size: 14px;
  color: #5F5F5F;
}
</style>