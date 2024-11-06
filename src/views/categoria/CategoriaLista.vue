<template>
  <div class="card-branco">
    <div class="d-flex justify-content-between align-items-center pb-4">
      <h1>Categorias</h1>
      <div class="d-flex align-items-center gap-3">
        <router-link
          :to="{ name: 'Criar Categoria' }"
          class="btnLaranja"
        >
          Nova categoria
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
              <th>Categoria</th>
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
              <td class="text">{{ item.category }}</td>
              <td class="text">{{ item.description }}</td>
              <td class="text">{{ dateToField(item.created_at) }}</td>
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
                      name: 'Editar Categoria',
                      params: { categoriaId: item.id } 
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
import { usecategoriaStore } from '@/store/noticia.store.js';
import { storeToRefs } from 'pinia';
import { useAlertStore } from '../../consts/alert.store.js';
import { useCategoriaStore } from '../../store/categoria.store.js';
const categoriaStore = useCategoriaStore()
const { lista, chamadasPendentes, erro, paginacao } = storeToRefs(categoriaStore);

const alertStore = useAlertStore();

async function excluirBanner(id) {
  alertStore.confirmAction('Deseja mesmo remover esse item?', async () => {
    if (await categoriaStore.excluirItem(id)) {
      categoriaStore.$reset();
      categoriaStore.buscarTudo();
      alertStore.success('Notícia deletada com sucesso.');
    }
  }, 'Remover');
}

async function iniciar(){
  await categoriaStore.buscarTudo();
}
iniciar()

async function mudarPagina(link) {
  if (link){
    await categoriaStore.mudarPagina(link.label)
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