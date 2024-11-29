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
            name="otherNames" 
            :schema="schema"
            :required="true"
          />
          <multiselect
            v-model="selectedOtherNames"
            :options="optionsOtherNames"
            :multiple="true"
            placeholder="Outros nomes"
            label="valor"
            name="otherNames"
            track-by="valor"
            :taggable="true"
            @tag="addTag"
          />
        </div>
      </div>

      <div class="d-flex gap-3">
        <div class="mb-3 w-100">
          <LabelFromYup 
            name="slug" 
            :schema="schema"
            :required="true"
          />
          <Field
            name="slug"
            placeholder="Slug do exame"
            type="text"
            class="inputtext"
          />
          <ErrorMessage
            class="error-msg"
            name="slug"
          />
        </div>

        <div class="mb-3 w-100">
          <LabelFromYup 
            name="healthFacilityIds" 
            :schema="schema"
            :required="true"
          />
          <multiselect
            v-model="selectedHealthFacilityIds"
            :options="optionsHealthFacilityIds"
            :multiple="true"
            placeholder="Unidades de saúde"
            label="name"
            name="healthFacilityIds"
            track-by="id"
          />
        </div>
      </div>

      <div class="d-flex gap-3">
        <div class="mb-3 w-100"> 
          <LabelFromYup 
            name="ageGroup" 
            :schema="schema"
            :required="true"
          />
          <multiselect
            v-model="selectedFaixaEtaria"
            :options="optionsFaixaEtaria"
            :multiple="true"
            placeholder="Faixa etária"
            label="valor"
            name="ageGroup"
            track-by="valor"
          />
        </div>

        <div class="mb-3 w-100">
          <LabelFromYup 
            name="resultDeadline" 
            :schema="schema"
          />
          <Field
            name="resultDeadline"
            placeholder="Prazo para entrega"
            type="text"
            class="inputtext"
          />
          <ErrorMessage
            class="error-msg"
            name="resultDeadline"
          />
        </div>
      </div>

      <div class="d-flex gap-3">
        <div class="mb-3 w-100">
          <LabelFromYup 
            name="cautions" 
            :schema="schema"
          />
          <Field
            name="cautions"
            placeholder="Cuidados"
            type="text"
            class="inputtext"
            :class="{ 'error': errors.cautions }"
          />
        </div>
        <div class="mb-3 w-100">
          <LabelFromYup 
            name="collectionMethod" 
            :schema="schema"
            :required="true"
          />
          <multiselect
            v-model="selectedColeta"
            :options="optionsColeta"
            :multiple="true"
            placeholder="Tipo de coleta"
            label="valor"
            name="collectionMethod"
            track-by="valor"
          />
        </div>
      </div>

      <div class="mb-3 w-100">
        <LabelFromYup 
          name="description" 
          :schema="schema"
        />
        <Field
          v-focus
          name="description"
          placeholder="Descrição" 
          as="textarea" 
          class="inputtext"
          :class="{ 'error': errors.description }"
        />
        <ErrorMessage 
          class="error-msg" 
          name="description"
        />
      </div>

      <div>
        <div class="d-flex pb-2">
          <Field
            name="coverageANS"
            type="checkbox"
            :value="true"
            class="inputcheckbox"
          />
          <LabelFromYup
            name="coverageANS"
            :schema="schema"
            class="ps-2"
          />
        </div>
        <div class="d-flex pb-2">
          <Field
            name="haveToSchedule"
            type="checkbox"
            :value="true"
            class="inputcheckbox"
          />
          <LabelFromYup
            name="haveToSchedule"
            :schema="schema"
            class="ps-2"
          />
        </div>
      </div>

      <div class="d-flex w-100 gap-3 my-2">
        <div class="">
          <label>
            Tipo de exame
          </label>
          <div class="d-flex gap-4">
            <div class="pe-3">
              <div class="d-flex">
                <Field
                  name="sanguine"
                  type="checkbox"
                  :value="true"
                  class="inputcheckbox"
                />
                <LabelFromYup
                  name="sanguine"
                  :schema="schema"
                  class="ps-2"
                />
              </div>
              <div class="d-flex">
                <Field
                  name="genetic"
                  type="checkbox"
                  :value="true"
                  class="inputcheckbox"
                />
                <LabelFromYup
                  name="genetic"
                  :schema="schema"
                  class="ps-2"
                />
              </div>
              <div class="d-flex">
                <Field
                  name="immunological"
                  type="checkbox"
                  :value="true"
                  class="inputcheckbox"
                />
                <LabelFromYup
                  name="immunological"
                  :schema="schema"
                  class="ps-2"
                />
              </div>
              <div class="d-flex">
                <Field
                  name="biochemicals"
                  type="checkbox"
                  class="inputcheckbox"
                  :value="true"
                />
                <LabelFromYup
                  name="biochemicals"
                  :schema="schema"
                  class="ps-2"
                />
              </div>
            </div>
  
            <div class="pe-3">
              <div class="d-flex">
                <Field
                  name="hematological"
                  type="checkbox"
                  class="inputcheckbox"
                  :value="true"
                />
                <LabelFromYup
                  name="hematological"
                  :schema="schema"
                  class="ps-2"
                />
              </div>
              <div class="d-flex">
                <Field
                  name="microbiological"
                  type="checkbox"
                  class="inputcheckbox"
                  :value="true"
                />
                <LabelFromYup
                  name="microbiological"
                  :schema="schema"
                  class="ps-2"
                />
              </div>
              <div class="d-flex">
                <Field
                  name="cytological"
                  type="checkbox"
                  class="inputcheckbox"
                  :value="true"
                />
                <LabelFromYup
                  name="cytological"
                  :schema="schema"
                  class="ps-2"
                />
              </div>
              <div class="d-flex">
                <Field
                  name="toxicological"
                  type="checkbox"
                  class="inputcheckbox"
                  :value="true"
                />
                <LabelFromYup
                  name="toxicological"
                  :schema="schema"
                  class="ps-2"
                />
              </div>
            </div>
  
            <div class="pe-3">
              <div class="d-flex">
                <Field
                  name="image"
                  type="checkbox"
                  class="inputcheckbox"
                  :value="true"
                />
                <LabelFromYup
                  name="image"
                  :schema="schema"
                  class="ps-2"
                />
              </div>
              <div class="d-flex">
                <Field
                  name="functional"
                  type="checkbox"
                  class="inputcheckbox"
                  :value="true"
                />
                <LabelFromYup
                  name="functional"
                  :schema="schema"
                  class="ps-2"
                />
              </div>
              <div class="d-flex">
                <Field
                  name="urinalysis"
                  type="checkbox"
                  class="inputcheckbox"
                  :value="true"
                />
                <LabelFromYup
                  name="urinalysis"
                  :schema="schema"
                  class="ps-2"
                />
              </div>
            </div>
          </div>
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
import coleta from '@/consts/coleta.js';
import faixaEtaria from '@/consts/faixaEtaria.js';
import { exame as schema } from '@/consts/formSchema';
import { useUnidadeStore } from '@/store/unidade.store.js';
import { storeToRefs } from 'pinia';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { computed, defineProps, ref, watch } from 'vue';
import Multiselect from 'vue-multiselect';
import { useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '../../consts/alert.store.js';
import { useExameStore } from '../../store/exame.store.js';

const unidadeStore = useUnidadeStore()
const { lista } = storeToRefs(unidadeStore);

const exameStore = useExameStore()
const { emFoco } = storeToRefs(exameStore);

const router = useRouter();
const route = useRoute();
const alertStore = useAlertStore();

const selectedFaixaEtaria = ref([])
const optionsFaixaEtaria = computed(() => {
  return Object.values(faixaEtaria);
});

const selectedColeta = ref([])
const optionsColeta = computed(() => {
  return Object.values(coleta);
});

const selectedOtherNames = ref([])
const optionsOtherNames = ref([])

const selectedHealthFacilityIds = ref([])
const optionsHealthFacilityIds = computed(() => {
  return lista.value;
});

function addTag(newTag) {
  const newOption = { nome: newTag, valor: newTag };
  optionsOtherNames.value.push(newOption);
  selectedOtherNames.value.push(newOption);
}

const {
  errors, isSubmitting, handleSubmit, values, resetForm
} = useForm({
  validationSchema: schema,
  initialValues: emFoco.value,
});

const props = defineProps({
  exameId: {
    type: Number,
    default: 0,
  },
});

const onSubmitUsuario = handleSubmit(async (values) => {
  try {
    const msg = props.exameId
      ? 'Dados salvos com sucesso!'
      : 'Item adicionado com sucesso!';

    const payload = {
      ...values,
      'ageGroup': selectedFaixaEtaria.value.map( 
        item => item.valor
       ) || emFoco.value?.ageGroup,

      'collectionMethod': selectedColeta.value.map( 
      item => item.valor
      ) || emFoco.value?.collectionMethod,

      'healthFacilityIds': selectedHealthFacilityIds.value.map( 
        item => item.id
      ) || emFoco.value?.healthFacilityIds,

      'otherNames': selectedOtherNames.value.map(
        item => item.valor
      ) || emFoco.value?.otherNames

    };

    console.log(payload)

    const resposta = props.exameId
      ? await exameStore.salvarItem(payload, props.exameId)
      : await exameStore.salvarItem(payload);  

    if (resposta) {
      alertStore.success(msg);
      exameStore.$reset();
      router.push({ name: "exame" });
    }
  } catch (error) {
    alertStore.error(error);
  }
})

async function iniciar() {
  if (props.exameId) {
   await exameStore.buscarItem(props.exameId);
  }
  await unidadeStore.buscarTudo();
}
iniciar()

watch(emFoco, (novoValor) => {
  if (novoValor) {
    resetForm({ values: novoValor });

    selectedOtherNames.value = novoValor.otherNames.map((item) => {
      return (
        optionsOtherNames.value.find((option) => option.valor === item) || {
          nome: item,
          valor: item,
        }
      );
    });

    selectedFaixaEtaria.value = novoValor.ageGroup.map((item) => {
      return (
        optionsFaixaEtaria.value.find((option) => option.valor === item) || {
          nome: item,
          valor: item,
        }
      );
    });

    selectedColeta.value = novoValor.collectionMethod.map((item) => {
      return (
        optionsColeta.value.find((option) => option.valor === item) || {
          nome: item,
          valor: item,
        }
      );
    });

    selectedHealthFacilityIds.value = novoValor.healthFacilities.map((facility) => {
      return (
        optionsHealthFacilityIds.value.find(
          (option) => option.name === facility.name
        ) || { name: facility.name, slug: facility.slug }
      );
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
</style>