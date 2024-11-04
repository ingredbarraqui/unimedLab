import HomePage from "@/views/HomePage.vue";
import Index from "@/views/login/Index.vue";
import Login from "@/views/login/Login.vue";

import UsuarioCriarEditar from "@/views/usuarios/UsuarioCriarEditar.vue";
import UsuariosLista from "@/views/usuarios/usuariosLista.vue";

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