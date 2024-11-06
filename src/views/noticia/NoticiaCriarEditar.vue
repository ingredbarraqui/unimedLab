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
      @submit.prevent="onSubmitUsuario"
    >
      <div class="d-flex gap-3">
        <div class="mb-3 w-100">
          <LabelFromYup 
            name="title" 
            :schema="schema"
          />
          <Field
            name="title"
            placeholder="Titulo da notícia"
            type="text"
            class="inputtext"
            :class="{ 'error': errors.title }"
          />
          <ErrorMessage
            class="error-msg"
            name="title"
          />
        </div>

        <div class="mb-3 w-100">
          <LabelFromYup 
            name="slug" 
            :schema="schema"
          />
          <Field
            name="slug"
            placeholder="Slug da notícia"
            type="text"
            class="inputtext"
            :class="{ 'error': errors.slug }"
          />
          <ErrorMessage
            class="error-msg"
            name="slug"
          />
        </div>
      </div>

      <div class="d-flex gap-3">
        <div class="mb-3 w-100">
          <LabelFromYup 
            name="image" 
            :schema="schema"
          />
          <Field
            id="image"
            name="image"
            type="file" 
            class="inputtext"
            :class="{ 'error': errors.image }"
            @change="onFotoChange"
          />
          <ErrorMessage 
            class="error-msg" 
            name="image"
          />
        </div>

        <div class="mb-3 w-100">
          <LabelFromYup 
            name="newLetterCategoryId" 
            :schema="schema"
          />
          <Field
            id="newLetterCategoryId"
            class="inputtext"
            :class="{ 'error': errors.newLetterCategoryId }"
            name="newLetterCategoryId"
            as="select"
          >
            <option 
              value=""
            />
            <option
              v-for="item in Object.values(lista)"
              :key="item.id"
              :value="item.id"
            >
              {{ item.category }}
            </option>
          </Field>
          <ErrorMessage 
            class="error-msg" 
            name="newLetterCategoryId"
          />
        </div>
      </div>

      <div class="mb-3 w-100">
        <LabelFromYup 
          name="content" 
          :schema="schema"
        />
        <Field
          v-focus
          name="content"
          placeholder="Conteúdo" 
          as="textarea" 
          class="inputtext"
          :class="{ 'error': errors.content }"
        />
        <ErrorMessage 
          class="error-msg" 
          name="content"
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
import { noticia as schema } from '@/consts/formSchema';
import toBase64 from '@/helpers/toBase64.js';
import { useNoticiaStore } from '@/store/noticia.store.js';
import { storeToRefs } from 'pinia';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { defineProps, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '../../consts/alert.store.js';
import { useCategoriaStore } from '../../store/categoria.store.js';

const noticiaStore = useNoticiaStore()
const { emFoco } = storeToRefs(noticiaStore);

const categoriaStore = useCategoriaStore()
const { lista } = storeToRefs(categoriaStore);

const router = useRouter();
const route = useRoute();
const alertStore = useAlertStore();

const {
  errors, isSubmitting, handleSubmit, values, resetForm
} = useForm({
  validationSchema: schema,
  initialValues: emFoco.value,
});

const image = ref('');
const props = defineProps({
  noticiaId: {
    type: Number,
    default: 0,
  },
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

const onSubmitUsuario = handleSubmit(async (values) => {
  try {
    const msg = props.noticiaId
      ? 'Dados salvos com sucesso!'
      : 'Item adicionado com sucesso!';

    const payload = {
      ...values,
      image: image.value || emFoco.value?.image
    };

    const resposta = props.noticiaId
       ? await noticiaStore.salvarItem(payload, props.noticiaId)
       : await noticiaStore.salvarItem(payload);  

    if (resposta) {
      alertStore.success(msg);
      noticiaStore.$reset();
      router.push({ name: "Noticia" });
    }
  } catch (error) {
    alertStore.error(error);
  }
})

async function iniciar() {
  if (props.noticiaId) {
   await noticiaStore.buscarItem(props.noticiaId);
  }
  await categoriaStore.buscarTudo();
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