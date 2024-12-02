import { defineStore } from "pinia";

// eslint-disable-next-line no-undef
const baseUrl = process.env.VUE_APP_API_URL;

export const useDocumentosStore = defineStore( 'documentos', {
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
          `${baseUrl}/document`, {
          ...params, 
        });

        this.lista = request.documents
      } catch (error){
        this.error = error
      }

      this.chamadasPendentes.lista = false
    },

    async buscarItem( id = 0){
      this.chamadasPendentes.emFoco = true

      try{
        const request = await this.requestS.get(
          `${baseUrl}/document/${id}`
        )
        this.emFoco = request.document

      } catch (erro){
        this.erro = erro
      }
    },

    async salvarItem(params = {}, id = null) {
      this.chamadasPendentes.emFoco = true;
      this.erro = null;
      try {
        if (id) {
          await this.requestS.post(
            `${baseUrl}/document/${id}`, params
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