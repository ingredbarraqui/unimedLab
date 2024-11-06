<template>
  <div class="card-branco">
    <div class="d-flex justify-content-between align-items-center pb-4">
      <h1>Unidades de saúde</h1>
      <div class="d-flex align-items-center gap-3">
        <router-link
          :to="{ name: 'Criar Unidade' }"
          class="btnLaranja"
        >
          Nova unidade
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
              <th>Telefone</th>
              <th>Rua</th>
              <th>Bairro</th>
              <th>Número</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in lista"
              :key="item.id"
            >
              <td class="text">{{ item.name }} - {{ item.slug }}</td>
              <td class="text">{{ item.phone }}</td>
              <td class="text">{{ item.street }}</td>
              <td class="text">{{ item.neighborhood }}</td>
              <td class="text">{{ item.number }}</td>
              <div class="d-flex gap-2">
                <td class="tdBtnAcao">
                  <button
                    class="icon"
                    arial-label="excluir"
                    @click="excluirBanner(item.id)"
                  >
                    <font-awesome-icon icon="trash" />
                  </button>
                </td>
                <td class="tdBtnAcao">
                  <router-link
                    :to="{ 
                      name: 'Editar Unidade',
                      params: { unidadeId: item.id } 
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
import { useUnidadeStore } from '@/store/unidade.store.js';
import { storeToRefs } from 'pinia';
import { useAlertStore } from '../../consts/alert.store.js';

const unidadeStore = useUnidadeStore()
const { lista, chamadasPendentes, erro, paginacao } = storeToRefs(unidadeStore);

const alertStore = useAlertStore();

async function excluirBanner(id) {
  alertStore.confirmAction('Deseja mesmo remover esse item?', async () => {
    if (await unidadeStore.excluirItem(id)) {
      unidadeStore.$reset();
      unidadeStore.buscarTudo();
      alertStore.success('Notícia deletada com sucesso.');
    }
  }, 'Remover');
}

async function iniciar(){
 await unidadeStore.buscarTudo()
}
iniciar()

async function mudarPagina(link) {
  if (link){
    await unidadeStore.mudarPagina(link.label)
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