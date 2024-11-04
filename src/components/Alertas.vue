<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useAlertStore } from '@/store/alert.store';
import { storeToRefs } from 'pinia';

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
async function callbackFn() {
  await alert.value.callback();

  // talvez o tipo da janela já tenha sido substituído
  if (alert.value?.type === 'confirmAction') {
    alertStore.$reset();
  }
}
</script>

<template>
  <Teleport 
    v-if="alert"
    to="body"
  >
    <div class="alert-wrap">
      <div
        class="overlay"
        @click="alertStore.$reset()"
      />
      <div
        class="alert"
        :class="alert.type"
      >
        <div>
          {{ alert.message }}
        </div>
        <template v-if="alert.type == 'confirmAction'">
          <button
            class="btnVerde"
            @click="callbackFn"
          >
            {{ alert.label }}
          </button>
          <button 
            class="btnBranco" 
            @click="alert.fallback ? alert.fallback() : alertStore.$reset()"
          >
            Cancelar
          </button>
        </template>
        <template v-else-if="alert.type == 'confirm'">
          <router-link
            v-if="typeof alert.url == 'string'"
            :to="alert.url"
            @click="alertStore.$reset()"
          >
            Sair sem salvar
          </router-link>
          <button
            v-if="typeof alert.url != 'string'"
            @click="alert.url"
          >
            Sair sem salvar
          </button>
          <button
            class="btnBranco"
            @click="alertStore.$reset()"
          >
            Cancelar
          </button>
        </template>
        <template v-else>
          <button 
            class="btnVerde" 
            @click="alertStore.$reset()"
          >
            OK
          </button>
        </template>
      </div>
    </div>
  </Teleport>
</template>
