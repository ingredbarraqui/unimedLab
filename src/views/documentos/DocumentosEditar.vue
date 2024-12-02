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
            :required="true"
          />
          <Field
            name="name"
            placeholder="Nome"
            type="text"
            class="inputtext"
          />
          <ErrorMessage
            class="error-msg"
            name="name"
          />
        </div>

        <div class="mb-3 w-100">
          <LabelFromYup
            name="title"
            :schema="schema"
            :required="true"
          />
          <Field
            name="title"
            placeholder="Título"
            type="text"
            class="inputtext"
          />
          <ErrorMessage
            class="error-msg"
            name="title"
          />
        </div>
      </div>

      <div class="d-flex gap-3">
        <div class="mb-3 w-100">
          <LabelFromYup
            name="type"
            :schema="schema"
          />
          <Field
            name="type"
            placeholder="Tipo"
            type="text"
            class="inputtext"
          />
          <ErrorMessage
            class="error-msg"
            name="type"
          />
        </div>
        <div class="mb-2 w-100">
          <div>
            <label for="file">
              Arquivo
            </label>
            <input
              id="file"
              name="file"
              type="file"
              class="inputtext"
              @change="onFileChange"
            >
          </div>
          <small>pdf ou word</small>
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
import { documentos as schema } from '@/consts/formSchema';
import { storeToRefs } from 'pinia';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { defineProps, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '../../consts/alert.store.js';
import { useDocumentosStore } from '../../store/documentos.store.js';

const documentosStore = useDocumentosStore()
const { emFoco } = storeToRefs(documentosStore);

const router = useRouter();
const route = useRoute();
const alertStore = useAlertStore();

const file = ref(null);

const {
  errors, isSubmitting, handleSubmit, values, resetForm
} = useForm({
  validationSchema: schema,
  initialValues: emFoco.value,
});

const props = defineProps({
  documentosId: {
    type: Number,
    default: 0,
  },
});

function onFileChange(event) {
  file.value = event.target.files[0];
}

const onSubmitUsuario = handleSubmit(async (values) => {
  try {
    const formData = new FormData();

    formData.append('_method', 'put');
    formData.append('name', values.name);
    formData.append('title', values.title);
    formData.append('type', values.type);

    if (file.value) {
      formData.append('file', file.value);
    }

    const resposta = await documentosStore.salvarItem(formData, props.documentosId)

    if (resposta) {
      alertStore.success('Dados salvos com sucesso!');
      documentosStore.$reset();
      router.push({ name: "documentos" });
    }
  } catch (error) {
    alertStore.error(error);
  }
})

async function iniciar() {
  if (props.documentosId) {
   await documentosStore.buscarItem(props.documentosId);
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