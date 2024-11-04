import HomePage from "@/views/HomePage.vue";
import Index from "@/views/login/Index.vue";
import Login from "@/views/login/Login.vue";
const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'ativo',
  routes:[
    {
      path: '/',
      component: HomePage,
      children: [
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