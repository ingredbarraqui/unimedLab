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

        <div class="mb-3 w-100">
          <LabelFromYup 
            name="phone" 
            :schema="schema"
          />
          <Field 
            v-maska
            data-maska="(##) #####-####" 
            name="phone"
            type="text"
            placeholder="(00) 00000-0000"
            class="inputtext"
            maxlength="15"
            :class="{ 'error': errors.phone }"
          />
          <ErrorMessage
            class="error-msg"
            name="phone"
          />
        </div>
      </div>

      <div class="d-flex w-100 gap-3">
        <div class="mb-3 d-flex align-items-end">
          <div>
            <LabelFromYup 
              name="cep"
              :schema="schema"
            />
            <Field
              v-model="cep"
              v-maska
              name="cep"
              type="text"
              placeholder="CEP"
              class="inputtext"
              maxlength="9"
              data-maska="#####-###"
              :class="{ 'error': errors.cep }"
              @focusout="getCep"
            />
            <ErrorMessage
              class="error-msg"
              name="cep"
            />
          </div>
          <span v-if="chamadasPendentes.emFoco">
            <font-awesome-icon
              icon="spinner" 
              class="spinner mt-3"
            />
          </span>
        </div>

        <div class="mb-2 w-75">
          <LabelFromYup
            name="street" 
            :schema="schema"
          />
          <Field
            v-model="listaCep.logradouro"
            name="street" 
            type="text" 
            placeholder="Rua" 
            class="inputtext light mb-2"
            :class="{ 'error': errors.street }"
          />
          <ErrorMessage 
            class="error-msg"
            name="street"
          />
        </div>

        <div class="mb-3 w-25">
          <LabelFromYup 
            name="number" 
            :schema="schema"
          />
          <Field 
            name="number" 
            type="text" 
            placeholder="Número" 
            class="inputtext"
            :class="{ 'error': errors.number }"
          />
          <ErrorMessage 
            class="error-msg" 
            name="number"
          />
        </div>
      </div>

      <div class="d-flex w-100 gap-3">
        <div class="mb-3 w-75">
          <LabelFromYup 
            name="neighborhood" 
            :schema="schema"
          />
          <Field
            v-model="listaCep.bairro"
            name="neighborhood" 
            type="text" 
            placeholder="Bairro" 
            class="inputtext"
            :class="{ 'error': errors.neighborhood }"
          />
          <ErrorMessage 
            class="error-msg"
            name="neighborhood"
          />
        </div>

        <div class="mb-3 w-100">
          <LabelFromYup 
            name="complement" 
            :schema="schema"
          />
          <Field 
            name="complement"
            type="text" 
            placeholder="complemento" 
            class="inputtext mb-2"
          />
        </div>
      </div>

      <div class="d-flex w-100 gap-3">
        <div class="mb-3 w-100">
          <LabelFromYup 
            name="city" 
            :schema="schema"
          />
          <Field
            v-model="listaCep.localidade"
            name="city" 
            type="text" 
            placeholder="Cidade" 
            class="inputtext"
            :class="{ 'error': errors.city }"
          />
          <ErrorMessage 
            class="error-msg" 
            name="city"
          />
        </div>

        <div class="mb-3 w-100">
          <LabelFromYup 
            name="state" 
            :schema="schema"
          />
          <Field 
            v-model="listaCep.uf"
            name="state" 
            type="text" 
            placeholder="Estado" 
            class="inputtext light mb-2"
            :class="{ 'error': errors.state }"
          />
          <ErrorMessage 
            class="error-msg"
            name="state"
          />
        </div>
      </div>

      <div class="d-flex gap-3">
        <div class="mb-3 w-100"> 
          <label>Coleta</label>
          <multiselect
            v-model="selectedCollections"
            :options="optionsHours"
            :multiple="true"
            placeholder="Faixa etária"
            label="valor"
            name="collections"
            track-by="valor"
          />
        </div>

        <div class="mb-3 w-100"> 
          <label>Serviços</label>
          <multiselect
            v-model="selectedServices"
            :options="optionsHours"
            :multiple="true"
            placeholder="Prevenções"
            label="valor"
            name="services"
            track-by="valor"
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
import { unidade as schema } from '@/consts/formSchema';
import horarios from '@/consts/horarios.js';
import { useCepStore } from '@/store/buscaCep.store';
import { useUnidadeStore } from '@/store/unidade.store.js';
import { vMaska } from "maska/vue";
import { storeToRefs } from 'pinia';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { computed, defineProps, ref, watch } from 'vue';
import Multiselect from 'vue-multiselect';
import { useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '../../consts/alert.store.js';

const unidadeStore = useUnidadeStore()
const { emFoco } = storeToRefs(unidadeStore);

const cepGet = useCepStore()
const { lista: listaCep, chamadasPendentes  } = storeToRefs(cepGet);

const router = useRouter();
const route = useRoute();
const alertStore = useAlertStore();

const location = ref({
  lat: '',
  lang: ''
})

const selectedCollections = ref({})
const selectedServices = ref({})
const optionsHours = computed(() => {
  return Object.keys(horarios).map((key) => ({
    key: key,
    valor: horarios[key].valor,
  }));
});


const {
  errors, isSubmitting, handleSubmit, values, resetForm
} = useForm({
  validationSchema: schema,
  initialValues: emFoco.value,
});

const props = defineProps({
  unidadeId: {
    type: Number,
    default: 0,
  },
});

async function getCep(cep) {
  let ceptetste = cep.target.value.replace(/\D/g, '')
  try {
    await cepGet.getCep(ceptetste);
    location.value.lat = cepGet.location.latitude;
    location.value.lang = cepGet.location.longitude;
  } catch (error) {
    alertStore.error(error);
  }
}

const formatSelectionsAsObject = (selections) => {
  return selections.reduce((acc, item) => {
    const key = Object.keys(horarios).find(
      (k) => horarios[k].valor === item.valor
    );
    if (key) acc[key] = item.valor;
    return acc;
  }, {});
};

const formatObjectToSelections = (obj) => {
  return Object.keys(obj).map((key) => {
    return {
      valor: obj[key]
    };
  });
};

const onSubmitUsuario = handleSubmit(async (values) => {
  try {
    const msg = props.unidadeId
      ? 'Dados salvos com sucesso!'
      : 'Item adicionado com sucesso!';

    const payload = {
      ...values,
      'lat': location.value.lat || emFoco.value?.lat,
      'lang': location.value.lang || emFoco.value?.lang,
      'services': formatSelectionsAsObject(selectedServices.value) || emFoco.value?.services,
      'collections': formatSelectionsAsObject(selectedCollections.value) || emFoco.value?.collections,
    };

    const resposta = props.unidadeId
      ? await unidadeStore.salvarItem(payload, props.unidadeId)
      : await unidadeStore.salvarItem(payload);  

    if (resposta) {
      alertStore.success(msg);
      unidadeStore.$reset();
      router.push({ name: "unidade" });
    }
  } catch (error) {
    alertStore.error(error);
  }
})

async function iniciar() {
  if (props.unidadeId) {
   await unidadeStore.buscarItem(props.unidadeId);
  }
}
iniciar()

watch(emFoco, (novoValor) => {
  if (novoValor) {
    resetForm({ values: novoValor });
    
    if (novoValor.collections) {
      selectedCollections.value = formatObjectToSelections(novoValor.collections);
    } else {
      selectedCollections.value = [];
    }

    if (novoValor.services) {
      selectedServices.value = formatObjectToSelections(novoValor.services);
    } else {
      selectedServices.value = [];
    }
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