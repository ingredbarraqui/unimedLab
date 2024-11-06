import { defineStore } from 'pinia';
import { useAlertStore } from '@/store/alert.store';
import router from '@/router';

// eslint-disable-next-line no-undef
const baseUrl = process.env.VUE_APP_API_URL;

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    token: JSON.parse(localStorage.getItem('token')),
  }),

  actions: {
    async login(user) {
      try {
        const response = await this.requestS.post(
          `${baseUrl}/login`, user
        );

        if(response.success === true){
          this.token = response.token;
          localStorage.setItem('token', JSON.stringify(response.token))
          await this.getDados();
        }
        
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },

    async getDados() {
      try {
        const response = await this.requestS.get(`${baseUrl}/me`);
        this.user = response 

        localStorage.setItem('user', JSON.stringify(response))

        return response;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
        throw error;
      }
    },

    async cadastro(novoUsuario) {
      const alertStore = useAlertStore();
      const msg = 'Cadastro realizado com sucesso!'
      try {
        const response = await this.requestS.post(
          `${baseUrl}/register`, novoUsuario
        );

        if(response.status == msg){
          alertStore.success('Conta criado com sucesso!');
          await this.login(novoUsuario)
        }

        return response
      } catch (error) {
        alertStore.error(error);
      }
    },

    async esqueciSenha(email){
      try{
        const response = this.requestS.post(
          `${baseUrl}/forgot-password`, email
        );

        const alertStore = useAlertStore();
        if(response.success === true){
          alertStore.success('Uma senha temporária foi enviada para o seu e-mail.');
          this.router.push('/login');
        }
        
        if (!response.ok) {
          throw new Error('Recuperação de senha, falhou');
        }

      } catch (error){
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});
