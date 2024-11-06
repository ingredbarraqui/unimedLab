<template>
  <div class="card-branco">
    <h1 class="mb-3">
      {{ route?.meta?.título }}
    </h1>
    <form
      @submit.prevent="onSubmitVideo"
    >
      <div>
        <LabelFromYup 
          name="link" 
          :schema="schema"
        />
        <div class="w-100 d-flex align-items-center">
          <Field
            name="link"
            placeholder="Link do youtube"
            type="text"
            class="inputtext"
            :class="{ 'error': errors.link }"
          />
          <button
            v-if="emFoco?.id"
            type="button"
            class="icon"
            arial-label="excluir"
            @click="excluirVideo(emFoco?.id)"
          >
            <font-awesome-icon icon="trash" />
          </button>
        </div>
        <ErrorMessage
          class="error-msg"
          name="link"
        />
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
import { video as schema } from '@/consts/formSchema';
import { storeToRefs } from 'pinia';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { defineProps, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAlertStore } from '../../consts/alert.store.js';
import { useVideoStore } from '../../store/video.store.js';

const videoStore = useVideoStore()
const { emFoco } = storeToRefs(videoStore);

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

async function excluirVideo(id) {
  alertStore.confirmAction('Deseja mesmo remover esse item?', async () => {
    if (await videoStore.excluirItem(id)) {
      videoStore.$reset();
      videoStore.buscarItem();
      resetForm({ values: { link: '' } });
      alertStore.success('Vídeo deletada com sucesso.');
    }
  }, 'Remover');
}

const onSubmitVideo = handleSubmit(async (values) => {
  try {
    const payload = {
      ...values,
    };
    const resposta = await videoStore.salvarItem(payload);  

    if (resposta) {
      alertStore.success('Dados salvos com sucesso!');
      videoStore.$reset();
      iniciar()
    }
  } catch (error) {
    alertStore.error(error);
  }
})

async function iniciar() {
  await videoStore.buscarItem(props.categoriaId);
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