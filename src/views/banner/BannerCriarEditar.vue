<template>
  <div class="card-branco">
    <h1 class="mb-3">
      {{ route?.meta?.título }}
    </h1>

    <div 
      v-if="emFoco?.image"  
      class="image mb-4"
    >
      <img :src="emFoco?.image">
    </div>

    <form
      @submit.prevent="onSubmitBanner"
    >
      <div class="mb-2 w-100">
        <label for="image">Banner <span class="required">*</span></label>
        <Field
          id="image"
          name="image"
          type="file" 
          class="inputtext mb-2"
          @change="onFotoChange"
        />
        <ErrorMessage 
          class="error-msg" 
          name="image"
        />
        <small>Arquivos válidos: JPG, PNG e GIF</small>
      </div>

      
      <div class="mb-3 w-100">
        <LabelFromYup 
          name="name" 
          :schema="schema"
          :required="true"
        />
        <Field 
          name="name"
          placeholder="name" 
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
          name="link" 
          :schema="schema"
        />
        <Field 
          name="link"
          placeholder="Link" 
          type="text" 
          class="inputtext"
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
import { banner as schema } from '@/consts/formSchema';
import toBase64 from '@/helpers/toBase64.js';
import { useBannerStore } from '@/store/banners.store';
import { storeToRefs } from 'pinia';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { defineProps, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '../../consts/alert.store.js';

const router = useRouter();
const route = useRoute();
const alertStore = useAlertStore();

const bannerStore = useBannerStore()
const { emFoco } = storeToRefs(bannerStore);

const image = ref('');
const props = defineProps({
  bannerId: {
    type: Number,
    default: 0,
  },
});

const {
  errors, isSubmitting, handleSubmit, values, resetForm
} = useForm({
  validationSchema: schema,
  initialValues: emFoco?.value
});

async function onFotoChange(e) {
  const file = e.target.files[0];
  if (file) {
    try {
      image.value = await toBase64(file);
    } catch (error) {
      alertStore.error("Erro ao converter a imagem para base64");
    }
  }
}

const onSubmitBanner = handleSubmit(async (values) => {
  try {
    const msg = props.bannerId
      ? 'Dados salvos com sucesso!'
      : 'Item adicionado com sucesso!';

    const payload ={
        ...values,
        image: image.value || emFoco.value?.image
      }
      
    const resposta = props.bannerId
       ? await bannerStore.salvarItem(payload, props.bannerId)
       : await bannerStore.salvarItem(payload);  

      if (resposta) {
        alertStore.success(msg);
        bannerStore.$reset();
        router.push({ name: "Banner" });
      }

    } catch (error) {
      alertStore.error('Erro ao enviar a foto de perfil');
    }
})

async function iniciar() {
  if (props.bannerId) {
   await bannerStore.buscarItem(props.bannerId);
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

.image img{
  max-width: 400px;
  border-radius: 8px;
}
</style>