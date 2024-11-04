<template>
  <div class="menu_lateral menu">
    <CSidebar unfoldable>
      <CSidebarNav>
        <div>
          <div class="menu mb-3">
            <img
              class="mt-3"
              src="../assets/images/unimedLogoColor.png"
              alt="Logo avalion"
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
            <font-awesome-icon icon="fa-solid fa-image" />Banner
          </router-link>
        </CNavItem>
        <CNavItem href="/noticias">
          <router-link to="/noticias">
            <font-awesome-icon icon="fa-solid fa-newspaper" />Notícias
          </router-link>
        </CNavItem>
        <CNavItem href="/categorias">
          <router-link to="/categorias">
            <font-awesome-icon icon="fa-solid fa-newspaper" />Categoria
          </router-link>
        </CNavItem>
        <CNavItem href="/vacina">
          <router-link to="/vacina">
            <font-awesome-icon icon="fa-solid fa-syringe" />Vacinas
          </router-link>
        </CNavItem>
        <CNavItem href="/unidade">
          <router-link to="/unidade">
            <font-awesome-icon icon="fa-solid fa-house-medical-flag" />Unidades
          </router-link>
        </CNavItem>
        <CNavItem href="/exame">
          <router-link to="/exame">
            <font-awesome-icon icon="fa-solid fa-file-waveform" />Exames
          </router-link>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  </div> 
</template>

<script setup>
import { CNavItem, CSidebar, CSidebarNav } from '@coreui/vue';
</script>

<style>
.sidebar{
  max-width: 330px;
  border-radius: 32px;
  font-weight: 500;
}

.menu_lateral img{
  max-width: 248px;
  margin: 0 auto;
  display: block;

}

.menu_lateral nav{
  display: grid;
}

.sidebar-narrow-unfoldable {
  position: relative !important;
}

.sidebar-narrow, .sidebar-narrow-unfoldable:not(:hover) {
    --cui-sidebar-narrow-width: 5rem !important;
}

.sidebar{
  --cui-sidebar-width: 20rem !important;
}
</style>

