import { defineStore } from "pinia";

// eslint-disable-next-line no-undef
const baseUrl = process.env.VUE_APP_API_URL;

export const useVideoStore = defineStore( 'video', {
  state: () => ({
    lista: [],
    emFoco: null,
    chamadasPendentes:{
      lista: false,
      emFoco: false,
    },
    error: null
  }),

  actions: {
    async buscarItem(){
      this.chamadasPendentes.emFoco = true

      try{
        const request = await this.requestS.get(
          `${baseUrl}/youtube`
        )
        this.emFoco = request.youtube

      } catch (erro){
        this.erro = erro
      }
    },

    async excluirItem(id = 0){
      this.chamadasPendentes.lista = true

      try{
        await this.requestS.delete(
          `${baseUrl}/youtube/${id}`
        )
        this.chamadasPendentes.lista = false
        return true

      } catch(erro){
        this.erro = erro
        this.chamadasPendentes.lista = false;
        return false;
      }
    },

    async salvarItem(params = {}) {
      this.chamadasPendentes.emFoco = true;
      this.erro = null;
      try {
        await this.requestS.post(
          `${baseUrl}/youtube`, params
        );
        this.chamadasPendentes.emFoco = false;
        return true;
      } catch (erro) {
        this.erro = erro;
        this.chamadasPendentes.emFoco = false;
        return false;
      }
    },
  },
});