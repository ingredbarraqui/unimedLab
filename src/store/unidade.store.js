import { defineStore } from "pinia";
import { useAlertStore } from "./alert.store";

// eslint-disable-next-line no-undef
const baseUrl = process.env.VUE_APP_API_URL;

export const useUnidadeStore = defineStore( 'unidade', {
  state: () => ({
    lista: [],
    emFoco: null,
    paginacao: {
      links: [],
      current_page: null,
      last_page: null,
      per_page: 20,
      total: null,
    },
    chamadasPendentes:{
      lista: false,
      emFoco: false,
    },
    error: null
  }),

  actions: {
    async buscarTudo(params = {}) {
      this.chamadasPendentes.lista = true;
      this.error = null;
    
      try {
        const request = await this.requestS.get(
          `${baseUrl}/health-facility`, 
          {
            ...params, 
            page: params.page || this.paginacao.current_page || 1,
            per_page: params.per_page || this.paginacao.per_page,
          }
        );
    
        this.lista = request.healthFacilities.data;
        this.paginacao.current_page = request.healthFacilities.current_page;
        this.paginacao.last_page = request.healthFacilities.last_page;
        this.paginacao.per_page = request.healthFacilities.per_page;
        this.paginacao.total = request.healthFacilities.total;
        this.paginacao.links = request.healthFacilities.links;
      } catch (error) {
        this.error = error;
      }
    
      this.chamadasPendentes.lista = false;
    },
    
    async mudarPagina(page) {
      this.chamadasPendentes.lista = true;
      this.erro = null;
      try {
        this.paginacao.current_page = page;
        this.buscarTudo();
      } catch (erro) {
        this.erro = erro;
      }
      this.chamadasPendentes.lista = false;
    },

    async buscarItem( id = 0){
      this.chamadasPendentes.emFoco = true

      try{
        const request = await this.requestS.get(
          `${baseUrl}/health-facility/${id}`
        )
        this.emFoco = request.healthFacility

      } catch (erro){
        this.erro = erro
      }
    },

    async excluirItem(id = 0){
      this.chamadasPendentes.lista = true

      try{
        await this.requestS.delete(
          `${baseUrl}/health-facility/${id}`
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
            `${baseUrl}/health-facility/${id}`, params
          );
        } else {
          await this.requestS.post(
            `${baseUrl}/health-facility`, params
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