<template>
  <div class="card-branco">
    <h1 class="mb-3">
      {{ route?.meta?.título }}
    </h1>
    <form
      @submit.prevent="onSubmitUsuario"
    >
      <div>
        <div class="mb-3 w-100">
          <LabelFromYup 
            name="category" 
            :schema="schema"
          />
          <Field
            name="category"
            placeholder="Categoria"
            type="text"
            class="inputtext"
            :class="{ 'error': errors.category }"
          />
          <ErrorMessage
            class="error-msg"
            name="category"
          />
        </div>

        <div class="mb-3 w-100">
          <LabelFromYup 
            name="description" 
            :schema="schema"
          />
          <Field
            v-focus
            name="description"
            placeholder="Conteúdo" 
            as="textarea" 
            class="inputtext"
            :class="{ 'error': errors.description }"
          />
          <ErrorMessage 
            class="error-msg" 
            name="description"
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
import { categoria as schema } from '@/consts/formSchema';
import { storeToRefs } from 'pinia';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { defineProps, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '../../consts/alert.store.js';
import { useCategoriaStore } from '../../store/categoria.store.js';

const categoriaStore = useCategoriaStore()
const { emFoco } = storeToRefs(categoriaStore);

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
  categoriaId: {
    type: Number,
    default: 0,
  },
});

const onSubmitUsuario = handleSubmit(async (values) => {
  try {
    const msg = props.categoriaId
      ? 'Dados salvos com sucesso!'
      : 'Item adicionado com sucesso!';

    const payload = {
      ...values,
    };

    const resposta = props.categoriaId
       ? await categoriaStore.salvarItem(payload, props.categoriaId)
       : await categoriaStore.salvarItem(payload);  

    if (resposta) {
      alertStore.success(msg);
      categoriaStore.$reset();
      router.push({ name: "categoria" });
    }
  } catch (error) {
    alertStore.error(error);
  }
})

async function iniciar() {
  if (props.categoriaId) {
   await categoriaStore.buscarItem(props.categoriaId);
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