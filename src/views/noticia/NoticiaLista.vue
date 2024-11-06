<template>
  <div class="card-branco">
    <div class="d-flex justify-content-between align-items-center pb-4">
      <h1>Notícias</h1>
      <div class="d-flex align-items-center gap-3">
        <router-link
          :to="{ name: 'Criar Noticia' }"
          class="btnVerde"
        >
          Nova notícia
        </router-link>  
      </div>
    </div>

    <div>
      <form
        class="mb-3 d-flex gap-3 flex-wrap align-items-end justify-content-between" 
        @submit.prevent="atualizarUrl"
      >
        <div class="d-flex gap-3 align-items-center">
          <div class="d-grid">
            <label>Categoria</label>
            <select
              id="category"
              v-model.trim="category"
              class="inputtext inputtextMenor"
              name="category"
            >
              <option 
                value=""
              />
              <option
                v-for="item in Object.values(listaCategoria)"
                :key="item.category"
                :value="item.category"
              >
                {{ item.category }}
              </option>
            </select>
          </div>

          <div class="d-grid">
            <label>Tipo</label>
            <select
              id="orderBy"
              v-model.trim="orderBy"
              class="inputtext"
              name="orderBy"
            >
              <option value="category">
                Categoria
              </option>
              <option value="title">
                Titulo
              </option>
              <option value="content">
                Descrição
              </option>
              <option value="created_at">
                Criação
              </option>
            </select>
          </div>

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
              <th>Titulo</th>
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
              <td class="text">{{ item.title }}</td>
              <td class="text">{{ item.content }}</td>
              <td class="text">{{ dateToField(item.created_at) }}</td>
              <div class="d-flex gap-2">
                <td class="tdBtnAcao">
                  <button
                    class="icon"
                    arial-label="excluir"
                    @click="excluirNoticia(item.id)"
                  >
                    <font-awesome-icon icon="trash" />
                  </button>
                </td>
                <td class="tdBtnAcao">
                  <router-link
                    :to="{ 
                      name: 'Editar Noticia',
                      params: { noticiaId: item.id } 
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
import { useNoticiaStore } from '@/store/noticia.store.js';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '../../consts/alert.store.js';
import { useCategoriaStore } from '../../store/categoria.store.js';

const noticiaStore = useNoticiaStore()
const { lista, chamadasPendentes, erro, paginacao } = storeToRefs(noticiaStore);

const categoriaStore = useCategoriaStore()
const { lista: listaCategoria } = storeToRefs(categoriaStore);

const alertStore = useAlertStore();

const route = useRoute();
const router = useRouter();

const orderBy = ref(route.query.orderBy)
const order = ref(route.query.order);
const category = ref(route.query.category
? Object.keys(category)
  .find((x) => x.toLowerCase() === route.query.category.toLocaleLowerCase())
: undefined);
const consulta = {};

async function excluirNoticia(id) {
  alertStore.confirmAction('Deseja mesmo remover esse item?', async () => {
    if (await noticiaStore.excluirItem(id)) {
      noticiaStore.$reset();
      noticiaStore.buscarTudo();
      alertStore.success('Notícia deletada com sucesso.');
    }
  }, 'Remover');
}

function atualizarUrl() {
  consulta.order = order.value || ' ';
  consulta.orderBy = orderBy.value || ' ';
  consulta.category = category.value || '';

  router.push({
    query: consulta,
  });
}

watch([
  () => route.query.order,
  () => route.query.orderBy,
  () => route.query.category,
], () => {
  
  const consultaAtualizada = {
    order: route.query.order || '', 
    orderBy: route.query.orderBy || '', 
    category: route.query.category || '',
  };

  noticiaStore.$reset();
  noticiaStore.buscarTudo(consultaAtualizada);
}, { immediate: true });

function limparFiltro(){
  order.value = '';
  orderBy.value = '';
  category.value = '';
  
  router.push({
    query: {}
  });

  noticiaStore.$reset();
  noticiaStore.buscarTudo({});
}

async function iniciar(){
 await categoriaStore.buscarTudo();
}
iniciar()

async function mudarPagina(link) {
  if (link){
    await noticiaStore.mudarPagina(link.label)
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