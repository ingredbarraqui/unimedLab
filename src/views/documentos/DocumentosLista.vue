<template>
  <div class="card-branco">
    <div class="pb-4">
      <h1>Documentos</h1>
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
              <th>Titúlo</th>
              <th>Tipo</th>
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
              <td class="text">{{ item.title ? item.title : '-' }}</td>
              <td class="text">{{ item.type ? item.type : '-' }}</td>
              <td class="text">{{ dateToField(item.created_at) }}</td>
              <div class="d-flex gap-2">
                <td class="tdBtnAcao">
                  <router-link
                    :to="{ 
                      name: 'Editar documento',
                      params: { documentosId: item.id } 
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
    </div>
  </div>
</template>

<script setup>
import dateToField from '@/helpers/dateToFiel.js';
import { storeToRefs } from 'pinia';
import { useDocumentosStore } from '../../store/documentos.store.js';

const documentostore = useDocumentosStore()
const { lista, chamadasPendentes, erro } = storeToRefs(documentostore);

async function iniciar(){
  await documentostore.buscarTudo();
}
iniciar()
</script>

<style scoped>
.text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
</style>