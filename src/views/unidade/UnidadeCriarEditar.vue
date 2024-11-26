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
            :required="true"
          />
          <Field
            name="name"
            placeholder="Seu nome"
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
            name="slug" 
            :schema="schema"
            :required="true"
          />
          <Field
            name="slug"
            placeholder="Slug da notícia"
            type="text"
            class="inputtext"
          />
          <ErrorMessage
            class="error-msg"
            name="slug"
          />
        </div>
      </div>

      <div class="d-flex gap-3">
        <div class="mb-3 w-100">
          <label for="email">Email</label>
          <Field
            name="email"
            placeholder="seu_email@provedor.com" 
            type="email" 
            class="inputtext"
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
          />
        </div>
      </div>

      <div class="d-flex w-100 gap-3">
        <div class="mb-3 d-flex align-items-end">
          <div>
            <LabelFromYup 
              name="cep"
              :schema="schema"
              :required="true"
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
            :required="true"
          />
          <Field
            v-model="listaCep.logradouro"
            name="street" 
            type="text" 
            placeholder="Rua" 
            class="inputtext light mb-2"
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
            :required="true"
          />
          <Field 
            name="number" 
            type="text" 
            placeholder="Número" 
            class="inputtext"
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
            :required="true"
          />
          <Field
            v-model="listaCep.bairro"
            name="neighborhood" 
            type="text" 
            placeholder="Bairro" 
            class="inputtext"
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
            :required="true"
          />
          <Field
            v-model="listaCep.localidade"
            name="city" 
            type="text" 
            placeholder="Cidade" 
            class="inputtext"
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
            :required="true"
          />
          <Field 
            v-model="listaCep.uf"
            name="state" 
            type="text" 
            placeholder="Estado" 
            class="inputtext light mb-2"
          />
          <ErrorMessage 
            class="error-msg"
            name="state"
          />
        </div>
      </div>

      <div class="d-flex mb-3">
        <Field
          v-model="applyVaccine"
          name="applyVaccine"
          type="checkbox"
          :value="true"
          class="inputcheckbox"
        />
        <LabelFromYup
          name="applyVaccine"
          :schema="schema"
          class="ps-2 pb-0"
        />
      </div>

      
      <div class="mb-3">
        <LabelFromYup 
          name="services" 
          :schema="schema"
          :required="true"
        />
        <FieldArray 
          v-slot="{ fields, push, remove }" 
          name="services"
        >
          <div 
            v-for="(field, index) in fields" 
            :key="field.key"
            class="gap-3 d-flex align-items-center mb-1"
          >
            <div class="w-100">
              <Field
                :name="`services[${index}].dia`"
                placeholder="Dia da semana"
                type="text"
                class="inputtext"
              />
              <ErrorMessage 
                :name="`services[${index}].dia`" 
                class="error-msg" 
              />
            </div>

            <div class="w-100">
              <Field
                :name="`services[${index}].horarioInicio`"
                placeholder="Horário inicial"
                type="time"
                class="inputtext"
              />
              <ErrorMessage 
                :name="`services[${index}].horarioInicio`" 
                class="error-msg" 
              />
            </div>

            <div class="w-100">
              <Field
                :name="`services[${index}].horarioFim`"
                placeholder="Horário final"
                type="time"
                class="inputtext"
              />
              <ErrorMessage 
                :name="`services[${index}].horarioFim`" 
                class="error-msg" 
              />
            </div>

            <button 
              type="button" 
              class="btn btn-danger ms-2" 
              @click="remove(index)"
            >
              Remover
            </button>
          </div>

          <button 
            type="button" 
            class="btn w-100 p-0 d-flex align-items-center addlink" 
            @click="push({ dia: '', horarioInicio: '', horarioFim: '' })"
          >
            <font-awesome-icon 
              class="pe-2" 
              icon="circle-plus" 
            />
            Adicionar horários
          </button>
        </FieldArray>
      </div>

      <div class="mb-3">
        <LabelFromYup 
          name="collections" 
          :schema="schema"
          :required="true"
        />
        <FieldArray 
          v-slot="{ fields, push, remove }" 
          name="collections"
        >
          <div 
            v-for="(field, index) in fields" 
            :key="field.key"
            class="gap-3 d-flex align-items-center mb-1"
          >
            <div class="w-100">
              <Field
                :name="`collections[${index}].dia`"
                placeholder="Dia da semana"
                type="text"
                class="inputtext"
              />
              <ErrorMessage 
                :name="`collections[${index}].dia`" 
                class="error-msg" 
              />
            </div>

            <div class="w-100">
              <Field
                :name="`collections[${index}].horarioInicio`"
                placeholder="Horário inicial"
                type="time"
                class="inputtext"
              />
              <ErrorMessage 
                :name="`collections[${index}].horarioInicio`" 
                class="error-msg" 
              />
            </div>

            <div class="w-100">
              <Field
                :name="`collections[${index}].horarioFim`"
                placeholder="Horário final"
                type="time"
                class="inputtext"
              />
              <ErrorMessage 
                :name="`collections[${index}].horarioFim`" 
                class="error-msg" 
              />
            </div>

            <button 
              type="button" 
              class="btn btn-danger ms-2" 
              @click="remove(index)"
            >
              Remover
            </button>
          </div>

          <button 
            type="button" 
            class="btn p-0 d-flex align-items-center addlink" 
            @click="push({ dia: '', horarioInicio: '', horarioFim: '' })"
          >
            <font-awesome-icon 
              class="pe-2" 
              icon="circle-plus" 
            />
            Adicionar horários
          </button>
        </FieldArray>
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
import { useCepStore } from '@/store/buscaCep.store';
import { useUnidadeStore } from '@/store/unidade.store.js';
import { vMaska } from "maska/vue";
import { storeToRefs } from 'pinia';
import { ErrorMessage, Field, FieldArray, useForm } from 'vee-validate';
import { defineProps, ref, watch } from 'vue';
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

