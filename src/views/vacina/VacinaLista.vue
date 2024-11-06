<template>
  <div class="card-branco">
    <div class="d-flex justify-content-between align-items-center pb-4">
      <h1>Vacinas</h1>
      <div class="d-flex align-items-center gap-3">
        <router-link
          :to="{ name: 'Criar Vacina' }"
          class="btnVerde"
        >
          Nova vacina
        </router-link>  
      </div>
    </div>

    <div>
      <div class="tabela">
        <form
          class="mb-3 d-flex gap-3 flex-wrap align-items-end justify-content-between" 
          @submit.prevent="atualizarUrl"
        >
          <div class="d-flex gap-3 align-items-center">
            <div class="d-grid">
              <label>Ordenagem</label>
              <select
                id="order"
                v-model.trim="order"
                class="inputtext inputtextMenor"
                name="order"
              >
                <option value="asc">Mais recentes</option>
                <option value="desc">Mais antigos</option>
              </select>
            </div>
          </div>
          <div class="d-flex gap-3">
            <button 
              type="button" 
              class="btnLabel"
              @click="limparFiltro" 
            >
              <font-awesome-icon
                icon="trash"
              />
              Limpar
            </button>
            <button class="btnLaranja">
              Pesquisar
            </button>
          </div>
        </form>
        <table class="w-100">
          <col>
          <col>
          <col>
          <col>
          <col>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Método de aplicação</th>
              <th>Descrição</th>
              <th>Criado</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in lista"
              :key="item.id"
            >
              <td class="text">{{ item.name }}</td>
              <td class="text">{{ item.applicationMethod }}</td>
              <td class="text">{{ item.description }}</td>
              <td class="text">{{ dateToField(item.created_at) }}</td>
              <div class="d-flex gap-2">
                <td class="tdBtnAcao">
                  <button
                    class="icon"
                    arial-label="excluir"
                    @click="excluirVacina(item.id)"
                  >
                    <font-awesome-icon icon="trash" />
                  </button>
                </td>
                <td class="tdBtnAcao">
                  <router-link
                    :to="{ 
                      name: 'Editar Vacina',
                      params: { vacinaId: item.id } 
                    }"
                    class="icon"
                  >
                    <font-awesome-icon icon="pen-to-square" />
                  </router-link>
                </td>
              </div> 
            </tr>
            <tr v-if="chamadasPendentes.lista">
              <td colspan="3">
                <font-awesome-icon
                  icon="spinner" 
                  class="spinner mt-3"
                />
                Carregando
              </td>
            </tr>
            <tr v-else-if="erro">
              <td colspan="3">
                Erro: {{ erro }}
              </td>
            </tr>
            <tr v-else-if="!lista.length">
              <td colspan="3">
                Nenhum resultado encontrado.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="paginacao" 
        class="d-flex gap-2 justify-content-center mt-4"
      >
        <button
          v-for="(link, index) in paginacao.links.slice(1, -1)"
          :key="index"
          class="paginacao-btn"
          :disabled="!link.url"
          :class="link.active ? 'paginacaoAtiva' : ''"
          @click="mudarPagina(link)"
        >
          {{ link.label }}
        </button>     
      </div>
    </div>
  </div>
</template>

<script setup>
import dateToField from '@/helpers/dateToFiel.js';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '../../consts/alert.store.js';
import { useVacinaStore } from '../../store/vacina.store.js';

const vacinaStore = useVacinaStore()
const { lista, chamadasPendentes, erro, paginacao } = storeToRefs(vacinaStore);

const alertStore = useAlertStore();

const route = useRoute();
const router = useRouter();


const order = ref(route.query.order);
const consulta = {};

async function excluirVacina(id) {
  alertStore.confirmAction('Deseja mesmo remover esse item?', async () => {
    if (await vacinaStore.excluirItem(id)) {
      vacinaStore.$reset();
      vacinaStore.buscarTudo();
      alertStore.success('Vacina deletada com sucesso!');
    }
  }, 'Remover');
}

function atualizarUrl() {
  consulta.order = order.value || ' ';

  router.push({
    query: consulta,
  });
}

watch([
  () => route.query.order,
], () => {
  
  const consultaAtualizada = {
    order: route.query.order || '', 
  };

  vacinaStore.$reset();
  vacinaStore.buscarTudo(consultaAtualizada);
}, { immediate: true });

function limparFiltro(){
  order.value = '';

  router.push({
    query: {}
  });

  vacinaStore.$reset();
  vacinaStore.buscarTudo({});
}

async function mudarPagina(link) {
  if (link){
    await vacinaStore.mudarPagina(link.label)
  }
}
</script>

<style scoped>
.text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
</style>