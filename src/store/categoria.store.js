import { defineStore } from "pinia";
import { useAlertStore } from "./alert.store";

// eslint-disable-next-line no-undef
const baseUrl = process.env.VUE_APP_API_URL;

export const useCategoriaStore = defineStore( 'categoria', {
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
    async buscarTudo(params = {}){
      this.chamadasPendentes.lista = true;
      this.error = null;

      try{
        const request = await this.requestS.get(
          `${baseUrl}/newletter/category`, {
          ...params, 
        });

        this.lista = request.newsLettersCategories
      } catch (error){
        this.error = error
      }

      this.chamadasPendentes.lista = false
    },

    async buscarItem( id = 0){
      this.chamadasPendentes.emFoco = true

      try{
        const request = await this.requestS.get(
          `${baseUrl}/newletter/category/${id}`
        )
        this.emFoco = request.newLetterCategory

      } catch (erro){
        this.erro = erro
      }
    },

    async excluirItem(id = 0){
      this.chamadasPendentes.lista = true

      try{
        await this.requestS.delete(
          `${baseUrl}/newletter/category/${id}`
        )
        this.chamadasPendentes.lista = false
        return true

      } catch(erro){
        this.erro = erro
        this.chamadasPendentes.lista = false;
        return false;
      }
    },

    async salvarItem(params = {}, id = null) {
      this.chamadasPendentes.emFoco = true;
      this.erro = null;
      try {
        if (id) {
          await this.requestS.put(
            `${baseUrl}/newletter/category/${id}`, params
          );
        } else {
          await this.requestS.post(
            `${baseUrl}/newletter/category`, params
          );
        }

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