const applyVaccine = ref(false)

const {
  errors, isSubmitting, handleSubmit, values, resetForm
} = useForm({
  validationSchema: schema,
  initialValues: {
    collections: emFoco.value?.collections || [{ dia: '', horarioInicio: '', horarioFim: '' }],
    services: emFoco.value?.services || [{ dia: '', horarioInicio: '', horarioFim: '' }],
    ...emFoco.value,
  },
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

function transformarHorariosEmObjeto(horariosArray) {
  const resultado = {};
  horariosArray.forEach(item => {
    if (item.dia && item.horarioInicio && item.horarioFim) {
      resultado[item.dia] = `Das ${item.horarioInicio} às ${item.horarioFim}`;
    }
  });
  return resultado;
}


const onSubmitUsuario = handleSubmit(async (values) => {
  try {
    const services = transformarHorariosEmObjeto(values.services);
    const collections = transformarHorariosEmObjeto(values.collections);
    
    const msg = props.unidadeId
      ? 'Dados salvos com sucesso!'
      : 'Item adicionado com sucesso!';

    const payload = {
      ...values,
      'lat': location.value.lat || emFoco.value?.lat,
      'lang': location.value.lang || emFoco.value?.lang,
      'services': services,
      'collections': collections,
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
    resetForm({
      values: {
        ...novoValor,
        collections: Object.entries(novoValor.collections || {}).map(([dia, horario]) => {
          const [horarioInicio, horarioFim] = horario.replace('Das ', '').split(' às ');
          return { dia, horarioInicio, horarioFim };
        }),
        services: Object.entries(novoValor.services || {}).map(([dia, horario]) => {
          const [horarioInicio, horarioFim] = horario.replace('Das ', '').split(' às ');
          return { dia, horarioInicio, horarioFim };
        }),
      }
    });
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

.addlink svg {
  width: 20px;
  color: var(--verdeClaro);
}
</style>