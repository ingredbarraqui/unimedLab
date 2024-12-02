<template>
  <div class="menu_lateral menu">
    <CSidebar>
      <CSidebarNav class="menu_lateral-nav">
        <div>
          <div>
            <div class="menu mb-3">
              <img
                class="mt-3"
                src="../assets/images/unimedLogoColor.png"
                alt="Logo Unimed"
              >
            </div>
          </div>
          <CNavItem href="/">
            <router-link to="/">
              <font-awesome-icon icon="fa-solid fa-users" />Usuários
            </router-link>
          </CNavItem>
          <CNavItem href="/banners">
            <router-link to="/banners">
              <font-awesome-icon icon="fa-solid fa-image" />Banners
            </router-link>
          </CNavItem>
          <CNavItem href="/noticias">
            <router-link to="/noticias">
              <font-awesome-icon icon="fa-solid fa-newspaper" />Notícias
            </router-link>
          </CNavItem>
          <CNavItem href="/categorias">
            <router-link to="/categorias">
              <font-awesome-icon icon="fa-solid fa-layer-group" />Categorias
            </router-link>
          </CNavItem>
          <CNavItem href="/vacinas">
            <router-link to="/vacinas">
              <font-awesome-icon icon="fa-solid fa-syringe" />Vacinas
            </router-link>
          </CNavItem>
          <CNavItem href="/unidades">
            <router-link to="/unidades">
              <font-awesome-icon icon="fa-solid fa-house-medical-flag" />Unidades
            </router-link>
          </CNavItem>
          <CNavItem href="/exames">
            <router-link to="/exames">
              <font-awesome-icon icon="fa-solid fa-file-waveform" />Exames
            </router-link>
          </CNavItem>
          <CNavItem href="/video">
            <router-link to="/video">
              <font-awesome-icon icon="fa-solid fa-video" />Vídeo
            </router-link>
          </CNavItem>
          <CNavItem href="/documentos">
            <router-link to="/documentos">
              <font-awesome-icon icon="fa-solid fa-folder-open" />Documentos
            </router-link>
          </CNavItem>
        </div>
        <CNavItem 
          class="d-flex align-items-center mb-2"  
          @click="logout"
        >
          <font-awesome-icon 
            icon="right-from-bracket" 
            class="me-2 ms-2" 
          /> Sair
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  </div> 
</template>

<script setup>
import { CNavItem, CSidebar, CSidebarNav } from '@coreui/vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth.store';

const authStore = useAuthStore();
const router = useRouter();

function logout() {
  authStore.logout();
  router.push('/login');
}
</script>

<style>
.sidebar{
  max-width: 250px;
  border-radius: 32px;
  font-weight: 500;
  height: 100%;
}

.menu_lateral img{
  max-width: 210px;
  margin: 0 auto;
  display: block;

}

.menu_lateral nav{
  display: grid;
}

.menu_lateral-nav{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logout {
  position: absolute;
  bottom: 23px;
  cursor: pointer;
}

.sidebar{
  --cui-sidebar-width: 20rem !important;
}
</style>

