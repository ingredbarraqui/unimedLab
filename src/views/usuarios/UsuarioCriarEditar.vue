<template>
  <div class="card-branco">
    <h1 class="mb-3">
      {{ route?.meta?.título }}
    </h1>
    <form
      @submit.prevent="onSubmitUsuario"
    >
      <div class="d-flex gap-3">
        <div class="mb-3 w-100">
          <LabelFromYup 
            name="name" 
            :schema="schema"
          />
          <Field
            name="name"
            placeholder="Seu nome"
            type="text"
            class="inputtext"
            :class="{ 'error': errors.name }"
          />
          <ErrorMessage
            class="error-msg"
            name="name"
          />
        </div>

        <div class="mb-3 w-100">
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
      </div>

      <div class="d-flex gap-3">
        <div class="mb-3 w-100">
          <LabelFromYup 
            name="password" 
            :schema="schema"
          />
          <Field
            name="password" 
            placeholder="Nova senha" 
            type="password" 
            class="inputtext"
            :class="{ 'error': errors.password }"  
          />
          <ErrorMessage 
            class="error-msg" 
            name="password"
          />
        </div>
        <div class="mb-3 w-100">
          <LabelFromYup 
            name="password_confirmation" 
            :schema="schema"
          />
          <Field
            name="password_confirmation" 
            placeholder="Senha atual" 
            type="password" 
            class="inputtext"
            :class="{ 'error': errors.password_confirmation }"  
          />
          <ErrorMessage 
            class="error-msg" 
            name="password_confirmation"
          />
        </div>
      </div>

      <div class="d-flex flex-column align-items-center mt-4">
        <button 
          class="btnVerde" 
          :disabled="isSubmitting"
        >
          Salvar
        </button>
        <font-awesome-icon
          v-show="isSubmitting" 
          icon="spinner" 
          class="spinner mt-3"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { novoUsuario as schema } from '@/consts/formSchema';
import { storeToRefs } from 'pinia';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { defineProps, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '../../consts/alert.store.js';
import ativoInativo from "../../consts/ativoInativo.js";
import { useUsuariosStore } from '../../store/usuarios.store.js';

const usuariosStore = useUsuariosStore()
const { emFoco } = storeToRefs(usuariosStore);

const router = useRouter();
const route = useRoute();
const alertStore = useAlertStore();

const {
  errors, isSubmitting, handleSubmit, values, resetForm
} = useForm({
  validationSchema: schema,
  initialValues: emFoco.value,
});

const props = defineProps({
  usuarioId: {
    type: Number,
    default: 0,
  },
});

const onSubmitUsuario = handleSubmit(async (values) => {
  try {
    const payload = {
      ...values,
    };

    const resposta = await usuariosStore.salvarItem(payload); 

    if (resposta) {
      alertStore.success('Item adicionado com sucesso!');
      usuariosStore.$reset();
      router.push({ name: "Usuarios" });
    }
  } catch (error) {
    alertStore.error(error);
  }
})

async function iniciar() {
  if (props.usuarioId) {
   await usuariosStore.buscarItem(props.usuarioId);
  }
}
iniciar()

watch(emFoco, (novoValor) => {
  if (novoValor) {
    resetForm({ values: novoValor });
  }
}, { immediate: true });
</script>

<style scoped>
.ativo svg {
    color: var(--verdeClaro);
    background-color: initial;
    margin-left: initial;
}
</style>