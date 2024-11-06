<template>
  <div class="card-branco">
    <div class="d-flex justify-content-between align-items-center pb-4">
      <h1>Exames</h1>
      <div class="d-flex align-items-center gap-3">
        <router-link
          :to="{ name: 'Criar Exame' }"
          class="btnLaranja"
        >
          Novo exame
        </router-link>  
      </div>
    </div>

    <div>
      <div class="tabela">
        <table class="w-100">
          <col>
          <col>
          <col>
          <col>
          <col>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Faixa etária</th>
              <th>Criado</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in lista"
              :key="item.id"
            >
              <td class="text">{{ item.name }} - {{ item.slug }}</td>
              <td class="text">{{ item.description ? item.description : '-' }}</td>
              <td class="text">{{ formatList(item.ageGroup) }}</td>
              <td class="text">{{ dateToField(item.created_at) }}</td>
              <div class="d-flex gap-2">
                <td class="tdBtnAcao">
                  <button
                    class="icon"
                    arial-label="excluir"
                    @click="excluirExame(item.id)"
                  >
                    <font-awesome-icon icon="trash" />
                  </button>
                </td>
                <td class="tdBtnAcao">
                  <router-link
                    :to="{ 
                      name: 'Editar Exame',
                      params: { exameId: item.id } 
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
import { useAlertStore } from '../../consts/alert.store.js';
import { useExameStore } from '../../store/exame.store.js';

const exameStore = useExameStore()
const { lista, chamadasPendentes, erro, paginacao } = storeToRefs(exameStore);

const alertStore = useAlertStore();

function formatList(answer) {
  return Array.isArray(answer) ? answer.join(', ') : answer;
}

async function excluirExame(id) {
  alertStore.confirmAction('Deseja mesmo remover esse item?', async () => {
    if (await exameStore.excluirItem(id)) {
      exameStore.$reset();
      exameStore.buscarTudo();
      alertStore.success('Notícia deletada com sucesso.');
    }
  }, 'Remover');
}

async function iniciar(){
  await exameStore.buscarTudo();
}
iniciar()

async function mudarPagina(link) {
  if (link){
    await exameStore.mudarPagina(link.label)
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