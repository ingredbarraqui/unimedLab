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
            name="cautions" 
            :schema="schema"
          />
          <Field
            name="cautions"
            placeholder="Cuidades"
            type="text"
            class="inputtext"
          />
        </div>
      </div>

      <div class="d-flex gap-3">
        <div class="mb-3 w-100">
          <LabelFromYup 
            name="applicationMethod" 
            :schema="schema"
            :required="true"
          />
          <Field
            name="applicationMethod"
            placeholder="Método de aplicação"
            type="text"
            class="inputtext"
          />
          <ErrorMessage 
            class="error-msg" 
            name="applicationMethod"
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
        />
        <ErrorMessage 
          class="error-msg" 
          name="description"
        />
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
            name="preventAgainst" 
            :schema="schema"
            :required="true"
          />
          <multiselect
            v-model="selectedPreventAgainst"
            :options="optionsPreventAgainst"
            :multiple="true"
            placeholder="Prevenções"
            label="valor"
            name="preventAgainst"
            track-by="valor"
            :taggable="true"
            @tag="addTag"
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
import faixaEtaria from '@/consts/faixaEtaria.js';
import { vacina as schema } from '@/consts/formSchema';
import vacinas from '@/consts/vacinas.js';
import { useUnidadeStore } from '@/store/unidade.store.js';
import { storeToRefs } from 'pinia';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { computed, defineProps, ref, watch } from 'vue';
import Multiselect from 'vue-multiselect';
import { useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '../../consts/alert.store.js';
import { useVacinaStore } from '../../store/vacina.store.js';

const unidadeStore = useUnidadeStore()
const { lista } = storeToRefs(unidadeStore);

const vacinaStore = useVacinaStore()
const { emFoco } = storeToRefs(vacinaStore);

const router = useRouter();
const route = useRoute();
const alertStore = useAlertStore();

const selectedFaixaEtaria = ref([])
const optionsFaixaEtaria = computed(() => {
  return Object.values(faixaEtaria);
});

const selectedPreventAgainst = ref([])
const optionsPreventAgainst = computed(() => {
  return Object.values(vacinas);
});

const selectedHealthFacilityIds = ref([])
const optionsHealthFacilityIds = computed(() => {
  return lista.value;
});

function addTag(newTag) {
  const newOption = { nome: newTag, valor: newTag };
  optionsPreventAgainst.value.push(newOption);
  selectedPreventAgainst.value.push(newOption);
}

const {
  errors, isSubmitting, handleSubmit, values, resetForm
} = useForm({
  validationSchema: schema,
  initialValues: emFoco.value,
});

const props = defineProps({
  vacinaId: {
    type: Number,
    default: 0,
  },
});

const onSubmitUsuario = handleSubmit(async (values) => {
  try {
    const msg = props.vacinaId
      ? 'Dados salvos com sucesso!'
      : 'Item adicionado com sucesso!';

    const payload = {
      ...values,
      'ageGroup': selectedFaixaEtaria.value.map( 
        item => item.valor
       ) || emFoco.value?.ageGroup,

      'healthFacilityIds': selectedHealthFacilityIds.value.map( 
        item => item.id
      ) || emFoco.value?.healthFacilityIds,

      'preventAgainst': selectedPreventAgainst.value.map(
        item => item.valor
      ) || emFoco.value?.preventAgainst

    };

    const resposta = props.vacinaId
      ? await vacinaStore.salvarItem(payload, props.vacinaId)
      : await vacinaStore.salvarItem(payload);  

    if (resposta) {
      alertStore.success(msg);
      vacinaStore.$reset();
      router.push({ name: "Vacina" });
    }
  } catch (error) {
    alertStore.error(error);
  }
})

async function iniciar() {
  if (props.vacinaId) {
   await vacinaStore.buscarItem(props.vacinaId);
  }
  await unidadeStore.buscarTudo();
}
iniciar()

watch(emFoco, (novoValor) => {
  if (novoValor) {
    resetForm({ values: novoValor });

    selectedPreventAgainst.value = novoValor.preventAgainst.map((item) => {
      return (
        optionsPreventAgainst.value.find((option) => option.valor === item) || {
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