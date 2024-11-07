<template>
  <div class="card-branco">
    <div class="d-flex justify-content-between align-items-center pb-4">
      <h1>Usuários</h1>
      <div class="d-flex align-items-center gap-3">
        <router-link
          :to="{ name: 'Usuario Criar' }"
          class="btnVerde"
        >
          Novo usuário
        </router-link>  
      </div>
    </div>

    <div>
      <form
        class="mb-3 d-flex gap-3 flex-wrap align-items-end justify-content-between" 
        @submit.prevent="atualizarUrl"
      >
        <div class="d-flex gap-3 align-items-center">
          <div class="mw-100">
            <label>Nome</label>
            <input
              id="name"
              v-model.trim="name"
              placeholder="name"
              class="inputtext"
              name="name"
              type="text"
            >
          </div>

          <div class="d-grid">
            <label>Status</label>
            <select
              id="status"
              v-model.trim="status"
              class="inputtext inputtextMenor"
              name="status"
            >
              <option 
                value=""
              />
              <option
                v-for="item in Object.values(ativoInativo)"
                :key="item.nome"
                :value="item.valor"
              >
                {{ item.nome }}
              </option>
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
          <col>
          <col>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in lista"
              :key="item.id"
            >
              <td class="name">{{ item.name }}</td>
              <td class="email">{{ item.email }}</td>
              <td>{{ item.status }}</td> 
              <div class="d-flex gap-2">
                <td class="tdBtnAcao">
                  <button
                    class="icon"
                    arial-label="excluir"
                    @click="excluirUsuario(item.id)"
                  >
                    <font-awesome-icon icon="trash" />
                  </button>
                </td>
                <td class="tdBtnAcao">
                  <router-link
                    :to="{ 
                      name: 'Usuario Editar',
                      params: { usuarioId: item.id } 
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
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '../../consts/alert.store.js';
import ativoInativo from "../../consts/ativoInativo.js";
import { useUsuariosStore } from '../../store/usuarios.store.js';

const usuariosStore = useUsuariosStore()
const { lista, chamadasPendentes, erro, paginacao } = storeToRefs(usuariosStore);

const alertStore = useAlertStore();

const route = useRoute();
const router = useRouter();

const name = ref(route.query.name)
const status = ref(route.query.status
? Object.keys(status)
  .find((x) => x.toLowerCase() === route.query.status.toLocaleLowerCase())
: undefined);
const consulta = {};

async function excluirUsuario(id) {
  alertStore.confirmAction('Deseja mesmo remover esse item?', async () => {
    if (await usuariosStore.excluirItem(id)) {
      usuariosStore.$reset();
      usuariosStore.buscarTudo();
      alertStore.success('Usuário removido.');
    }
  }, 'Remover');
}

function atualizarUrl() {
  consulta.name = name.value || ' ';
  consulta.status = status.value || '';

  router.push({
    query: consulta,
  });
}

watch([
  () => route.query.name,
  () => route.query.status,
], () => {
  
  const consultaAtualizada = {
    name: route.query.name || '', 
    status: route.query.status || '',
  };

  usuariosStore.$reset();
  usuariosStore.buscarTudo(consultaAtualizada);
}, { immediate: true });

function limparFiltro(){
  name.value = '';
  status.value = '';
  
  router.push({
    query: {}
  });

  usuariosStore.$reset();
  usuariosStore.buscarTudo({});
}

async function mudarPagina(link) {
  if (link){
    await usuariosStore.mudarPagina(link.label)
  }
}
</script>

<style scoped>
.name, 
.email{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.endereco{
  max-width: 230px;
}

.tipo{
  max-width: 150px;
}
</style>