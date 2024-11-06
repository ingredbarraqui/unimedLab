import BannerCriarEditar from "@/views/banner/BannerCriarEditar.vue";
import BannerLista from "@/views/banner/BannerLista.vue";

import HomePage from "@/views/HomePage.vue";
import Index from "@/views/login/Index.vue";
import Login from "@/views/login/Login.vue";
import NoticiaCriarEditar from "@/views/noticia/NoticiaCriarEditar.vue";
import NoticiaLista from "@/views/noticia/NoticiaLista.vue";

import UsuarioCriarEditar from "@/views/usuarios/UsuarioCriarEditar.vue";
import UsuariosLista from "@/views/usuarios/usuariosLista.vue";
import VacinaCriarEditar from "@/views/vacina/VacinaCriarEditar.vue";
import VacinaLista from "@/views/vacina/VacinaLista.vue";
import VideosCriarEditar from "@/views/video/VideosCriarEditar.vue";

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'ativo',
  routes:[
    {
      path: '/',
      component: HomePage,
      children: [
        {
          path: '',
          name: 'Usuarios',
          component: UsuariosLista,
        },
        {
          path: '/video',
          name: 'video',
          component: VideosCriarEditar,
          meta: {
            título: 'Vídeo',
          },
        },
        {
          path: 'novoUsuario',
          name: 'Usuario Criar',
          component: UsuarioCriarEditar,
          meta: {
            título: 'Criar Usuário',
          },
        },
        {
          path: ':usuarioId',
          name: 'Usuario Editar',
          component: UsuarioCriarEditar,
          meta: {
            título: 'Editar Usuário',
          },
          props: ({ params }) => ({
            ...params,
            ...{ usuarioId: Number.parseInt(params.usuarioId) || undefined },
          }),
        },
      ],
    },
    {
      path: '/banners',
      component: HomePage,
      children: [
        {
          path: '',
          name: 'Banner',
          component: BannerLista,
        },
        {
          path: 'novoBanner',
          name: 'Criar Banner',
          component: BannerCriarEditar,
          meta: {
            título: 'Criar banner',
          },
        },
        {
          path: ':bannerId',
          name: 'Editar Banner',
          component: BannerCriarEditar,
          meta: {
            título: 'Editar Banner',
          },
          props: ({ params }) => ({
            ...params,
            ...{ bannerId: Number.parseInt(params.bannerId) || undefined },
          }),
        },
      ],
    },
    {
      path: '/vacinas',
      component: HomePage,
      children: [
        {
          path: '',
          name: 'Vacina',
          component: VacinaLista,
        },
        {
          path: 'novaVacina',
          name: 'Criar Vacina',
          component: VacinaCriarEditar,
          meta: {
            título: 'Criar vacina',
          },
        },
        {
          path: ':vacinaId',
          name: 'Editar Vacina',
          component: VacinaCriarEditar,
          meta: {
            título: 'Editar vacina',
          },
          props: ({ params }) => ({
            ...params,
            ...{ vacinaId: Number.parseInt(params.vacinaId) || undefined },
          }),
        },
      ],
    },
    {
      path: '/noticias',
      component: HomePage,
      children: [
        {
          path: '',
          name: 'Noticia',
          component: NoticiaLista,
        },
        {
          path: 'novaNoticia',
          name: 'Criar Noticia',
          component: NoticiaCriarEditar,
          meta: {
            título: 'Criar notícia',
          },
        },
        {
          path: ':noticiaId',
          name: 'Editar Noticia',
          component: NoticiaCriarEditar,
          meta: {
            título: 'Editar notícia',
          },
          props: ({ params }) => ({
            ...params,
            ...{ noticiaId: Number.parseInt(params.noticiaId) || undefined },
          }),
        },
      ],
    },
    {
      path: '/Login',
      component: Index,
      children: [
        {
          path: '',
          name: 'Login',
          component: Login,
        },
      ]
    },
  ]
})

router.beforeEach(async(r) => {
  const { useAuthStore } = await import('../store/auth.store');
  
  const publicPages = [
    '/login', 
    '/esqueci-minha-senha',
  ];
  const authRequired = !publicPages.includes(r.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.token) {
    authStore.returnUrl = r.fullPath;
    return '/login';
  }
});

export default router;